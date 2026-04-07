import React, { useRef, useEffect, useState } from 'react';
import { Difficulty } from '../../data/types';
import questionBank from '../../data/questions';
import HintButton from '../HintButton';

import { compareEquations } from '../../utils/equationParser';

interface ScoreCompetitionGameProps {
  difficulty: Difficulty;
  onGameEnd: (score: number, timeUsed: number) => void;
  onCountdownChange?: (isActive: boolean, time: number) => void;
}

const ScoreCompetitionGame: React.FC<ScoreCompetitionGameProps> = ({ difficulty, onGameEnd, onCountdownChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeUsed, setTimeUsed] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [countdown, setCountdown] = useState(30);
  const [countdownTimer, setCountdownTimer] = useState<number | null>(null);
  const [running, setRunning] = useState(false);
  const [doorPosition] = useState(0);
  const [selectedDoorValue, setSelectedDoorValue] = useState(1); // 保存当前选择的门的 value
  
  // 使用ref存储倒计时的当前值，确保能获取到最新值
  const countdownRef = useRef(countdown);

  // 方程式默写相关状态
  const [equationItems, setEquationItems] = useState<any[]>([]);
  const [selectedItems, setSelectedItems] = useState<{id: string, content: string}[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [coefficients, setCoefficients] = useState<{[key: string]: {value: string, hasUserInput: boolean}}>({});

  // 游戏状态
  const gameState = useRef({
    character: { x: 100, y: 200, width: 50, height: 80, running: false },
    doors: [
      { id: 1, value: 1, x: 500, y: 150, width: 80, height: 150, color: '#3b82f6' },
      { id: 2, value: 3, x: 600, y: 150, width: 80, height: 150, color: '#8b5cf6' },
      { id: 3, value: 5, x: 700, y: 150, width: 80, height: 150, color: '#ec4899' }
    ],
    keys: { a: false, d: false, space: false },
    time: 0,
    lastTime: performance.now(),
  });

  // 初始化题目
  useEffect(() => {
    // 题目初始化逻辑
  }, [difficulty]);

  // 同步countdown状态和countdownRef的值
  useEffect(() => {
    countdownRef.current = countdown;
  }, [countdown]);

  // 键盘事件处理
  useEffect(() => {
    // 键盘事件监听
    const handleKeyDown = (e: KeyboardEvent) => {
      // 选择题目后禁止移动和再次选择门
      if (showExplanation) {
        return;
      }
      
      if (e.key === 'a') gameState.current.keys.a = true;
      if (e.key === 'd') gameState.current.keys.d = true;
      if (e.key === ' ') gameState.current.keys.space = true;
      if (e.key === 'w') {
        // 选择门
        const character = gameState.current.character;
        const doors = gameState.current.doors;
        
        // 找到角色当前位置对应的门
        const selectedDoor = doors.find(door => {
          const doorX = door.x + doorPosition;
          return character.x + character.width / 2 >= doorX && 
                 character.x + character.width / 2 <= doorX + door.width;
        });
        
        if (selectedDoor) {
          // 保存当前选择的门的 value
          setSelectedDoorValue(selectedDoor.value);
          // 根据门的难度（value）选择相应难度的题目
          let allQuestions: any[] = [];
          
          if (difficulty === 'nightmare') {
            // 噩梦难度：从所有难度的题库中选择，但给简单题较低的权重
            const easyQuestions = questionBank.easy;
            const nightmareQuestions = questionBank.nightmare;
            
            // 为简单题添加较低的权重（每道简单题只添加一次，而噩梦题添加多次）
            allQuestions = [...easyQuestions];
            // 添加噩梦题（多次添加以增加出现几率）
            for (let i = 0; i < 3; i++) {
              allQuestions = [...allQuestions, ...nightmareQuestions];
            }
          } else {
            // 简单难度：只从简单题库中选择
            allQuestions = questionBank[difficulty];
          }
          
          // 根据门的 value 选择不同类型的题目
          let filteredQuestions = allQuestions;
          if (selectedDoor.value === 5) {
            // +5门：选择方程式默写题目
            filteredQuestions = allQuestions.filter(q => q.type === 'equation_memory');
          } else if (selectedDoor.value === 3) {
            // +3门：选择填补空缺题目
            filteredQuestions = allQuestions.filter(q => q.type === 'fill_blank');
          } else {
            // +1门：选择判断正误题目
            filteredQuestions = allQuestions.filter(q => q.type === 'true_false');
          }
          
          // 如果没有符合条件的题目，使用所有题目
          if (filteredQuestions.length === 0) {
            filteredQuestions = allQuestions;
          }
          
          // 从过滤后的题目中随机选择一道
          const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
          const randomQuestion = filteredQuestions[randomIndex];
          
          // 设置当前题目
          setCurrentQuestion(randomQuestion);
          setSelectedAnswer('');
          setIsCorrect(null);
          
          // 对于方程式默写题目，生成可选择的项目
          if (randomQuestion.type === 'equation_memory') {
            // 从正确答案中提取所有物质
            const correctAnswer = randomQuestion.correctAnswer;
            // 移除反应条件、等号、箭头、系数、加号、气体符号和沉淀符号，提取物质
            // 首先移除反应条件
            let cleanedAnswer = correctAnswer.replace(/[△高温加热催化剂点燃通电]/g, ' ');
            // 移除等号、箭头、加号、气体符号和沉淀符号
            cleanedAnswer = cleanedAnswer.replace(/[=→+↑↓]/g, ' ');
            // 移除系数（只移除化学式前面的数字，不移除化学式中的数字）
            // 使用正则表达式，只移除单词开头的数字
            cleanedAnswer = cleanedAnswer.replace(/\b(\d+)(?=[A-Za-z])/g, ' ');
            // 移除多余的空格
            cleanedAnswer = cleanedAnswer.trim().replace(/\s+/g, ' ');
            // 分割并过滤空字符串
            const substances = cleanedAnswer.split(' ').filter((s: string) => s);
            
            // 确保至少有一些物质
            if (substances.length === 0) {
              // 如果没有提取到物质，使用一些默认物质
              substances.push('H₂', 'O₂', 'H₂O');
            }
            
            // 生成可选择的项目，包括正确的物质和一些干扰项
            // 从题库中随机选择一些其他物质作为干扰项
            const allSubstances = new Set(substances);
            // 从其他方程式题目中收集一些物质作为干扰项
            const distractors = [];
            const allEquationQuestions = [...questionBank.easy, ...questionBank.nightmare].filter(q => q.type === 'equation_memory');
            for (const q of allEquationQuestions) {
              const qAnswer = q.correctAnswer;
              // 同样处理其他题目答案，提取物质
              let qCleaned = qAnswer.replace(/[△高温加热催化剂点燃通电]/g, ' ');
              qCleaned = qCleaned.replace(/[=→+↑↓]/g, ' ');
              // 移除系数（只移除化学式前面的数字，不移除化学式中的数字）
              // 使用正则表达式，只移除单词开头的数字
              qCleaned = qCleaned.replace(/\b(\d+)(?=[A-Za-z])/g, ' ');
              qCleaned = qCleaned.trim().replace(/\s+/g, ' ');
              const qSubstances = qCleaned.split(' ').filter(s => s);
              for (const sub of qSubstances) {
                if (!allSubstances.has(sub) && distractors.length < 5) {
                  distractors.push(sub);
                  allSubstances.add(sub);
                }
              }
            }
            
            // 如果没有找到干扰项，使用一些默认干扰项
            if (distractors.length === 0) {
              const defaultDistractors = ['CO₂', 'CO', 'NaOH', 'HCl', 'NaCl'];
              for (const distractor of defaultDistractors) {
                if (!allSubstances.has(distractor)) {
                  distractors.push(distractor);
                  allSubstances.add(distractor);
                }
              }
            }
            
            // 合并正确物质和干扰项，然后随机排序
            const allItems = [...substances, ...distractors].map((content, index) => ({
              id: `item-${index}`,
              content
            }));
            // 随机排序
            allItems.sort(() => Math.random() - 0.5);
            
            setSelectedItems(allItems);
            setEquationItems([]);
            setCoefficients({});
          } else {
            // 重置方程式默写相关状态
            setSelectedItems([]);
            setEquationItems([]);
            setCoefficients({});
          }
          
          // 选择门后显示题目
          setShowExplanation(true);
          setRunning(false);
          
          // 根据门的类型和难度设置不同的倒计时时间
          let initialCountdown = 30; // 默认时间
          if (selectedDoor.value === 5) {
            // +5门：简单模式60秒，恶魔模式90秒
            initialCountdown = difficulty === 'nightmare' ? 90 : 60;
          }
          setCountdown(initialCountdown);
          
          // 通知父组件倒计时开始
          if (onCountdownChange) {
            onCountdownChange(true, initialCountdown);
          }
          
          // 清除旧的倒计时定时器
          if (countdownTimer) {
            clearInterval(countdownTimer);
            setCountdownTimer(null);
          }
          
          // 立即启动定时器，使用闭包保存初始值
          let currentCount = initialCountdown;
          const newCountdownTimer = setInterval(() => {
            currentCount--;
            setCountdown(currentCount);
            
            // 通知父组件倒计时时间变化
            if (onCountdownChange) {
              onCountdownChange(true, currentCount);
            }
            
            if (currentCount <= 0) {
              clearInterval(newCountdownTimer);
              setCountdownTimer(null);
              // 通知父组件倒计时结束
              if (onCountdownChange) {
                onCountdownChange(false, 0);
              }
              // 倒计时结束，自动提交答案
              handleSubmit();
            }
          }, 1000);
          
          // 保存新的倒计时定时器ID
          setCountdownTimer(newCountdownTimer);
        }
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'a') gameState.current.keys.a = false;
      if (e.key === 'd') gameState.current.keys.d = false;
      if (e.key === ' ') gameState.current.keys.space = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [difficulty, doorPosition, showExplanation]);

  // 初始化 Canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 设置 Canvas 尺寸
    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = 400;
      gameState.current.character.y = canvas.height / 2 - gameState.current.character.height / 2;
      gameState.current.doors.forEach((door, index) => {
        door.x = canvas.width / 2 - 120 + index * 120;
        door.y = canvas.height / 2 - 75;
      });
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 游戏主循环
    const gameLoop = () => {
      if (!gameOver && gameStarted) {
        if (!showExplanation) {
          update();
        }
        render();
        requestAnimationFrame(gameLoop);
      }
    };

    // 更新游戏状态
    const update = () => {
      const state = gameState.current;
      const canvas = canvasRef.current;
      if (!canvas) return;

      // 移动角色（根据题目索引设定速度）
      // 选择题目后禁止移动角色
      if (!showExplanation) {
        // 前五题速度为5，后六题速度为1
        const moveSpeed = questionIndex < 5 ? 5 : 1;
        if (state.keys.a && state.character.x > 50) {
          state.character.x -= moveSpeed;
        }
        if (state.keys.d && state.character.x < canvas.width - state.character.width - 50) {
          state.character.x += moveSpeed;
        }
      }

      // 角色跑动动画
      if (running) {
        state.character.running = true;
        state.time = (state.time + 1) % 100; // 限制time值，防止动画速度变快
      } else {
        state.character.running = false;
      }

      // 门固定位置，不自动移动
      // 玩家通过 a 和 d 控制角色移动来选择门
    };

    // 渲染游戏
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const state = gameState.current;
      if (!canvas || !ctx) return;

      // 清空画布
      ctx.fillStyle = '#f0fdf4';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 绘制背景
      drawBackground(ctx, canvas.width, canvas.height);

      // 绘制门
      drawDoors(ctx, state.doors, doorPosition);

      // 绘制角色
      drawCharacter(ctx, state.character);

      // 绘制分数
      drawScore(ctx, score);
    };

    // 绘制背景
    const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // 绘制地面
      ctx.fillStyle = '#d9f99d';
      ctx.fillRect(0, height - 50, width, 50);

      // 绘制树木
      for (let i = 0; i < 10; i++) {
        const x = (i * 100) % (width + 100);
        drawTree(ctx, x, height - 100);
      }
    };

    // 绘制树木
    const drawTree = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      // 树干
      ctx.fillStyle = '#8b4513';
      ctx.fillRect(x, y, 20, 50);
      // 树叶
      ctx.fillStyle = '#22c55e';
      ctx.beginPath();
      ctx.arc(x + 10, y - 20, 30, 0, Math.PI * 2);
      ctx.fill();
    };

    // 绘制门
    const drawDoors = (ctx: CanvasRenderingContext2D, doors: any[], position: number) => {
      doors.forEach(door => {
        const doorX = door.x + position;
        // 绘制门框
        ctx.fillStyle = door.color;
        ctx.fillRect(doorX, door.y, door.width, door.height);
        // 绘制门内
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(doorX + 5, door.y + 5, door.width - 10, door.height - 10);
        // 绘制门值
        ctx.fillStyle = '#000000';
        ctx.font = '24px Saira';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`+${door.value}`, doorX + door.width / 2, door.y + door.height / 2);
      });
    };

    // 绘制角色
    const drawCharacter = (ctx: CanvasRenderingContext2D, character: any) => {
      // 绘制角色身体
      ctx.fillStyle = '#3b82f6';
      ctx.fillRect(character.x, character.y, character.width, character.height);

      // 绘制角色头部
      ctx.beginPath();
      ctx.arc(character.x + character.width / 2, character.y - 20, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#3b82f6';
      ctx.fill();

      // 绘制角色眼睛
      ctx.beginPath();
      ctx.arc(character.x + character.width / 2 - 5, character.y - 25, 3, 0, Math.PI * 2);
      ctx.arc(character.x + character.width / 2 + 5, character.y - 25, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // 绘制角色嘴巴
      ctx.beginPath();
      ctx.arc(character.x + character.width / 2, character.y - 15, 5, 0, Math.PI);
      ctx.strokeStyle = '#ffffff';
      ctx.stroke();

      // 绘制跑动动画
      if (character.running) {
        const legOffset = Math.sin(character.time * 0.2) * 10;
        // 绘制左腿
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(character.x + 10, character.y + character.height - 10, 10, 20);
        // 绘制右腿
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(character.x + 30, character.y + character.height - 10 + legOffset, 10, 20);
      } else {
        // 绘制站立状态的腿
        ctx.fillStyle = '#3b82f6';
        ctx.fillRect(character.x + 10, character.y + character.height - 10, 10, 20);
        ctx.fillRect(character.x + 30, character.y + character.height - 10, 10, 20);
      }
    };

    // 绘制分数
    const drawScore = (ctx: CanvasRenderingContext2D, score: number) => {
      ctx.fillStyle = '#22c55e';
      ctx.font = '24px Saira';
      ctx.textAlign = 'left';
      ctx.fillText(`分数: ${score}`, 20, 40);
    };

    gameLoop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [gameStarted, gameOver, showExplanation, running, score, questionIndex]);

  // 开始游戏
  const handleStartGame = () => {
    setGameStarted(true);
    setRunning(false); // 不需要自动开始跑动
    setTimer(setInterval(() => {
      setTimeUsed(prev => prev + 1);
    }, 1000));
  };





  // 提交答案
  const handleSubmit = () => {
    // 停止倒计时
    if (countdownTimer) {
      clearInterval(countdownTimer);
      setCountdownTimer(null);
      // 通知父组件倒计时结束
      if (onCountdownChange) {
        onCountdownChange(false, 0);
      }
    }
    
    let correct = false;
    
    if (!currentQuestion) {
      // 如果没有题目，默认为错误
      setIsCorrect(false);
      return;
    }

    if (currentQuestion.type === 'fill_blank') {
      const correctAnswers = currentQuestion.blanks.map((blank: any) => blank.correctAnswer);
      correct = selectedAnswer.split(',').every((answer, index) => answer.trim() === correctAnswers[index]);
    } else if (currentQuestion.type === 'true_false') {
      correct = selectedAnswer === (currentQuestion.correctAnswer ? 'true' : 'false');
    } else if (currentQuestion.type === 'equation_memory') {
      // 处理方程式默写的情况，使用拖放式答案
      // 构建方程式字符串
      const reactants = equationItems
        .filter(item => item.isReactant)
        .map(item => {
          const coefficient = coefficients[item.id]?.value;
          return `${coefficient === '' || coefficient === undefined || coefficient === '0' ? 1 : coefficient}${item.content}`;
        })
        .join(' + ');
      
      const products = equationItems
        .filter(item => !item.isReactant)
        .map(item => {
          // 对于气体符号和沉淀符号，不需要添加系数
          if (item.content === '↑' || item.content === '↓') {
            return item.content;
          }
          const coefficient = coefficients[item.id]?.value;
          return `${coefficient === '' || coefficient === undefined || coefficient === '0' ? 1 : coefficient}${item.content}`;
        })
        .join(' + ');
      
      // 构建方程式字符串，不包含反应条件，因为反应条件可能会影响比较结果
      const equationString = `${reactants} = ${products}`;
      correct = compareEquations(equationString, currentQuestion.correctAnswer);
    }

    setIsCorrect(correct);

    // 答对了加对应的分数
    if (correct) {
      // 根据门的难度（value）来增加相应的分数，如果没有选择门，默认加 1 分
      setScore(prev => prev + selectedDoorValue);
    }
  };

  // 处理提示使用
  const handleHintUsed = () => {
    // 提示使用逻辑可以在这里添加，例如扣除分数等
  };

  // 进入下一题
  const handleNext = () => {
    // 清除倒计时定时器
    if (countdownTimer) {
      clearInterval(countdownTimer);
      setCountdownTimer(null);
      // 通知父组件倒计时结束
      if (onCountdownChange) {
        onCountdownChange(false, 0);
      }
    }
    
    // 重置人物位置到初始位置
    gameState.current.character.x = 100;
    
    setShowExplanation(false);
    setRunning(true);
    // 重置答题状态
    setSelectedAnswer('');
    setIsCorrect(null);
    // 重置方程式默写相关状态
    setEquationItems([]);
    setSelectedItems([]);
    setCoefficients({});
    // 重置倒计时
    setCountdown(30);
    // 更新题目索引
    setQuestionIndex(prev => prev + 1);
  };

  // 处理拖放开始
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    let itemContent = '';
    
    // 检查是否是气体符号或沉淀符号
    if (itemId === 'symbol-0') {
      itemContent = '↑';
    } else if (itemId === 'symbol-1') {
      itemContent = '↓';
    } else {
      // 从 selectedItems 中查找拖动的项目
      const item = selectedItems.find(i => i.id === itemId);
      if (item) {
        itemContent = item.content;
      }
    }
    
    if (itemContent && e.dataTransfer && e.currentTarget) {
      // 创建一个临时元素作为拖动图像
      const dragImage = document.createElement('div');
      dragImage.style.position = 'absolute';
      dragImage.style.left = '-9999px';
      dragImage.style.top = '-9999px';
      dragImage.style.padding = '8px';
      dragImage.style.backgroundColor = '#1e293b';
      dragImage.style.color = '#e2e8f0';
      dragImage.style.borderRadius = '8px';
      dragImage.style.border = '1px solid #475569';
      dragImage.textContent = itemContent;
      document.body.appendChild(dragImage);
      
      // 设置拖动图像
      e.dataTransfer.setDragImage(dragImage, 0, 0);
      e.dataTransfer.setData('text/plain', itemContent);
      e.dataTransfer.effectAllowed = 'copy';
      
      // 拖动结束后移除临时元素
      setTimeout(() => {
        document.body.removeChild(dragImage);
      }, 0);
    }
  };

  // 处理拖放结束
  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  // 处理拖放目标
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // 处理拖放
  const handleDrop = (e: React.DragEvent, isReactant: boolean) => {
    e.preventDefault();
    if (draggedItem) {
      let itemContent = '';
      
      // 检查是否是气体符号或沉淀符号
      if (draggedItem === 'symbol-0') {
        itemContent = '↑';
      } else if (draggedItem === 'symbol-1') {
        itemContent = '↓';
      } else {
        // 从 selectedItems 中查找拖动的项目
        const item = selectedItems.find(i => i.id === draggedItem);
        if (item) {
          itemContent = item.content;
        }
      }
      
      if (itemContent) {
        // 对于气体符号和沉淀符号，不需要检查是否已经存在
        // 直接添加到方程式中
        if (itemContent === '↑' || itemContent === '↓') {
          // 气体符号和沉淀符号只能添加到生成物中
          if (!isReactant) {
            const newItem = {
              id: `eq-${Date.now()}-${Math.random()}`,
              content: itemContent,
              coefficient: '',
              isReactant: false
            };
            setEquationItems([...equationItems, newItem]);
            // 初始化系数状态
            setCoefficients(prev => ({
              ...prev,
              [newItem.id]: {
                value: '',
                hasUserInput: false
              }
            }));
          }
        } else {
          // 对于普通物质，检查是否已经存在相同的物质
          if (!equationItems.some(i => i.content === itemContent)) {
            const newItem = {
              id: `eq-${Date.now()}-${Math.random()}`,
              content: itemContent,
              coefficient: '',
              isReactant
            };
            setEquationItems([...equationItems, newItem]);
            // 初始化系数状态
            setCoefficients(prev => ({
              ...prev,
              [newItem.id]: {
                value: '0',
                hasUserInput: false
              }
            }));
            // 从可选择项目中移除已拖放的项目
            setSelectedItems(selectedItems.filter(i => i.id !== draggedItem));
          }
        }
      }
    }
  };

  // 移除已拖放的项目
  const handleRemoveItem = (id: string) => {
    const item = equationItems.find(i => i.id === id);
    if (item) {
      setEquationItems(equationItems.filter(i => i.id !== id));
      setSelectedItems([...selectedItems, { id: `item-${Date.now()}`, content: item.content }]);
      // 移除对应的系数
      const newCoefficients = { ...coefficients };
      delete newCoefficients[id];
      setCoefficients(newCoefficients);
    }
  };

  // 处理系数变化
  const handleCoefficientChange = (id: string, value: string) => {
    // 移除前导零
    if (value.startsWith('0') && value.length > 1) {
      value = value.replace(/^0+/, '');
    }
    // 如果值为空，设置为 '0'
    if (value === '') {
      value = '0';
    }
    setCoefficients(prev => ({
      ...prev,
      [id]: {
        value: value,
        hasUserInput: value !== '0'
      }
    }));
  };

  // 从正确答案中提取反应条件
  const getReactionCondition = () => {
    const correctAnswer = currentQuestion?.correctAnswer;
    if (!correctAnswer) return '';
    // 常见的反应条件关键词
    const conditionKeywords = ['高温', '加热', '△', '催化剂', '点燃', '通电'];
    
    // 遍历关键词，查找是否存在反应条件
    for (const keyword of conditionKeywords) {
      if (correctAnswer.includes(keyword)) {
        return keyword;
      }
    }
    
    return '';
  };

  // 检查游戏结束
  useEffect(() => {
    if (questionIndex >= 10) {
      setGameOver(true);
      if (timer) clearInterval(timer);
      if (countdownTimer) clearInterval(countdownTimer);
      onGameEnd(score, timeUsed);
    }
  }, [questionIndex, gameOver, score, timeUsed, onGameEnd, timer, countdownTimer]);

  // 键盘事件监听
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // 阻止空格键的默认滚动行为
      if (e.key === ' ') {
        e.preventDefault();
      }
      // 当显示题目且未提交答案时，按Enter或空格提交答案
      if (showExplanation && currentQuestion && isCorrect === null && (e.key === 'Enter' || e.key === ' ')) {
        handleSubmit();
      }
      // 当已经提交答案且显示解析时，按Enter或空格进入下一题
      else if (isCorrect !== null && (e.key === 'Enter' || e.key === ' ')) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showExplanation, currentQuestion, isCorrect, questionIndex, score, timeUsed, onGameEnd, timer, countdownTimer]);

  if (!gameStarted) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="max-w-lg text-center p-6">
          <h3 className="text-2xl font-bold text-primary mb-4">积分比拼</h3>
          <p className="text-gray-300 mb-6">
            你醒来后发现自己出现在一片森林中的空地上，空地上是三扇门，写着不同的数字，门里面分别是判断题，配平题，与默写题；往树林里跑去不久后却回到了空地上，你知道你只能进门了…请选择三扇门中的一扇，挑战门中的题目，在10道门后争取用更短的时间与分数逃出生天吧！
          </p>
          <p className="text-gray-300 mb-6">
            操作方法：按a与d左右移动，按w选择门，选择门后下方会出现题目，请在规定时间内作答。
          </p>
          <button
            className="px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium btn-hover"
            onClick={handleStartGame}
          >
            开始游戏
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto p-4">
      {/* 游戏画布 */}
      <canvas
        ref={canvasRef}
        className="w-full h-96 bg-bg rounded-lg tech-border mb-6"
      />

      {/* 答题进度 */}
      <div className="mb-4 text-center">
        <div className="text-lg font-medium">
          答题进度: {questionIndex}/10
        </div>
      </div>

      {/* 下一题按钮 */}
      {isCorrect !== null && (
        <div className="mb-6">
          <button
            className="w-full py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium btn-hover"
            onClick={handleNext}
          >
            下一题
          </button>
        </div>
      )}

      {/* 题目内容 */}
      {showExplanation && currentQuestion && (
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-4">{currentQuestion?.content.replace(/\d+\s*/g, '')}</h3>
          
          {/* 提示按钮 */}
          {currentQuestion?.hints && currentQuestion.hints.length > 0 && isCorrect === null && (
            <HintButton
              hints={currentQuestion.hints}
              onHintUsed={handleHintUsed}
            />
          )}
          
          <div className="mb-4">
            {/* 根据题目类型显示不同的输入方式 */}
            {currentQuestion.type === 'true_false' && (
              <div className="flex space-x-4">
                <button
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${isCorrect !== null 
                    ? (isCorrect && selectedAnswer === 'true' ? 'bg-accent' : isCorrect === false && selectedAnswer === 'true' ? 'bg-danger' : '') 
                    : selectedAnswer === 'true' ? 'bg-primary/30 border-primary' : 'bg-card hover:bg-gray-700'}`}
                  onClick={() => setSelectedAnswer('true')}
                >
                  正确
                </button>
                <button
                  className={`flex-1 py-2 px-4 rounded-lg transition-colors ${isCorrect !== null 
                    ? (isCorrect && selectedAnswer === 'false' ? 'bg-accent' : isCorrect === false && selectedAnswer === 'false' ? 'bg-danger' : '') 
                    : selectedAnswer === 'false' ? 'bg-primary/30 border-primary' : 'bg-card hover:bg-gray-700'}`}
                  onClick={() => setSelectedAnswer('false')}
                >
                  错误
                </button>
              </div>
            )}
            {currentQuestion && currentQuestion.type === 'fill_blank' && (
              <div className="space-y-2">
                {currentQuestion.blanks.map((_: any, index: number) => {
                  // 确保答案数组长度足够
                  const answers = selectedAnswer.split(',');
                  while (answers.length <= index) {
                    answers.push('');
                  }
                  return (
                    <input
                      key={index}
                      type="text"
                      className={`w-full py-1 px-3 rounded-lg input-tech ${isCorrect !== null ? (isCorrect ? 'border-accent' : 'border-danger') : ''}`}
                      value={answers[index]}
                      onChange={(e) => {
                        const newAnswers = selectedAnswer.split(',');
                        while (newAnswers.length <= index) {
                          newAnswers.push('');
                        }
                        newAnswers[index] = e.target.value;
                        setSelectedAnswer(newAnswers.join(','));
                      }}
                      placeholder={`请输入第 ${index + 1} 个空的答案`}
                    />
                  );
                })}
              </div>
            )}
            {currentQuestion && currentQuestion.type === 'equation_memory' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <p className="text-gray-300">请将选择的项目拖放到对应区域并填入系数:</p>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300">沉淀或气体：</span>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, 'symbol-0')}
                      onDragEnd={handleDragEnd}
                      className="px-3 py-2 bg-card rounded-lg border border-gray-700 hover:border-primary cursor-move transition-colors"
                    >
                      ↑
                    </div>
                    <div
                      draggable
                      onDragStart={(e) => handleDragStart(e, 'symbol-1')}
                      onDragEnd={handleDragEnd}
                      className="px-3 py-2 bg-card rounded-lg border border-gray-700 hover:border-primary cursor-move transition-colors"
                    >
                      ↓
                    </div>
                  </div>
                </div>
                
                {/* 可选择的项目 */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {selectedItems.map((item) => (
                    <div
                      key={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item.id)}
                      onDragEnd={handleDragEnd}
                      className="px-3 py-2 bg-card rounded-lg border border-gray-700 hover:border-primary cursor-move transition-colors"
                    >
                      {item.content}
                    </div>
                  ))}
                </div>
                
                {/* 方程式拖放区域 */}
                <div className="flex flex-col items-center">
                  {/* 反应物区域 */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, true)}
                    className="w-full min-h-[80px] p-3 border-2 border-dashed border-gray-600 rounded-lg mb-3"
                  >
                    <h4 className="text-center text-gray-400 mb-1 text-sm">反应物</h4>
                    <div className="flex flex-wrap gap-2 items-center justify-center">
                      {equationItems
                        .filter(item => item.isReactant)
                        .map((item, index, array) => (
                          <React.Fragment key={item.id}>
                            <div className="flex items-center gap-2">
                              {/* 对于气体符号和沉淀符号，不显示输入框 */}
                              {item.content !== '↑' && item.content !== '↓' && (
                                <input
                                  type="text"
                                  className={`w-12 py-1 px-2 bg-card rounded-lg tech-border text-center ${!coefficients[item.id]?.hasUserInput ? 'text-gray-500' : ''} ${isCorrect !== null ? (isCorrect ? 'border-accent' : 'border-danger') : ''}`}
                                  value={coefficients[item.id]?.value || '0'}
                                  onChange={(e) => handleCoefficientChange(item.id, e.target.value)}
                                  onFocus={(e) => {
                                    if (!coefficients[item.id]?.hasUserInput) {
                                      e.target.value = '';
                                      setCoefficients(prev => ({
                                        ...prev,
                                        [item.id]: {
                                          value: '',
                                          hasUserInput: true
                                        }
                                      }));
                                    }
                                  }}
                                  onBlur={(e) => {
                                    if (!e.target.value) {
                                      setCoefficients(prev => ({
                                        ...prev,
                                        [item.id]: {
                                          value: '0',
                                          hasUserInput: false
                                        }
                                      }));
                                    }
                                  }}
                                />
                              )}
                              <span className="font-medium">{item.content}</span>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-danger hover:text-red-400"
                              >
                                ×
                              </button>
                            </div>
                            {index < array.length - 1 && item.content !== '↑' && item.content !== '↓' && array[index + 1].content !== '↑' && array[index + 1].content !== '↓' && (
                              <span className="text-xl font-bold text-gray-400">+</span>
                            )}
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                  
                  {/* 反应条件或等号 */}
                  <div className="flex flex-col items-center text-xl font-bold text-gray-400 mb-3 w-full">
                    {getReactionCondition() || "="}
                  </div>
                  
                  {/* 生成物区域 */}
                  <div
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, false)}
                    className="w-full min-h-[80px] p-3 border-2 border-dashed border-gray-600 rounded-lg"
                  >
                    <h4 className="text-center text-gray-400 mb-1 text-sm">生成物</h4>
                    <div className="flex flex-wrap gap-2 items-center justify-center">
                      {equationItems
                        .filter(item => !item.isReactant)
                        .map((item, index, array) => (
                          <React.Fragment key={item.id}>
                            <div className="flex items-center gap-2">
                              {/* 对于气体符号和沉淀符号，不显示输入框 */}
                              {item.content !== '↑' && item.content !== '↓' && (
                                <input
                                  type="text"
                                  className={`w-12 py-1 px-2 bg-card rounded-lg tech-border text-center ${!coefficients[item.id]?.hasUserInput ? 'text-gray-500' : ''} ${isCorrect !== null ? (isCorrect ? 'border-accent' : 'border-danger') : ''}`}
                                  value={coefficients[item.id]?.value || '0'}
                                  onChange={(e) => handleCoefficientChange(item.id, e.target.value)}
                                  onFocus={(e) => {
                                    if (!coefficients[item.id]?.hasUserInput) {
                                      e.target.value = '';
                                      setCoefficients(prev => ({
                                        ...prev,
                                        [item.id]: {
                                          value: '',
                                          hasUserInput: true
                                        }
                                      }));
                                    }
                                  }}
                                  onBlur={(e) => {
                                    if (!e.target.value) {
                                      setCoefficients(prev => ({
                                        ...prev,
                                        [item.id]: {
                                          value: '0',
                                          hasUserInput: false
                                        }
                                      }));
                                    }
                                  }}
                                />
                              )}
                              <span className="font-medium">{item.content}</span>
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="text-danger hover:text-red-400"
                              >
                                ×
                              </button>
                            </div>
                            {index < array.length - 1 && item.content !== '↑' && item.content !== '↓' && array[index + 1].content !== '↑' && array[index + 1].content !== '↓' && (
                              <span className="text-xl font-bold text-gray-400">+</span>
                            )}
                          </React.Fragment>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {isCorrect === null && (
            <button
              className="w-full py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium btn-hover"
              onClick={handleSubmit}
            >
              提交答案
            </button>
          )}
        </div>
      )}

      {/* 解析 */}
      {isCorrect !== null && (
        <div className="mt-6 mb-8">
          <div className="p-4 bg-card rounded-lg tech-border mb-4 overflow-y-auto max-h-40">
            <h4 className="text-lg font-medium mb-2 text-primary">解析</h4>
            <p className="text-gray-300 mb-4">{currentQuestion?.explanation}</p>
            <div className="mb-4">
              <h5 className="text-md font-medium mb-2 text-gray-300">正确答案:</h5>
              {currentQuestion?.type === 'fill_blank' && (
                <div className="space-y-2">
                  {currentQuestion?.blanks.map((blank: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                      <span className="w-20 text-gray-400">第 {index + 1} 空:</span>
                      <span className="text-accent font-medium">{blank.correctAnswer}</span>
                    </div>
                  ))}
                </div>
              )}
              {currentQuestion?.type === 'true_false' && (
                <span className={`font-medium ${currentQuestion?.correctAnswer ? 'text-accent' : 'text-danger'}`}>
                  {currentQuestion?.correctAnswer ? '正确' : '错误'}
                </span>
              )}
              {currentQuestion?.type === 'equation_memory' && (
                <div className="p-3 bg-bg rounded-lg">
                  {currentQuestion?.correctAnswer}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreCompetitionGame;