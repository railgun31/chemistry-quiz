import React, { useState, useEffect } from 'react';
import { Hint } from '../data/types';

interface HintButtonProps {
  hints: Hint[];
  onHintUsed?: (hintIndex: number) => void;
}

const HintButton: React.FC<HintButtonProps> = ({ hints, onHintUsed }) => {
  // 为每个提示创建一个状态
  const [showHint, setShowHint] = useState<{[key: string]: boolean}>({});

  // 当hints改变时，重置提示显示状态
  useEffect(() => {
    setShowHint({});
  }, [hints]);

  const handleHintToggle = (hintId: string, hintIndex: number) => {
    setShowHint(prev => ({
      ...prev,
      [hintId]: !prev[hintId]
    }));
    // 如果是第一次显示提示，调用onHintUsed回调
    if (!showHint[hintId] && onHintUsed) {
      onHintUsed(hintIndex);
    }
  };

  return (
    <div className="mt-4">
      <h4 className="text-lg font-medium mb-2 text-primary">提示</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hints.map((hint, index) => (
          <div 
            key={hint.id} 
            className="p-3 bg-bg rounded-lg tech-border cursor-pointer hover:bg-gray-700 transition-colors"
            onClick={() => handleHintToggle(hint.id, index)}
          >
            {showHint[hint.id] ? (
              <p className="text-gray-300">{hint.content}</p>
            ) : (
              <p className="text-gray-400">点击以查看提示 {index + 1}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HintButton;