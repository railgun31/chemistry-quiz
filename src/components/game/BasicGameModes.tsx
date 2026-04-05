import React, { useState } from 'react';
import { QuestionType, Difficulty, Question } from '../../data/types';
import questionBank from '../../data/questions';
import TrueFalseGame from './TrueFalseGame';
import FillBlankGame from './FillBlankGame';
import EquationMemoryGame from './EquationMemoryGame';

interface BasicGameModesProps {
  mode: QuestionType;
  difficulty: Difficulty;
  onBack: () => void;
}

const BasicGameModes: React.FC<BasicGameModesProps> = ({ mode, difficulty, onBack }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalAnsweredQuestions, setTotalAnsweredQuestions] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState<Question[]>([]);

  // 初始化题目
  React.useEffect(() => {
    let allQuestions: any[] = [];
    
    if (difficulty === 'nightmare') {
      // 噩梦难度：从所有难度的题库中选择，但给简单题较低的权重
      const easyQuestions = questionBank.easy.filter(q => q.type === mode);
      const nightmareQuestions = questionBank.nightmare.filter(q => q.type === mode);
      
      // 为简单题添加较低的权重（每道简单题只添加一次，而噩梦题添加多次）
      allQuestions = [...easyQuestions];
      // 添加噩梦题（多次添加以增加出现几率）
      for (let i = 0; i < 3; i++) {
        allQuestions = [...allQuestions, ...nightmareQuestions];
      }
    } else {
      // 简单难度：只从简单题库中选择
      allQuestions = questionBank[difficulty].filter(q => q.type === mode);
    }
    
    // 随机打乱题目顺序
    const shuffledQuestions = shuffleArray([...allQuestions]);
    setQuestions(shuffledQuestions);
  }, [mode, difficulty]);

  const handleQuestionAnswered = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    // 增加已答题数
    setTotalAnsweredQuestions(prev => prev + 1);

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      // 个人练习模式：重新打乱题目，实现无尽模式
      const modeQuestions = questionBank[difficulty].filter(q => q.type === mode);
      const shuffledQuestions = shuffleArray([...modeQuestions]);
      setQuestions(shuffledQuestions);
      setCurrentQuestionIndex(0);
      // 单人挑战模式：游戏结束
      // 这里可以根据不同模式进行不同处理
    }
  };

  // 随机打乱数组函数
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setTotalAnsweredQuestions(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-card rounded-lg tech-border">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-4">游戏结束</h2>
          <div className="text-xl mb-2">正确题数/已答题数: {score}/{totalAnsweredQuestions}</div>
          <div className="text-lg text-gray-300">
            正确率: {totalAnsweredQuestions > 0 ? (score / totalAnsweredQuestions * 100).toFixed(0) : 0}%
          </div>
        </div>
        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium btn-hover"
            onClick={handleRestart}
          >
            重新开始
          </button>
          <button
            className="px-6 py-3 bg-card hover:bg-gray-700 text-white rounded-lg font-medium btn-hover tech-border"
            onClick={onBack}
          >
            返回菜单
          </button>
        </div>
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-card rounded-lg tech-border text-center">
        <p className="text-gray-300">加载题目中...</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* 顶部信息栏 */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="px-4 py-2 bg-card hover:bg-gray-700 text-white rounded-lg text-sm font-medium btn-hover tech-border"
          onClick={onBack}
        >
          返回
        </button>
        <div className="flex gap-6">
          <div className="text-lg font-medium text-primary">
            正确题数/已答题数: {score}/{totalAnsweredQuestions}
          </div>
          <div className="text-lg font-medium text-primary">
            正答率: {totalAnsweredQuestions > 0 ? ((score / totalAnsweredQuestions) * 100).toFixed(0) : 0}%
          </div>
        </div>
      </div>

      {/* 游戏内容 */}
      <div className="p-6 bg-card rounded-lg tech-border max-h-[70vh] overflow-y-auto overflow-x-hidden">
        {mode === QuestionType.TRUE_FALSE && (
          <TrueFalseGame
            question={currentQuestion as any}
            onAnswered={handleQuestionAnswered}
          />
        )}
        {mode === QuestionType.FILL_BLANK && (
          <FillBlankGame
            question={currentQuestion as any}
            onAnswered={handleQuestionAnswered}
          />
        )}
        {mode === QuestionType.EQUATION_MEMORY && (
          <EquationMemoryGame
            question={currentQuestion as any}
            onAnswered={handleQuestionAnswered}
          />
        )}
      </div>
    </div>
  );
};

export default BasicGameModes;