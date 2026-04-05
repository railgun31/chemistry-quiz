import React, { useState, useEffect } from 'react';
import { TrueFalseQuestion, Difficulty } from '../../data/types';
import HintButton from '../HintButton';

interface TrueFalseGameProps {
  question: TrueFalseQuestion;
  onAnswered: (isCorrect: boolean) => void;
}

const TrueFalseGame: React.FC<TrueFalseGameProps> = ({ question, onAnswered }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleAnswerSelect = (answer: boolean) => {
    setSelectedAnswer(answer);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);
    setShowExplanation(true);
  };

  const handleNext = () => {
    onAnswered(isCorrect === true);
    // 重置状态，避免影响下一题
    setSelectedAnswer(null);
    setShowExplanation(false);
    setIsCorrect(null);
  };

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
  }, [showExplanation, isCorrect, onAnswered]);

  return (
    <div>
      {/* 题目内容 */}
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-4">{question.content}</h3>
      </div>

      {/* 选项 */}
      <div className="flex gap-4 mb-6">
        <button
          className={`flex-1 py-3 rounded-lg font-medium transition-all ${selectedAnswer === true ? (isCorrect === true ? 'bg-accent text-white' : 'bg-danger text-white') : 'bg-card hover:bg-gray-700 text-white tech-border'}`}
          onClick={() => handleAnswerSelect(true)}
          disabled={showExplanation}
        >
          正确
        </button>
        <button
          className={`flex-1 py-3 rounded-lg font-medium transition-all ${selectedAnswer === false ? (isCorrect === true ? 'bg-accent text-white' : 'bg-danger text-white') : 'bg-card hover:bg-gray-700 text-white tech-border'}`}
          onClick={() => handleAnswerSelect(false)}
          disabled={showExplanation}
        >
          错误
        </button>
      </div>

      {/* 提示按钮（仅噩梦难度） */}
      {question.difficulty === Difficulty.NIGHTMARE && question.hints && question.maxHints && (
        <HintButton
          hints={question.hints}
        />
      )}

      {/* 解析 */}
      {showExplanation && (
        <div className="mt-6 p-4 bg-card rounded-lg tech-border">
          <h4 className="text-lg font-medium mb-2 text-primary">解析</h4>
          <p className="text-gray-300 mb-4">{question.explanation}</p>
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

export default TrueFalseGame;