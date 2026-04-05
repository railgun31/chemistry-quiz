import React, { useState, useEffect, useRef } from 'react';
import { Difficulty } from '../../data/types';

interface Player {
  id: string;
  nickname: string;
  isReady: boolean;
  isHost: boolean;
}

interface PvPRoomProps {
  roomCode: string;
  difficulty: Difficulty;
  questionCount: number;
  onBack: () => void;
}

const PvPRoom: React.FC<PvPRoomProps> = ({ roomCode, difficulty, questionCount, onBack }) => {
  const [players, setPlayers] = useState<Player[]>([
    {
      id: '1',
      nickname: '玩家1',
      isReady: false,
      isHost: true
    }
  ]);
  const [isReady, setIsReady] = useState(false);


  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);

  // 初始化 Broadcast Channel
  useEffect(() => {
    broadcastChannelRef.current = new BroadcastChannel('chemistry-quiz-pvp');
    
    broadcastChannelRef.current.onmessage = (event) => {
      const { type, data } = event.data;
      switch (type) {
        case 'PLAYER_JOINED':
          setPlayers(prev => [...prev, data]);
          break;
        case 'PLAYER_READY':
          setPlayers(prev => prev.map(player => 
            player.id === data.id ? { ...player, isReady: data.isReady } : player
          ));
          break;
        case 'GAME_STARTED':

          break;
        case 'PLAYER_LEFT':
          setPlayers(prev => prev.filter(player => player.id !== data.id));
          break;
        default:
          break;
      }
    };

    return () => {
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.close();
      }
    };
  }, []);

  // 处理准备状态
  const handleReady = () => {
    const newReadyState = !isReady;
    setIsReady(newReadyState);
    
    if (broadcastChannelRef.current) {
      broadcastChannelRef.current.postMessage({
        type: 'PLAYER_READY',
        data: {
          id: '1', // 假设当前玩家ID为1
          isReady: newReadyState
        }
      });
    }
  };

  // 开始游戏
  const handleStartGame = () => {
    if (broadcastChannelRef.current) {
      broadcastChannelRef.current.postMessage({
        type: 'GAME_STARTED',
        data: {
          roomCode
        }
      });
    }

  };

  // 检查是否所有玩家都已准备
  const allPlayersReady = players.every(player => player.isReady);
  const isHost = players[0]?.isHost || false;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* 顶部信息栏 */}
      <div className="flex justify-between items-center mb-6">
        <button
          className="px-4 py-2 bg-card hover:bg-gray-700 text-white rounded-lg text-sm font-medium btn-hover tech-border"
          onClick={onBack}
        >
          返回
        </button>
        <div className="text-2xl font-bold text-primary">
          房间 {roomCode}
        </div>
        <div className="w-16"></div>
      </div>

      {/* 房间信息 */}
      <div className="bg-card rounded-lg tech-border p-6 mb-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-gray-400 text-sm">难度</div>
            <div className="text-lg font-medium">{difficulty === Difficulty.EASY ? '简单' : '噩梦'}</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm">题目数量</div>
            <div className="text-lg font-medium">{questionCount} 题</div>
          </div>
        </div>
      </div>

      {/* 玩家列表 */}
      <div className="bg-card rounded-lg tech-border p-6 mb-6">
        <h3 className="text-xl font-medium mb-4">玩家列表</h3>
        <div className="space-y-4">
          {players.map(player => (
            <div key={player.id} className="flex justify-between items-center p-4 bg-bg rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  {player.nickname[0]}
                </div>
                <div>
                  <div className="font-medium">{player.nickname}</div>
                  {player.isHost && (
                    <div className="text-xs text-primary">房主</div>
                  )}
                </div>
              </div>
              <div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${player.isReady ? 'bg-accent text-white' : 'bg-gray-700 text-gray-300'}`}>
                  {player.isReady ? '已准备' : '未准备'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-4">
        <button
          className={`flex-1 py-3 rounded-lg font-medium btn-hover ${isReady ? 'bg-accent hover:bg-green-600 text-white' : 'bg-card hover:bg-gray-700 text-white tech-border'}`}
          onClick={handleReady}
        >
          {isReady ? '取消准备' : '准备'}
        </button>
        {isHost && (
          <button
            className={`flex-1 py-3 rounded-lg font-medium btn-hover ${allPlayersReady ? 'bg-primary hover:bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 cursor-not-allowed'}`}
            onClick={handleStartGame}
            disabled={!allPlayersReady}
          >
            开始游戏
          </button>
        )}
      </div>
    </div>
  );
};

export default PvPRoom;