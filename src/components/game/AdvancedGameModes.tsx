import React, { useState } from 'react';
import { GameMode, Difficulty } from '../../data/types';
import DefendMeteorGame from './DefendMeteorGame';
import MiaoRunGame from './MiaoRunGame';
import ScoreCompetitionGame from './ScoreCompetitionGame';

interface AdvancedGameModesProps {
  mode: GameMode;
  difficulty: Difficulty;
  onBack: () => void;
  onGameEnd: (score: number, timeUsed: number) => void;
}

const AdvancedGameModes: React.FC<AdvancedGameModesProps> = ({ mode, difficulty, onBack, onGameEnd }) => {
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeUsed, setTimeUsed] = useState(0);
  const [timeInterval, setTimeInterval] = useState<number | null>(null);
  const [isCountdownActive, setIsCountdownActive] = useState(false);
  const [countdownTime, setCountdownTime] = useState(0);

  const handleGameEnd = (finalScore: number, finalTimeUsed: number) => {
    setScore(finalScore);
    setTimeUsed(finalTimeUsed);
    setShowResult(true);
    // 停止计时器
    if (timeInterval) {
      clearInterval(timeInterval);
      setTimeInterval(null);
    }
    onGameEnd(finalScore, finalTimeUsed);
  };

  const handleRestart = () => {
    setShowResult(false);
    setScore(0);
    setTimeUsed(0);
    setIsCountdownActive(false);
    setCountdownTime(0);
  };

  const handleCountdownChange = (isActive: boolean, time: number) => {
    setIsCountdownActive(isActive);
    setCountdownTime(time);
  };

  if (showResult) {
    return (
      <div className="w-full max-w-2xl mx-auto p-6 bg-card rounded-lg tech-border">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-primary mb-4">游戏结束</h2>
          <div className="text-xl mb-2">得分: {score}</div>
          <div className="text-lg text-gray-300">
            用时: {Math.floor(timeUsed / 60)}分{timeUsed % 60}秒
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

  return (
    <div className="w-full max-w-5xl mx-auto">
      {/* 顶部信息栏 */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="px-4 py-2 bg-card hover:bg-gray-700 text-white rounded-lg text-sm font-medium btn-hover tech-border"
          onClick={onBack}
        >
          返回
        </button>
        <div className="flex items-center gap-6">
          <div className="text-lg font-medium text-primary">
            {mode === GameMode.DEFEND_METEOR && '防御小行星'}
            {mode === GameMode.MIAO_RUN && '喵斯快跑'}
            {mode === GameMode.SCORE_COMPETITION && '积分比拼'}
          </div>
          {mode === GameMode.SCORE_COMPETITION && isCountdownActive && (
            <div className="text-lg font-medium text-accent">
              倒计时: {countdownTime}s
            </div>
          )}
        </div>
        <div className="text-lg font-medium">
          难度: {difficulty === Difficulty.EASY ? '简单' : '噩梦'}
        </div>
      </div>

      {/* 游戏内容 */}
      <div className="p-6 bg-card rounded-lg tech-border">
        {mode === GameMode.DEFEND_METEOR && (
          <DefendMeteorGame
            difficulty={difficulty}
            onGameEnd={handleGameEnd}
          />
        )}
        {mode === GameMode.MIAO_RUN && (
          <MiaoRunGame
            difficulty={difficulty}
            onGameEnd={handleGameEnd}
          />
        )}
        {mode === GameMode.SCORE_COMPETITION && (
          <ScoreCompetitionGame
            difficulty={difficulty}
            onGameEnd={handleGameEnd}
            onCountdownChange={handleCountdownChange}
          />
        )}
      </div>
    </div>
  );
};

export default AdvancedGameModes;