import React, { useState } from 'react';

interface MusicControlsProps {
  isPlaying: boolean;
  volume: number;
  currentSong: 'bgm' | 'pixelTime' | 'hifumiDaisuki' | 'oxygenDestroyer' | 'afterSchoolDessert' | 'theDragonExpress' | 'startingPistol';
  onPlayPause: () => void;
  onVolumeChange: (volume: number) => void;
  onSongChange: (song: 'bgm' | 'pixelTime' | 'hifumiDaisuki' | 'oxygenDestroyer' | 'afterSchoolDessert' | 'theDragonExpress' | 'startingPistol') => void;
  autoAdjust: boolean;
  onAutoAdjustChange: (autoAdjust: boolean) => void;
}

const MusicControls: React.FC<MusicControlsProps> = ({
  isPlaying,
  volume,
  currentSong,
  onPlayPause,
  onVolumeChange,
  onSongChange,
  autoAdjust,
  onAutoAdjustChange
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* 音乐控制按钮 */}
      <button
        className="p-2 bg-card hover:bg-gray-700 text-white rounded-lg btn-hover tech-border"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
          {isPlaying ? (
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zM13 8a1 1 0 10-2 0v4a1 1 0 102 0V8z" clipRule="evenodd" />
          ) : (
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          )}
        </svg>
      </button>

      {/* 音乐控制面板 - 悬浮在界面上的固定定位 */}
      {isOpen && (
        <div className="fixed left-4 bottom-20 w-72 bg-card rounded-lg tech-border p-4 shadow-lg z-[9999]" style={{ position: 'fixed', left: '16px', bottom: '80px' }}>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-primary">音乐控制</h3>
            <button
              className="text-gray-400 hover:text-white"
              onClick={() => setIsOpen(false)}
            >
              ×
            </button>
          </div>

          {/* 自动调整开关 */}
          <div className="mb-4 pb-4 border-b border-gray-700">
            <div className="flex items-center justify-between">
              <label className="text-gray-300">自动调整音乐</label>
              <button
                className={`relative w-12 h-6 rounded-full transition-colors ${autoAdjust ? 'bg-primary' : 'bg-gray-600'}`}
                onClick={() => onAutoAdjustChange(!autoAdjust)}
              >
                <span
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${autoAdjust ? 'translate-x-7' : 'translate-x-1'}`}
                />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">开启后，进入不同页面时会自动切换音乐</p>
          </div>

          {/* 歌曲选择 */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">选择歌曲</label>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="bgm"
                  name="song"
                  checked={currentSong === 'bgm'}
                  onChange={() => onSongChange('bgm')}
                  className="mr-2"
                />
                <label htmlFor="bgm" className="text-white">MX Adventure</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="pixelTime"
                  name="song"
                  checked={currentSong === 'pixelTime'}
                  onChange={() => onSongChange('pixelTime')}
                  className="mr-2"
                />
                <label htmlFor="pixelTime" className="text-white">Pixel Time</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="hifumiDaisuki"
                  name="song"
                  checked={currentSong === 'hifumiDaisuki'}
                  onChange={() => onSongChange('hifumiDaisuki')}
                  className="mr-2"
                />
                <label htmlFor="hifumiDaisuki" className="text-white">Hifumi Daisuki</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="oxygenDestroyer"
                  name="song"
                  checked={currentSong === 'oxygenDestroyer'}
                  onChange={() => onSongChange('oxygenDestroyer')}
                  className="mr-2"
                />
                <label htmlFor="oxygenDestroyer" className="text-white">Oxygen Destroyer</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="afterSchoolDessert"
                  name="song"
                  checked={currentSong === 'afterSchoolDessert'}
                  onChange={() => onSongChange('afterSchoolDessert')}
                  className="mr-2"
                />
                <label htmlFor="afterSchoolDessert" className="text-white">After School Dessert</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="theDragonExpress"
                  name="song"
                  checked={currentSong === 'theDragonExpress'}
                  onChange={() => onSongChange('theDragonExpress')}
                  className="mr-2"
                />
                <label htmlFor="theDragonExpress" className="text-white">The Dragon Express</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="startingPistol"
                  name="song"
                  checked={currentSong === 'startingPistol'}
                  onChange={() => onSongChange('startingPistol')}
                  className="mr-2"
                />
                <label htmlFor="startingPistol" className="text-white">Starting Pistol</label>
              </div>
            </div>
          </div>

          {/* 音量控制 */}
          <div className="mb-4">
            <label className="block text-gray-300 mb-2">音量: {Math.round(volume * 100)}%</label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
              className="w-full"
            />
          </div>

          {/* 播放/暂停按钮 */}
          <button
            className="w-full py-2 bg-primary hover:bg-blue-600 text-white rounded-lg font-medium btn-hover"
            onClick={onPlayPause}
          >
            {isPlaying ? '暂停' : '播放'}
          </button>
        </div>
      )}
    </div>
  );
};

export default MusicControls;