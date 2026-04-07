import React, { useState, useEffect } from 'react';
import { FillBlankQuestion, Difficulty } from '../../data/types';
import { validateFillBlankAnswers } from '../../utils/equationParser';
import HintButton from '../HintButton';

interface FillBlankGameProps {
  question: FillBlankQuestion;
  onAnswered: (isCorrect: boolean) => void;
}

const FillBlankGame: React.FC<FillBlankGameProps> = ({ question, onAnswered }) => {
  const [answers, setAnswers] = useState<string[]>(question.blanks.map(() => ''));
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  // 当题目更新时，重置答案数组
  useEffect(() => {
    setAnswers(question.blanks.map(() => ''));
    setShowExplanation(false);
    setIsCorrect(null);
  }, [question]);

  const handleAnswerChange = (index: number, value: string) => {
    const newAnswers = [...answers];
    newAnswers[index] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = () => {
    const correctAnswers = question.blanks.map(blank => blank.correctAnswer);
    const correct = validateFillBlankAnswers(answers, correctAnswers);
    setIsCorrect(correct);
    setShowExplanation(true);
  };

  const handleNext = () => {
    onAnswered(isCorrect === true);
    // 重置状态，避免影响下一题
    setAnswers(question.blanks.map(() => ''));
    setShowExplanation(false);
    setIsCorrect(null);
  };

  // 检查是否所有空缺都已填写
  const allBlanksFilled = answers.every(answer => answer.trim() !== '');

  // 键盘事件监听
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // 阻止空格键的默认滚动行为
      if (e.key === ' ') {
        e.preventDefault();
      }
      // 当未显示解析时，按Enter或空格提交答案
      if (!showExplanation && allBlanksFilled && (e.key === 'Enter' || e.key === ' ')) {
        handleSubmit();
      }
      // 当显示解析时，按Enter或空格进入下一题
      else if (showExplanation && (e.key === 'Enter' || e.key === ' ')) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showExplanation, allBlanksFilled, answers, question, isCorrect, onAnswered]);

  return (
    <div>
      {/* 题目内容 */}
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-4">{question.content.replace(/\d+\s*/g, '')}</h3>
      </div>

      {/* 填写空缺 */}
      <div className="space-y-4 mb-6">
        {question.blanks.map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <label className="w-20 text-gray-300">第 {index + 1} 空:</label>
            <input
              type="text"
              className={`flex-1 py-1 px-3 rounded-lg input-tech ${showExplanation ? (isCorrect === true ? 'border-accent' : 'border-danger') : ''}`}
              value={answers[index]}
              onChange={(e) => handleAnswerChange(index, e.target.value)}
              disabled={showExplanation}
              placeholder="请输入答案"
            />
          </div>
        ))}
      </div>

      {/* 提示按钮（仅噩梦难度） */}
      {question.difficulty === Difficulty.NIGHTMARE && question.hints && question.maxHints && (
        <HintButton
          hints={question.hints}
        />
      )}

      {/* 提交按钮 */}
      {!showExplanation && (
        <button
          className={`w-full py-3 rounded-lg font-medium transition-all ${allBlanksFilled ? 'bg-primary hover:bg-blue-600 text-white' : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
          onClick={handleSubmit}
          disabled={!allBlanksFilled}
        >
          提交答案
        </button>
      )}

      {/* 解析 */}
      {showExplanation && (
        <div className="mt-6 p-4 bg-card rounded-lg tech-border">
          <h4 className="text-lg font-medium mb-2 text-primary">解析</h4>
          <p className="text-gray-300 mb-4">{question.explanation}</p>
          <div className="mb-4">
            <h5 className="text-md font-medium mb-2 text-gray-300">正确答案:</h5>
            <div className="space-y-2">
              {question.blanks.map((blank, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="w-20 text-gray-400">第 {index + 1} 空:</span>
                  <span className="text-accent font-medium">{blank.correctAnswer}</span>
                </div>
              ))}
            </div>
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

export default FillBlankGame;