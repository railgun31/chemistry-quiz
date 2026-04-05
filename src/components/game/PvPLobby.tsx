import React, { useState, useEffect, useRef } from 'react';
import { Difficulty } from '../../data/types';

interface Room {
  id: string;
  code: string;
  players: number;
  maxPlayers: number;
  difficulty: Difficulty;
  questionCount: number;
  status: 'waiting' | 'playing';
  createdAt: string;
}

interface PvPLobbyProps {
  onBack: () => void;
  onRoomCreated: (room: { code: string; difficulty: Difficulty; questionCount: number }) => void;
}

const PvPLobby: React.FC<PvPLobbyProps> = ({ onBack, onRoomCreated }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [nickname, setNickname] = useState('');
  const [newRoom, setNewRoom] = useState({
    difficulty: Difficulty.EASY,
    questionCount: 10
  });
  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
  const roomIdRef = useRef<string>('');

  // 初始化 Broadcast Channel
  useEffect(() => {
    broadcastChannelRef.current = new BroadcastChannel('chemistry-quiz-pvp');
    
    broadcastChannelRef.current.onmessage = (event) => {
      const { type, data } = event.data;
      switch (type) {
        case 'ROOM_CREATED':
          setRooms(prev => [...prev, data]);
          break;
        case 'ROOM_JOINED':
          setRooms(prev => prev.map(room => 
            room.id === data.id ? { ...room, players: data.players } : room
          ));
          break;
        case 'ROOM_STARTED':
          setRooms(prev => prev.map(room => 
            room.id === data.id ? { ...room, status: 'playing' } : room
          ));
          break;
        case 'ROOM_CLOSED':
          setRooms(prev => prev.filter(room => room.id !== data.id));
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

  // 创建房间
  const handleCreateRoom = () => {
    const room: Room = {
      id: Date.now().toString(),
      code: generateRoomCode(),
      players: 1,
      maxPlayers: 2,
      difficulty: newRoom.difficulty,
      questionCount: newRoom.questionCount,
      status: 'waiting',
      createdAt: new Date().toISOString()
    };
    
    roomIdRef.current = room.id;
    
    if (broadcastChannelRef.current) {
      broadcastChannelRef.current.postMessage({
        type: 'ROOM_CREATED',
        data: room
      });
    }
    
    setShowCreateModal(false);
    // 通知 App 组件创建了一个新房间
    onRoomCreated({
      code: room.code,
      difficulty: room.difficulty,
      questionCount: room.questionCount
    });
  };

  // 加入房间
  const handleJoinRoom = () => {
    const room = rooms.find(r => r.code === roomCode);
    if (room && room.status === 'waiting' && room.players < room.maxPlayers) {
      if (broadcastChannelRef.current) {
        broadcastChannelRef.current.postMessage({
          type: 'ROOM_JOINED',
          data: {
            id: room.id,
            players: room.players + 1
          }
        });
      }
      setShowJoinModal(false);
      // 这里可以跳转到房间页面
    }
  };

  // 生成房间码
  const generateRoomCode = (): string => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  };

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
          多人对抗大厅
        </div>
        <div className="w-16"></div>
      </div>

      {/* 操作按钮 */}
      <div className="flex gap-4 mb-6">
        <button
          className="flex-1 py-3 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium btn-hover"
          onClick={() => setShowCreateModal(true)}
        >
          创建房间
        </button>
        <button
          className="flex-1 py-3 bg-card hover:bg-gray-700 text-white rounded-lg font-medium btn-hover tech-border"
          onClick={() => setShowJoinModal(true)}
        >
          加入房间
        </button>
      </div>

      {/* 房间列表 */}
      <div className="bg-card rounded-lg tech-border p-6">
        <h3 className="text-xl font-medium mb-4">房间列表</h3>
        {rooms.length === 0 ? (
          <p className="text-gray-300 text-center py-8">暂无房间，快来创建一个吧！</p>
        ) : (
          <div className="space-y-4">
            {rooms.map(room => (
              <div key={room.id} className="flex justify-between items-center p-4 bg-bg rounded-lg">
                <div>
                  <div className="font-medium">房间 {room.code}</div>
                  <div className="text-sm text-gray-400">
                    {room.players}/{room.maxPlayers} 人 | {room.difficulty === Difficulty.EASY ? '简单' : '噩梦'} | {room.questionCount} 题
                  </div>
                </div>
                <div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${room.status === 'waiting' ? 'bg-accent text-white' : 'bg-danger text-white'}`}>
                    {room.status === 'waiting' ? '等待中' : '游戏中'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 创建房间模态框 */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg tech-border p-6 w-full max-w-md">
            <h3 className="text-xl font-medium mb-4">创建房间</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">难度</label>
                <select
                  className="w-full py-2 px-4 rounded-lg input-tech"
                  value={newRoom.difficulty}
                  onChange={(e) => setNewRoom({ ...newRoom, difficulty: e.target.value as Difficulty })}
                >
                  <option value={Difficulty.EASY}>简单</option>
                  <option value={Difficulty.NIGHTMARE}>噩梦</option>
                </select>
              </div>
              <div>
                <label className="block text-gray-300 mb-2">题目数量</label>
                <select
                  className="w-full py-2 px-4 rounded-lg input-tech"
                  value={newRoom.questionCount}
                  onChange={(e) => setNewRoom({ ...newRoom, questionCount: parseInt(e.target.value) })}
                >
                  <option value={5}>5 题</option>
                  <option value={10}>10 题</option>
                  <option value={15}>15 题</option>
                  <option value={20}>20 题</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button
                  className="flex-1 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium btn-hover"
                  onClick={handleCreateRoom}
                >
                  创建
                </button>
                <button
                  className="flex-1 py-2 bg-card hover:bg-gray-700 text-white rounded-lg font-medium btn-hover tech-border"
                  onClick={() => setShowCreateModal(false)}
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 加入房间模态框 */}
      {showJoinModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-card rounded-lg tech-border p-6 w-full max-w-md">
            <h3 className="text-xl font-medium mb-4">加入房间</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 mb-2">房间码</label>
                <input
                  type="text"
                  className="w-full py-2 px-4 rounded-lg input-tech"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  placeholder="请输入6位房间码"
                  maxLength={6}
                />
              </div>
              <div>
                <label className="block text-gray-300 mb-2">昵称</label>
                <input
                  type="text"
                  className="w-full py-2 px-4 rounded-lg input-tech"
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                  placeholder="请输入昵称"
                />
              </div>
              <div className="flex gap-4">
                <button
                  className="flex-1 py-2 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium btn-hover"
                  onClick={handleJoinRoom}
                >
                  加入
                </button>
                <button
                  className="flex-1 py-2 bg-card hover:bg-gray-700 text-white rounded-lg font-medium btn-hover tech-border"
                  onClick={() => setShowJoinModal(false)}
                >
                  取消
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PvPLobby;