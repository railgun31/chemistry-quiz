import React, { useRef, useEffect, useState } from 'react';
import { Difficulty } from '../../data/types';
import questionBank from '../../data/questions';
import HintButton from '../HintButton';


interface DefendMeteorGameProps {
  difficulty: Difficulty;
  onGameEnd: (score: number, timeUsed: number) => void;
}

const DefendMeteorGame: React.FC<DefendMeteorGameProps> = ({ difficulty, onGameEnd }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [timeUsed, setTimeUsed] = useState(0);
  const [timer, setTimer] = useState<number | null>(null);
  const countdownTimerRef = useRef<number | null>(null);

  // 游戏状态
  const gameState = useRef({
    ship: { x: 0, y: 0, width: 40, height: 30 },
    asteroids: [] as any[],
    projectiles: [] as any[],
    keys: { w: false },
    time: 0,
    shooting: false,
    countdown: 30,
  });

  // 初始化题目
  useEffect(() => {
    let allQuestions: any[] = [];
    
    if (difficulty === 'nightmare') {
      // 噩梦难度：从所有难度的题库中选择，但给简单题较低的权重
      const easyQuestions = questionBank.easy.filter(q => q.type === 'fill_blank');
      const nightmareQuestions = questionBank.nightmare.filter(q => q.type === 'fill_blank');
      
      // 为简单题添加较低的权重（每道简单题只添加一次，而噩梦题添加多次）
      allQuestions = [...easyQuestions];
      // 添加噩梦题（多次添加以增加出现几率）
      for (let i = 0; i < 3; i++) {
        allQuestions = [...allQuestions, ...nightmareQuestions];
      }
    } else {
      // 简单难度：只从简单题库中选择
      allQuestions = questionBank[difficulty].filter(q => q.type === 'fill_blank');
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
      setSelectedAnswers(new Array(uniqueQuestions[0].blanks.length).fill(''));
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
      gameState.current.ship.x = canvas.width / 2 - gameState.current.ship.width / 2;
      gameState.current.ship.y = canvas.height - gameState.current.ship.height - 20;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // 键盘事件监听
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'w') gameState.current.keys.w = true;
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === 'w') gameState.current.keys.w = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 游戏主循环
    const gameLoop = () => {
      if (!gameOver && gameStarted) {
        update();
        render();
        requestAnimationFrame(gameLoop);
      }
    };

    // 更新游戏状态
    const update = () => {
      const state = gameState.current;
      const canvas = canvasRef.current;
      if (!canvas) return;

      // 陨石生成逻辑已移至 generateSingleMeteor 函数，在提交答案后调用

      // 更新小行星
      state.asteroids.forEach(asteroid => {
        asteroid.y += asteroid.speed;
        asteroid.rotation += asteroid.rotationSpeed;
      });

      // 更新子弹
      state.projectiles.forEach(projectile => {
        projectile.y -= projectile.speed;
      });

      // 移除超出屏幕的小行星和子弹
      state.asteroids = state.asteroids.filter(asteroid => asteroid.y < canvas.height);
      state.projectiles = state.projectiles.filter(projectile => projectile.y > 0);

      // 检测子弹与小行星碰撞
      state.projectiles.forEach(projectile => {
        state.asteroids.forEach(asteroid => {
          if (
            projectile.x < asteroid.x + asteroid.width &&
            projectile.x + projectile.width > asteroid.x &&
            projectile.y < asteroid.y + asteroid.height &&
            projectile.y + projectile.height > asteroid.y
          ) {
            // 子弹与小行星碰撞，两者都消失
            state.asteroids = state.asteroids.filter(a => a !== asteroid);
            state.projectiles = state.projectiles.filter(p => p !== projectile);
          }
        });
      });

      // 检测小行星与飞船碰撞
      state.asteroids.forEach(asteroid => {
        if (
          asteroid.x < state.ship.x + state.ship.width &&
          asteroid.x + asteroid.width > state.ship.x &&
          asteroid.y < state.ship.y + state.ship.height &&
          asteroid.y + asteroid.height > state.ship.y
        ) {
          // 碰撞检测
          setLives(prev => prev - 1);
          state.asteroids = state.asteroids.filter(a => a !== asteroid);
        }
      });

      state.time++;
    };

    // 渲染游戏
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      const state = gameState.current;
      if (!canvas || !ctx) return;

      // 清空画布
      ctx.fillStyle = '#0B1220';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 绘制星空背景
      drawStars(ctx, canvas.width, canvas.height);

      // 绘制飞船
      drawShip(ctx, state.ship);

      // 绘制小行星
      state.asteroids.forEach(asteroid => {
        drawAsteroid(ctx, asteroid);
      });

      // 绘制子弹
      state.projectiles.forEach(projectile => {
        ctx.fillStyle = '#F59E0B';
        ctx.fillRect(projectile.x, projectile.y, projectile.width, projectile.height);
      });

      // 绘制生命值
      drawLives(ctx, lives);

      // 绘制分数
      drawScore(ctx, score);

      // 绘制倒计时
      drawCountdown(ctx, gameState.current.countdown, canvas.width);
    };

    // 绘制星空背景
    const drawStars = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 100; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 2;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // 绘制飞船
    const drawShip = (ctx: CanvasRenderingContext2D, ship: any) => {
      ctx.fillStyle = '#2F7EF7';
      ctx.beginPath();
      ctx.moveTo(ship.x + ship.width / 2, ship.y);
      ctx.lineTo(ship.x, ship.y + ship.height);
      ctx.lineTo(ship.x + ship.width, ship.y + ship.height);
      ctx.closePath();
      ctx.fill();

      // 绘制飞船细节
      ctx.fillStyle = '#1e67d8';
      ctx.fillRect(ship.x + 10, ship.y + 10, ship.width - 20, 10);
    };

    // 绘制小行星
    const drawAsteroid = (ctx: CanvasRenderingContext2D, asteroid: any) => {
      ctx.save();
      ctx.translate(asteroid.x + asteroid.width / 2, asteroid.y + asteroid.height / 2);
      ctx.rotate(asteroid.rotation);
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(-asteroid.width / 2, -asteroid.height / 2, asteroid.width, asteroid.height);
      ctx.restore();
    };

    // 绘制生命值
    const drawLives = (ctx: CanvasRenderingContext2D, lives: number) => {
      ctx.fillStyle = '#EF4444';
      ctx.font = '20px Saira';
      ctx.fillText(`生命值: ${lives}`, 20, 30);
    };

    // 绘制分数
    const drawScore = (ctx: CanvasRenderingContext2D, score: number) => {
      ctx.fillStyle = '#22C55E';
      ctx.font = '20px Saira';
      ctx.fillText(`分数: ${score}`, canvas.width - 100, 30);
    };

    // 绘制倒计时
    const drawCountdown = (ctx: CanvasRenderingContext2D, countdown: number, width: number) => {
      ctx.fillStyle = '#F59E0B';
      ctx.font = '20px Saira';
      ctx.fillText(`倒计时: ${countdown}s`, width / 2 - 50, 30);
    };



    gameLoop();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (timer) clearInterval(timer);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
    };
  }, [gameStarted, gameOver, lives, score]);

  // 开始游戏
  const handleStartGame = () => {
    setGameStarted(true);
    setTimer(setInterval(() => {
      setTimeUsed(prev => prev + 1);
    }, 1000));
    // 延迟生成第一题的小行星，确保Canvas已经初始化
    setTimeout(() => {
      generateSingleAsteroid();
    }, 100);
    // 开始倒计时
    startCountdown();
  };

  // 生成单个小行星
  const generateSingleAsteroid = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 清空现有小行星
    gameState.current.asteroids = [];

    // 调大小行星尺寸
    const asteroidWidth = 50 + Math.random() * 30;
    const asteroidHeight = 50 + Math.random() * 30;
    // 固定生成在与飞机同一条轴上
    const asteroidX = gameState.current.ship.x + gameState.current.ship.width / 2 - asteroidWidth / 2;

    gameState.current.asteroids.push({
      x: asteroidX,
      y: 50, // 停在页面内上方
      width: asteroidWidth,
      height: asteroidHeight,
      speed: 0, // 初始速度为0，停止不动
      rotation: 0,
      rotationSpeed: 0.01 + Math.random() * 0.02,
    });
  };

  // 开始小行星下落
  const startAsteroidFalling = () => {
    gameState.current.asteroids.forEach(asteroid => {
      // 加快小行星下落速度
      asteroid.speed = 2;
    });
  };

  // 处理答案选择
  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[index] = value;
    setSelectedAnswers(newAnswers);
  };

  // 发射子弹
  const fireProjectile = () => {
    const state = gameState.current;
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 从飞船位置发射子弹，调整子弹速度为较慢
    state.projectiles.push({
      x: state.ship.x + state.ship.width / 2 - 2.5,
      y: state.ship.y,
      width: 5,
      height: 10,
      speed: 2 // 降低子弹速度
    });
  };

  // 处理提示使用
  const handleHintUsed = (hintIndex: number) => {
    // 提示使用逻辑可以在这里添加，例如扣除分数等
    console.log(`Hint ${hintIndex + 1} used`);
  };

  // 提交答案
  const handleSubmit = () => {
    if (!currentQuestion) return;

    // 停止倒计时和用时定时器
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    if (timer) {
      clearInterval(timer);
      setTimer(null);
    }

    const correctAnswers = currentQuestion.blanks.map((blank: any) => blank.correctAnswer);
    const correct = selectedAnswers.every((answer, index) => answer === correctAnswers[index]);
    setIsCorrect(correct);
    setShowExplanation(true);

    if (correct) {
      setScore(prev => prev + 10);
      // 回答正确，让小行星开始下落并发射子弹
      startAsteroidFalling();
      fireProjectile();
    } else {
      // 回答错误，让小行星开始下落并穿过飞船
      // 不在这里扣血，而是在小行星撞击时扣血
      startAsteroidFalling();
    }
  };

  // 下一题
  const handleNext = () => {
    const nextIndex = questionIndex + 1;
    if (nextIndex < questions.length) {
      setQuestionIndex(nextIndex);
      setCurrentQuestion(questions[nextIndex]);
      setSelectedAnswers(new Array(questions[nextIndex].blanks.length).fill(''));
      setShowExplanation(false);
      setIsCorrect(null);
      // 重置倒计时
      startCountdown();
      // 重新启动用时定时器
      setTimer(setInterval(() => {
        setTimeUsed(prev => prev + 1);
      }, 1000));
      // 生成新的小行星并停在页面最上方
      generateSingleAsteroid();
    } else {
      // 游戏结束
      setGameOver(true);
      if (timer) clearInterval(timer);
      onGameEnd(score, timeUsed);
    }
  };

  // 开始倒计时
  const startCountdown = () => {
    // 根据难度设置不同的限时
    const timeLimit = difficulty === Difficulty.EASY ? 30 : 60;
    let currentCountdown = timeLimit;
    gameState.current.countdown = currentCountdown;
    
    // 清除旧的定时器
    if (countdownTimerRef.current) {
      clearInterval(countdownTimerRef.current);
      countdownTimerRef.current = null;
    }
    
    // 创建新的定时器
    const newCountdownTimer = setInterval(() => {
      currentCountdown--;
      gameState.current.countdown = currentCountdown;
      
      if (currentCountdown <= 0) {
        clearInterval(newCountdownTimer);
        countdownTimerRef.current = null;
        // 停止用时定时器
        if (timer) {
          clearInterval(timer);
          setTimer(null);
        }
        // 超时未回答，扣除生命值
        if (!showExplanation) {
          setLives(prev => prev - 1);
          setShowExplanation(true);
        }
      }
    }, 1000);
    
    // 保存新的定时器ID
    countdownTimerRef.current = newCountdownTimer;
  };

  // 检查生命值
  useEffect(() => {
    if (lives <= 0) {
      setGameOver(true);
      if (timer) clearInterval(timer);
      if (countdownTimerRef.current) clearInterval(countdownTimerRef.current);
      onGameEnd(score, timeUsed);
    }
  }, [lives, gameOver, score, timeUsed, onGameEnd, timer]);

  // 键盘事件监听
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // 阻止空格键的默认滚动行为
      if (e.key === ' ') {
        e.preventDefault();
      }
      // 当未显示解析时，按Enter或空格提交答案
      if (!showExplanation && selectedAnswers.every(answer => answer.trim() !== '') && (e.key === 'Enter' || e.key === ' ')) {
        handleSubmit();
      }
      // 当显示解析时，按Enter或空格进入下一题
      else if (showExplanation && (e.key === 'Enter' || e.key === ' ')) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showExplanation, selectedAnswers, currentQuestion, isCorrect, onGameEnd, score, timeUsed, questionIndex, questions, timer, countdownTimerRef]);

  if (!gameStarted) {
    return (
      <div className="text-center">
        <h3 className="text-2xl font-bold text-primary mb-4">防御小行星</h3>
        <p className="text-gray-300 mb-6">
          你是一位星际航行者，航行中不小心进入小行星带，飞船初始有3滴血，请在答题框中输入配平方程式并提交，发射子弹消灭小行星，超时或答错将被小行星砸中扣除1滴血。主要考察方程式配平，共10道题。
        </p>
        <button
          className="px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium btn-hover"
          onClick={handleStartGame}
        >
          开始游戏
        </button>
      </div>
    );
  }

  return (
    <div className="max-h-[80vh] overflow-y-auto overflow-x-hidden p-4">
      {/* 游戏画布 */}
      <canvas
        ref={canvasRef}
        className="w-full h-96 bg-bg rounded-lg tech-border mb-6"
      />

      {/* 题目内容 */}
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-4">{currentQuestion?.content}</h3>
      </div>

      {/* 提示按钮 */}
      {currentQuestion?.hints && currentQuestion.hints.length > 0 && (
        <HintButton
          hints={currentQuestion.hints}
          onHintUsed={handleHintUsed}
        />
      )}

      {/* 填写空缺 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {currentQuestion?.blanks.map((_: any, index: number) => (
          <div key={index} className="flex items-center gap-2">
            <label className="w-20 text-gray-300">第 {index + 1} 空:</label>
            <input
              type="text"
              className={`flex-1 py-1 px-3 rounded-lg input-tech ${showExplanation ? (isCorrect === true ? 'border-accent' : 'border-danger') : ''}`}
              value={selectedAnswers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              disabled={showExplanation}
              placeholder="请输入答案"
            />
          </div>
        ))}
      </div>

      {/* 提交按钮 */}
      {!showExplanation && (
        <button
          className="w-full py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium btn-hover"
          onClick={handleSubmit}
        >
          提交答案
        </button>
      )}

      {/* 解析 */}
      {showExplanation && (
        <div className="mt-6 p-4 bg-card rounded-lg tech-border">
          <div className="flex justify-between items-center mb-4">
            <h4 className="text-lg font-medium text-primary">解析</h4>
            <button
              className="px-6 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium btn-hover"
              onClick={handleNext}
            >
              下一题
            </button>
          </div>
          <p className="text-gray-300 mb-4">{currentQuestion?.explanation}</p>
          <div className="mb-4">
            <h5 className="text-md font-medium mb-2 text-gray-300">正确答案:</h5>
            <div className="space-y-2">
              {currentQuestion?.blanks.map((blank: any, index: number) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-20 text-gray-400">第 {index + 1} 空:</span>
                  <span className="text-accent font-medium">{blank.correctAnswer}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DefendMeteorGame;