import React, { useRef, useEffect, useState } from 'react';
import { Difficulty } from '../../data/types';
import questionBank from '../../data/questions';
import HintButton from '../HintButton';


interface MiaoRunGameProps {
  difficulty: Difficulty;
  onGameEnd: (score: number, timeUsed: number) => void;
}

const MiaoRunGame: React.FC<MiaoRunGameProps> = ({ difficulty, onGameEnd }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);


  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeUsed, setTimeUsed] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);
  const [countdownTimer, setCountdownTimer] = useState<number | null>(null);

  // 游戏状态
  const gameState = useRef({
    character: { x: 100, y: 200, width: 60, height: 80 },
    buttons: {
      correct: { x: 200, y: 150, width: 80, height: 80 },
      incorrect: { x: 200, y: 250, width: 80, height: 80 }
    },
    demon: { x: 600, y: 200, width: 60, height: 80, speed: 8 }, // 调整恶魔速度为更快
    keys: { w: false, s: false },
    time: 0,
    attacking: false,
    attackDirection: 'up' as 'up' | 'down',
    demonPassed: false,
    demonMoving: false,
    countdown: 30,
    countdownEnded: false,
  });

  // 初始化题目
  useEffect(() => {
    let allQuestions: any[] = [];
    
    if (difficulty === 'nightmare') {
      // 噩梦难度：从所有难度的题库中选择，但给简单题较低的权重
      const easyQuestions = questionBank.easy.filter(q => q.type === 'true_false');
      const nightmareQuestions = questionBank.nightmare.filter(q => q.type === 'true_false');
      
      // 为简单题添加较低的权重（每道简单题只添加一次，而噩梦题添加多次）
      allQuestions = [...easyQuestions];
      // 添加噩梦题（多次添加以增加出现几率）
      for (let i = 0; i < 3; i++) {
        allQuestions = [...allQuestions, ...nightmareQuestions];
      }
    } else {
      // 简单难度：只从简单题库中选择
      allQuestions = questionBank[difficulty].filter(q => q.type === 'true_false');
    }
    
    // 随机打乱题目顺序并选择10道不重复的题目
    const shuffledQuestions = [...allQuestions].sort(() => Math.random() - 0.5);
    // 去重，确保不重复
    const uniqueQuestions = [];
    const seenIds = new Set();
    for (const question of shuffledQuestions) {
      if (!seenIds.has(question.id) && uniqueQuestions.length < 10) {
        uniqueQuestions.push(question);
        seenIds.add(question.id);
      }
    }
    
    setQuestions(uniqueQuestions);
    if (uniqueQuestions.length > 0) {
      setCurrentQuestion(uniqueQuestions[0]);
    }
  }, [difficulty]);

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
      gameState.current.buttons.correct.y = canvas.height / 2 - 100;
      gameState.current.buttons.incorrect.y = canvas.height / 2 + 20;
      gameState.current.demon.y = canvas.height / 2 - gameState.current.demon.height / 2;
      gameState.current.demon.x = canvas.width - 100;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 键盘事件监听
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w') gameState.current.keys.w = true;
      if (e.key === 's') gameState.current.keys.s = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'w') gameState.current.keys.w = false;
      if (e.key === 's') gameState.current.keys.s = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 游戏主循环
    const gameLoop = () => {
      if (!gameOver && gameStarted && !showExplanation) {
        // 只有在恶魔不移动时才运行update函数
        if (!gameState.current.demonMoving) {
          update();
        }
        // 无论恶魔是否移动，都运行render函数
        render();
        requestAnimationFrame(gameLoop);
      }
    };

    // 更新游戏状态
    const update = () => {
      const state = gameState.current;
      const canvas = canvasRef.current;
      if (!canvas) return;

      // 移动恶魔（只在倒计时结束后且恶魔未通过）
      if (state.countdownEnded && !state.demonPassed) {
        state.demon.x -= state.demon.speed;
      }

      // 检测恶魔是否通过
      if (state.demon.x < -state.demon.width && !state.demonPassed && !showExplanation) {
        state.demonPassed = true;
        // 超时未选择，扣除生命值
        setLives(prev => prev - 1);
        setShowExplanation(true);

      }

      // 检测攻击
      if (state.attacking) {
        // 攻击动画逻辑
        state.time++;
        if (state.time > 30) {
          state.attacking = false;
          state.time = 0;
        }
      }
    };

    // 渲染游戏
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const state = gameState.current;
      if (!canvas || !ctx) return;

      // 清空画布
      ctx.fillStyle = '#f0f9ff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 绘制背景
      drawBackground(ctx, canvas.width, canvas.height);

      // 绘制角色
      drawCharacter(ctx, state.character, state.attacking, state.attackDirection);

      // 绘制按钮
      drawButtons(ctx, state.buttons);

      // 绘制恶魔
      drawDemon(ctx, state.demon);

      // 绘制生命值
      drawLives(ctx, lives);

      // 绘制分数
      drawScore(ctx, score);

      // 绘制倒计时
      drawCountdown(ctx, gameState.current.countdown);
    };

    // 绘制背景
    const drawBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // 绘制地面
      ctx.fillStyle = '#e5e7eb';
      ctx.fillRect(0, height - 50, width, 50);

      // 绘制云朵
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 5; i++) {
        const x = Math.random() * width;
        const y = Math.random() * (height - 100);
        drawCloud(ctx, x, y);
      }
    };

    // 绘制云朵
    const drawCloud = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.arc(x + 20, y, 25, 0, Math.PI * 2);
      ctx.arc(x + 40, y, 20, 0, Math.PI * 2);
      ctx.fill();
    };

    // 绘制角色
    const drawCharacter = (ctx: CanvasRenderingContext2D, character: any, attacking: boolean, attackDirection: 'up' | 'down') => {
      // 绘制角色身体
      ctx.fillStyle = '#ffc0cb';
      ctx.fillRect(character.x, character.y, character.width, character.height);

      // 绘制角色头部
      ctx.beginPath();
      ctx.arc(character.x + character.width / 2, character.y - 20, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#ffc0cb';
      ctx.fill();

      // 绘制角色眼睛
      ctx.beginPath();
      ctx.arc(character.x + character.width / 2 - 5, character.y - 25, 3, 0, Math.PI * 2);
      ctx.arc(character.x + character.width / 2 + 5, character.y - 25, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();

      // 绘制角色嘴巴
      ctx.beginPath();
      ctx.arc(character.x + character.width / 2, character.y - 15, 5, 0, Math.PI);
      ctx.strokeStyle = '#000000';
      ctx.stroke();

      // 绘制攻击动画
      if (attacking) {
        if (attackDirection === 'up') {
          // 向上攻击
          ctx.beginPath();
          ctx.moveTo(character.x + character.width, character.y + character.height / 2);
          ctx.lineTo(character.x + character.width + 30, character.y - 10);
          ctx.strokeStyle = '#ff6b6b';
          ctx.lineWidth = 3;
          ctx.stroke();
        } else {
          // 向下攻击
          ctx.beginPath();
          ctx.moveTo(character.x + character.width, character.y + character.height / 2);
          ctx.lineTo(character.x + character.width + 30, character.y + character.height + 10);
          ctx.strokeStyle = '#ff6b6b';
          ctx.lineWidth = 3;
          ctx.stroke();
        }
      }
    };

    // 绘制按钮
    const drawButtons = (ctx: CanvasRenderingContext2D, buttons: any) => {
      // 绘制正确按钮（蓝色）
      ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
      ctx.fillRect(buttons.correct.x, buttons.correct.y, buttons.correct.width, buttons.correct.height);
      ctx.strokeStyle = '#3b82f6';
      ctx.lineWidth = 2;
      ctx.strokeRect(buttons.correct.x, buttons.correct.y, buttons.correct.width, buttons.correct.height);

      // 绘制正确按钮文字
      ctx.fillStyle = '#3b82f6';
      ctx.font = '24px Saira';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('W', buttons.correct.x + buttons.correct.width / 2, buttons.correct.y + buttons.correct.height / 2);

      // 绘制错误按钮（红色）
      ctx.fillStyle = 'rgba(239, 68, 68, 0.5)';
      ctx.fillRect(buttons.incorrect.x, buttons.incorrect.y, buttons.incorrect.width, buttons.incorrect.height);
      ctx.strokeStyle = '#ef4444';
      ctx.lineWidth = 2;
      ctx.strokeRect(buttons.incorrect.x, buttons.incorrect.y, buttons.incorrect.width, buttons.incorrect.height);

      // 绘制错误按钮文字
      ctx.fillStyle = '#ef4444';
      ctx.font = '24px Saira';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('S', buttons.incorrect.x + buttons.incorrect.width / 2, buttons.incorrect.y + buttons.incorrect.height / 2);
    };

    // 绘制恶魔
    const drawDemon = (ctx: CanvasRenderingContext2D, demon: any) => {
      // 绘制恶魔身体
      ctx.fillStyle = '#ef4444';
      ctx.fillRect(demon.x, demon.y, demon.width, demon.height);

      // 绘制恶魔头部
      ctx.beginPath();
      ctx.arc(demon.x + demon.width / 2, demon.y - 20, 20, 0, Math.PI * 2);
      ctx.fillStyle = '#ef4444';
      ctx.fill();

      // 绘制恶魔眼睛
      ctx.beginPath();
      ctx.arc(demon.x + demon.width / 2 - 5, demon.y - 25, 3, 0, Math.PI * 2);
      ctx.arc(demon.x + demon.width / 2 + 5, demon.y - 25, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#ffffff';
      ctx.fill();

      // 绘制恶魔嘴巴
      ctx.beginPath();
      ctx.arc(demon.x + demon.width / 2, demon.y - 15, 8, 0, Math.PI);
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      ctx.stroke();

      // 绘制恶魔角
      ctx.beginPath();
      ctx.moveTo(demon.x + demon.width / 2 - 10, demon.y - 40);
      ctx.lineTo(demon.x + demon.width / 2 - 15, demon.y - 50);
      ctx.moveTo(demon.x + demon.width / 2 + 10, demon.y - 40);
      ctx.lineTo(demon.x + demon.width / 2 + 15, demon.y - 50);
      ctx.strokeStyle = '#000000';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    // 绘制生命值
    const drawLives = (ctx: CanvasRenderingContext2D, lives: number) => {
      ctx.fillStyle = '#ef4444';
      ctx.font = '20px Saira';
      ctx.textAlign = 'left';
      ctx.fillText(`生命值: ${lives}`, 20, 30);
    };

    // 绘制分数
    const drawScore = (ctx: CanvasRenderingContext2D, score: number) => {
      ctx.fillStyle = '#22c55e';
      ctx.font = '20px Saira';
      ctx.textAlign = 'right';
      ctx.fillText(`分数: ${score}`, canvas.width - 20, 30);
    };

    // 绘制倒计时
    const drawCountdown = (ctx: CanvasRenderingContext2D, countdown: number) => {
      ctx.fillStyle = '#f59e0b';
      ctx.font = '24px Saira';
      ctx.textAlign = 'center';
      ctx.fillText(`${countdown}`, canvas.width / 2, 40);
    };

    gameLoop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (timer) clearInterval(timer);
      if (countdownTimer) clearInterval(countdownTimer);
    };
  }, [gameStarted, gameOver, showExplanation]);

  // 开始游戏
  const handleStartGame = () => {
    setGameStarted(true);
    setTimer(setInterval(() => {
      setTimeUsed(prev => prev + 1);
    }, 1000));
    startCountdown();
  };

  // 开始倒计时
  const startCountdown = () => {
    const initialCountdown = 30;
    gameState.current.countdown = initialCountdown;
    gameState.current.countdownEnded = false;
    
    // 清除旧的定时器
    if (countdownTimer) {
      clearInterval(countdownTimer);
    }
    
    // 创建新的定时器
    const newCountdownTimer = setInterval(() => {
      gameState.current.countdown--;
      
      if (gameState.current.countdown <= 0) {
        clearInterval(newCountdownTimer);
        gameState.current.countdownEnded = true;
        // 停止用时定时器
        if (timer) {
          clearInterval(timer);
          setTimer(null);
        }
        // 倒计时结束，让恶魔继续移动，直到穿过角色
        // 不再在这里直接扣除生命值和显示解析，而是在恶魔穿过角色时处理
      }
    }, 1000);
    
    // 保存新的定时器ID
    setCountdownTimer(newCountdownTimer);
  };

  // 处理键盘输入
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameStarted || gameOver || showExplanation || gameState.current.demonMoving) return;

      if (e.key === 'w' || e.key === 's') {
        // 设置恶魔正在移动状态，屏蔽后续输入
        gameState.current.demonMoving = true;
        
        // 停止倒计时和用时定时器
        if (countdownTimer) {
          clearInterval(countdownTimer);
          setCountdownTimer(null);
        }
        if (timer) {
          clearInterval(timer);
          setTimer(null);
        }
        
        // 记录玩家的选择
        const isCorrectChoice = (e.key === 'w' && currentQuestion?.correctAnswer === true) || 
                              (e.key === 's' && currentQuestion?.correctAnswer === false);
        
        // 让恶魔继续运行到选项位置
        const runDemonToButtons = () => {
          const state = gameState.current;
          const canvas = canvasRef.current;
          if (!canvas) return;
          
          // 移动恶魔
          state.demon.x -= state.demon.speed;
          
          // 检查恶魔是否到达选项位置
          const demonReachedButtons = state.demon.x < state.buttons.correct.x + state.buttons.correct.width && 
                                     state.demon.x > state.buttons.correct.x - state.demon.width;
          
          if (demonReachedButtons) {
            // 停止恶魔移动
            state.demon.speed = 0;
            
            // 根据选择是否正确执行不同逻辑
            if (isCorrectChoice) {
              // 正确：角色击打恶魔，恶魔消失
              gameState.current.attacking = true;
              gameState.current.attackDirection = e.key === 'w' ? 'up' : 'down';
              setScore(prev => prev + 10);
              
              // 立即设置恶魔已通过，避免碰撞检测逻辑继续执行
              gameState.current.demonPassed = true;
              
              // 延迟后隐藏恶魔
              setTimeout(() => {
                state.demon.x = -100;
              }, 300);
              
              // 延迟后显示解析
              setTimeout(() => {
                // 显示解析
                setShowExplanation(true);
                // 重置恶魔移动状态，允许后续输入
                gameState.current.demonMoving = false;
                // 不再自动切换到下一题，而是让用户通过按钮控制
              }, 1000);
            } else {
              // 错误：恶魔穿过角色
              // 不在这里扣血，而是在恶魔穿过角色时扣血
              
              // 延迟后让恶魔继续移动穿过角色
              setTimeout(() => {
                state.demon.speed = 8; // 保持恶魔速度为 8
                
                // 检查恶魔是否穿过角色
                const checkDemonPassed = () => {
                  if (state.demon.x < -state.demon.width) {
                    // 恶魔穿过角色，扣除生命值
                    setLives(prev => prev - 1);
                    // 立即设置恶魔已通过，避免碰撞检测逻辑继续执行
                    gameState.current.demonPassed = true;
                    // 重置恶魔移动状态，允许后续输入
                    gameState.current.demonMoving = false;
                    // 隐藏恶魔
                    state.demon.x = -100;
                    // 显示解析
                    setShowExplanation(true);
                    // 不再自动切换到下一题，而是让用户通过按钮控制
                  } else {
                    // 继续移动恶魔
                    state.demon.x -= state.demon.speed;
                    requestAnimationFrame(checkDemonPassed);
                  }
                };
                
                checkDemonPassed();
              }, 500);
            }
          } else {
            // 继续移动恶魔
            requestAnimationFrame(runDemonToButtons);
          }
        };
        
        // 开始让恶魔运行到选项位置
        runDemonToButtons();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameStarted, gameOver, showExplanation, currentQuestion, countdownTimer]);

  // 处理提示使用
  const handleHintUsed = (hintIndex: number) => {
    // 提示使用逻辑可以在这里添加，例如扣除分数等
    console.log(`Hint ${hintIndex + 1} used`);
  };

  // 下一题
  const handleNext = () => {
    const nextIndex = questionIndex + 1;
    if (nextIndex < questions.length) {
      setQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
      setShowExplanation(false);

      gameState.current.demon.x = canvasRef.current?.width || 800;
      gameState.current.demonPassed = false;
      gameState.current.demonMoving = false;
      gameState.current.demon.speed = 8; // 保持恶魔速度为 8
      startCountdown();
      // 重新启动用时定时器
      setTimer(setInterval(() => {
        setTimeUsed(prev => prev + 1);
      }, 1000));
    } else {
      // 游戏结束
      setGameOver(true);
      if (timer) clearInterval(timer);
      if (countdownTimer) clearInterval(countdownTimer);
      onGameEnd(score, timeUsed);
    }
  };

  // 检查生命值
  useEffect(() => {
    if (lives <= 0) {
      setGameOver(true);
      if (timer) clearInterval(timer);
      if (countdownTimer) clearInterval(countdownTimer);
      onGameEnd(score, timeUsed);
    }
  }, [lives, gameOver, score, timeUsed, onGameEnd, timer, countdownTimer]);

  // 键盘事件监听
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // 阻止空格键的默认滚动行为
      if (e.key === ' ') {
        e.preventDefault();
      }
      // 当显示解析时，按Enter或空格进入下一题
      if (showExplanation && (e.key === 'Enter' || e.key === ' ')) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showExplanation, questionIndex, questions, gameState, canvasRef, countdownTimer, timer, onGameEnd, score, timeUsed]);

  if (!gameStarted) {
    return (
      <div className="flex items-center justify-center min-h-[70vh]">
        <div className="max-w-lg text-center p-6">
          <h3 className="text-2xl font-bold text-primary mb-4">喵斯快跑</h3>
          <p className="text-gray-300 mb-6">
            王国的公主惨遭恶魔绑架，你作为一名穿越而来的勇者，只身一人闯入魔王的城堡与魔王展开最终斗争。请你运用化学知识，判断题目的正误，击败魔王，解救公主。考察知识点的记忆，共10道题。
          </p>
          <p className="text-gray-300 mb-6">
            操作方法：按下键盘上的W为选择“正确”，按下S则选择“错误”，选择后恶魔会扑上前进行攻击，若选择正确则会将恶魔击败在面前，若选择错误恶魔将穿过你的身体并扣除一点血量。
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
    <div>
      {/* 游戏画布 */}
      <canvas
        ref={canvasRef}
        className="w-full h-96 bg-bg rounded-lg tech-border mb-6"
      />

      {/* 答题进度 */}
      <div className="mb-4 text-center">
        <div className="text-lg font-medium">
          答题进度: {questionIndex + 1}/{questions.length}
        </div>
      </div>

      {/* 题目内容 */}
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-4">{currentQuestion?.content}</h3>
      </div>

      {/* 提示按钮 */}
      {currentQuestion?.hints && currentQuestion.hints.length > 0 && !showExplanation && (
        <HintButton
          hints={currentQuestion.hints}
          onHintUsed={handleHintUsed}
        />
      )}

      {/* 解析 */}
      {showExplanation && (
        <div className="mt-6 p-4 bg-card rounded-lg tech-border">
          <h4 className="text-lg font-medium mb-2 text-primary">解析</h4>
          <p className="text-gray-300 mb-4">{currentQuestion?.explanation}</p>
          <div className="mb-4">
            <h5 className="text-md font-medium mb-2 text-gray-300">正确答案:</h5>
            <span className={`font-medium ${currentQuestion?.correctAnswer ? 'text-accent' : 'text-danger'}`}>
              {currentQuestion?.correctAnswer ? '正确' : '错误'}
            </span>
          </div>
          <button
            className="w-full py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium btn-hover"
            onClick={handleNext}
          >
            下一题
          </button>
        </div>
      )}
    </div>
  );
};

export default MiaoRunGame;