

import { useState, useEffect } from 'react'
import { QuestionType, Difficulty, GameMode, ScoreRecord } from './data/types'
import BasicGameModes from './components/game/BasicGameModes'
import AdvancedGameModes from './components/game/AdvancedGameModes'
import PvPLobby from './components/game/PvPLobby'
import PvPRoom from './components/game/PvPRoom'
import { initializeStorage, addScore, getScores, updateUsername, getUsername } from './utils/localStorage'

function App() {
  const [currentView, setCurrentView] = useState<'menu' | 'practice' | 'practice-mode' | 'challenge' | 'challenge-mode' | 'pvp' | 'pvp-room' | 'ranking' | 'username-input' | 'credits'>( 'menu')
  const [selectedMode, setSelectedMode] = useState<QuestionType | GameMode | null>(null)
  const [selectedDifficulty, setSelectedDifficulty] = useState<Difficulty>(Difficulty.EASY)
  const [currentRoom, setCurrentRoom] = useState<{ code: string; difficulty: Difficulty; questionCount: number } | null>(null)
  const [username, setUsername] = useState('')
  const [inputUsername, setInputUsername] = useState('')
  const [rankingDifficulty, setRankingDifficulty] = useState<Difficulty>(Difficulty.EASY)

  // 初始化本地存储
  useEffect(() => {
    initializeStorage();
    // 检查是否有用户名
    const savedUsername = getUsername();
    if (savedUsername) {
      setUsername(savedUsername);
    } else {
      // 首次进入，显示用户名输入页面
      setCurrentView('username-input');
    }
  }, []);

  // 读取 URL 参数，处理房间跳转
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const roomCode = urlParams.get('code');
    const difficulty = urlParams.get('difficulty');
    const questionCount = urlParams.get('questionCount');

    if (roomCode && difficulty && questionCount) {
      setCurrentRoom({
        code: roomCode,
        difficulty: difficulty as Difficulty,
        questionCount: parseInt(questionCount)
      });
      setCurrentView('pvp-room');
    }
  }, []);

  // 处理游戏结束，保存成绩
  const handleGameEnd = (score: number, timeUsed: number) => {
    if (selectedMode) {
      const scoreRecord: ScoreRecord = {
        id: Date.now().toString(),
        mode: selectedMode as GameMode,
        difficulty: selectedDifficulty,
        score,
        timeUsed,
        date: new Date().toISOString(),
        username: username || '玩家'
      };
      addScore(scoreRecord);
    }
  };

  const handlePracticeClick = () => {
    setCurrentView('practice')
  }

  const handleChallengeClick = () => {
    setCurrentView('challenge')
  }

  const handleModeSelect = (mode: QuestionType | GameMode) => {
    setSelectedMode(mode)
    if (Object.values(QuestionType).includes(mode as QuestionType)) {
      setCurrentView('practice-mode')
    } else {
      setCurrentView('challenge-mode')
    }
  }

  const handleBack = () => {
    setCurrentView('menu')
    setSelectedMode(null)
  }



  const handleRankingClick = () => {
    setCurrentView('ranking')
  }

  const handleRoomBack = () => {
    setCurrentRoom(null)
    setCurrentView('pvp')
  }

  // 处理用户名提交
  const handleUsernameSubmit = () => {
    if (inputUsername.trim()) {
      updateUsername(inputUsername.trim());
      setUsername(inputUsername.trim());
      setCurrentView('menu');
    }
  }

  // 处理退出登录
  const handleLogout = () => {
    updateUsername('');
    setUsername('');
    setCurrentView('username-input');
  }

  if (currentView === 'practice-mode' && selectedMode && Object.values(QuestionType).includes(selectedMode as QuestionType)) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
        <BasicGameModes
          mode={selectedMode as QuestionType}
          difficulty={selectedDifficulty}
          onBack={handleBack}
        />
      </div>
    )
  }

  if (currentView === 'challenge-mode' && selectedMode && Object.values(GameMode).includes(selectedMode as GameMode)) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center p-4 pt-8">
        <AdvancedGameModes
          mode={selectedMode as GameMode}
          difficulty={selectedDifficulty}
          onBack={handleBack}
          onGameEnd={handleGameEnd}
        />
      </div>
    )
  }

  if (currentView === 'practice') {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
        {/* 标题 */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 tech-border px-8 py-4 rounded-lg inline-block">
            个人练习
          </h1>
        </div>

        {/* 难度选择 */}
        <div className="w-full max-w-3xl mb-8">
          <label className="block text-gray-300 mb-2">难度选择:</label>
          <div className="flex space-x-4">
            <button 
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${selectedDifficulty === Difficulty.EASY ? 'bg-primary text-white' : 'bg-card hover:bg-gray-700 text-white tech-border'}`}
              onClick={() => setSelectedDifficulty(Difficulty.EASY)}
            >
              简单
            </button>
            <button 
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${selectedDifficulty === Difficulty.NIGHTMARE ? 'bg-primary text-white' : 'bg-card hover:bg-gray-700 text-white tech-border'}`}
              onClick={() => setSelectedDifficulty(Difficulty.NIGHTMARE)}
            >
              噩梦
            </button>
          </div>
        </div>

        {/* 练习模式选择 */}
        <div className="w-full max-w-3xl space-y-4">
          <button 
            className="w-full py-4 px-6 bg-primary hover:bg-blue-600 text-white rounded-lg text-xl font-medium btn-hover"
            onClick={() => handleModeSelect(QuestionType.TRUE_FALSE)}
          >
            判断正误
          </button>
          <button 
            className="w-full py-4 px-6 bg-card hover:bg-gray-700 text-white rounded-lg text-xl font-medium btn-hover tech-border"
            onClick={() => handleModeSelect(QuestionType.FILL_BLANK)}
          >
            填补空缺
          </button>
          <button 
            className="w-full py-4 px-6 bg-card hover:bg-gray-700 text-white rounded-lg text-xl font-medium btn-hover tech-border"
            onClick={() => handleModeSelect(QuestionType.EQUATION_MEMORY)}
          >
            方程式默写
          </button>
          <button 
            className="w-full py-4 px-6 bg-card hover:bg-gray-700 text-white rounded-lg text-xl font-medium btn-hover tech-border"
            onClick={handleBack}
          >
            返回菜单
          </button>
        </div>
      </div>
    )
  }

  if (currentView === 'challenge') {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
        {/* 标题 */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 tech-border px-8 py-4 rounded-lg inline-block">
            单人挑战
          </h1>
        </div>

        {/* 难度选择 */}
        <div className="w-full max-w-3xl mb-8">
          <label className="block text-gray-300 mb-2">难度选择:</label>
          <div className="flex space-x-4">
            <button 
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${selectedDifficulty === Difficulty.EASY ? 'bg-primary text-white' : 'bg-card hover:bg-gray-700 text-white tech-border'}`}
              onClick={() => setSelectedDifficulty(Difficulty.EASY)}
            >
              简单
            </button>
            <button 
              className={`flex-1 py-2 px-4 rounded-lg font-medium ${selectedDifficulty === Difficulty.NIGHTMARE ? 'bg-primary text-white' : 'bg-card hover:bg-gray-700 text-white tech-border'}`}
              onClick={() => setSelectedDifficulty(Difficulty.NIGHTMARE)}
            >
              噩梦
            </button>
          </div>
        </div>

        {/* 挑战模式选择 */}
        <div className="w-full max-w-3xl space-y-4">
          <button 
            className="w-full py-4 px-6 bg-primary hover:bg-blue-600 text-white rounded-lg text-xl font-medium btn-hover"
            onClick={() => handleModeSelect(GameMode.DEFEND_METEOR)}
          >
            防御小行星
          </button>
          <button 
            className="w-full py-4 px-6 bg-card hover:bg-gray-700 text-white rounded-lg text-xl font-medium btn-hover tech-border"
            onClick={() => handleModeSelect(GameMode.MIAO_RUN)}
          >
            喵斯快跑
          </button>
          <button 
            className="w-full py-4 px-6 bg-card hover:bg-gray-700 text-white rounded-lg text-xl font-medium btn-hover tech-border"
            onClick={() => handleModeSelect(GameMode.SCORE_COMPETITION)}
          >
            积分比拼
          </button>
          <button 
            className="w-full py-4 px-6 bg-card hover:bg-gray-700 text-white rounded-lg text-xl font-medium btn-hover tech-border"
            onClick={handleBack}
          >
            返回菜单
          </button>
        </div>
      </div>
    )
  }

  // 处理房间创建
  const handleRoomCreated = (room: { code: string; difficulty: Difficulty; questionCount: number }) => {
    setCurrentRoom(room);
    setCurrentView('pvp-room');
  };

  if (currentView === 'pvp') {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
        <PvPLobby onBack={handleBack} onRoomCreated={handleRoomCreated} />
      </div>
    )
  }

  if (currentView === 'pvp-room' && currentRoom) {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
        <PvPRoom 
          roomCode={currentRoom.code}
          difficulty={currentRoom.difficulty}
          questionCount={currentRoom.questionCount}
          onBack={handleRoomBack}
        />
      </div>
    )
  }

  if (currentView === 'username-input') {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
        {/* 标题 */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 tech-border px-8 py-4 rounded-lg inline-block">
            化学知识大闯关
          </h1>
          <p className="text-xl text-gray-300 mt-4">硅及其化合物</p>
        </div>

        {/* 公告 */}
        <div className="w-full max-w-2xl mb-8 p-6 bg-card rounded-lg tech-border">
          <p className="text-gray-300 mb-4">本游戏有基础的“个人练习”，与更有趣味性的“单人挑战”，同学们可以通过多种玩法，学习硅相关化学知识，检测硅相关化学式掌握程度，提升整体化学素养。本游戏存在“天梯榜”，欢迎同学们在榜上留下自己的名字。</p>
          <p className="text-red-500 font-medium">注：由于硅课内相关方程式过少，本闯关题库存在大量课外内容，同学们可以先通过“个人练习”学习相关知识后，再游玩“单人挑战”。</p>
        </div>

        {/* 用户名输入 */}
        <div className="w-full max-w-md p-6 bg-card rounded-lg tech-border">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">请输入用户名</h2>
          <div className="space-y-4">
            <input
              type="text"
              className="w-full py-3 px-4 rounded-lg input-tech"
              placeholder="请输入您的用户名"
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
              autoFocus
            />
            <button
              className={`w-full py-3 rounded-lg font-medium transition-all ${inputUsername.trim() ? 'bg-primary hover:bg-blue-600 text-white' : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
              onClick={handleUsernameSubmit}
              disabled={!inputUsername.trim()}
            >
              开始游戏
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'credits') {
    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
        {/* 顶部信息栏 */}
        <div className="w-full max-w-4xl flex justify-start items-center mb-6">
          <button
            className="px-4 py-2 bg-card hover:bg-gray-700 text-white rounded-lg text-sm font-medium btn-hover tech-border"
            onClick={handleBack}
          >
            返回菜单
          </button>
        </div>

        {/* 标题 */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 tech-border px-8 py-4 rounded-lg inline-block text-glow">
            创作人员名单
          </h1>
        </div>

        {/* 名单内容 */}
        <div className="w-full max-w-2xl p-6 bg-card rounded-lg tech-border text-center">
          <p className="text-xl text-white mb-4">主创：曾彦文</p>
          <p className="text-xl text-white mb-4">项目实现：曾彦文</p>
          <p className="text-xl text-white mb-4">创意：杨晓东、戴圳泉、李颖雪</p>
          <p className="text-xl text-white mb-4">测试：化诚</p>
          <p className="text-xl text-white mb-4">代码支持：trae</p>
        </div>
      </div>
    )
  }

  if (currentView === 'ranking') {
    // 获取三个单人挑战模式的排名，根据选择的难度
    const defendAsteroidScores = getScores(GameMode.DEFEND_METEOR, rankingDifficulty).slice(0, 10);
    const miaoRunScores = getScores(GameMode.MIAO_RUN, rankingDifficulty).slice(0, 10);
    const scoreCompetitionScores = getScores(GameMode.SCORE_COMPETITION, rankingDifficulty).slice(0, 10);

    return (
      <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
        {/* 顶部信息栏 */}
        <div className="w-full max-w-5xl flex justify-between items-center mb-6">
          <button
            className="px-4 py-2 bg-card hover:bg-gray-700 text-white rounded-lg text-sm font-medium btn-hover tech-border"
            onClick={handleBack}
          >
            返回菜单
          </button>
          <div className="flex items-center gap-4">
            {/* 难度切换按钮 */}
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${rankingDifficulty === Difficulty.EASY ? 'bg-primary text-white' : 'bg-card hover:bg-gray-700 text-white'}`}
                onClick={() => setRankingDifficulty(Difficulty.EASY)}
              >
                简单难度
              </button>
              <button
                className={`px-4 py-2 rounded-lg text-sm font-medium ${rankingDifficulty === Difficulty.NIGHTMARE ? 'bg-primary text-white' : 'bg-card hover:bg-gray-700 text-white'}`}
                onClick={() => setRankingDifficulty(Difficulty.NIGHTMARE)}
              >
                噩梦难度
              </button>
            </div>
            {username && (
              <div className="relative">
                <button
                  className="px-4 py-2 bg-card hover:bg-gray-700 text-white rounded-lg text-sm font-medium btn-hover tech-border"
                  onClick={handleLogout}
                >
                  {username}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 标题 */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 tech-border px-8 py-4 rounded-lg inline-block">
            天梯榜
          </h1>
        </div>

        {/* 排名列表 */}
        <div className="w-full max-w-5xl space-y-8 overflow-y-auto max-h-[70vh]">
          {/* 防御小行星 */}
          <div className="p-6 bg-card rounded-lg tech-border">
            <h2 className="text-2xl font-bold text-primary mb-4">防御小行星</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-2 px-4 text-gray-300">排名</th>
                    <th className="py-2 px-4 text-gray-300">用户名</th>
                    <th className="py-2 px-4 text-gray-300">得分</th>
                    <th className="py-2 px-4 text-gray-300">用时 (秒)</th>
                    <th className="py-2 px-4 text-gray-300">日期</th>
                  </tr>
                </thead>
                <tbody>
                  {defendAsteroidScores.length > 0 ? (
                    defendAsteroidScores.map((score, index) => (
                      <tr key={score.id} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                        <td className="py-2 px-4 text-white">{index + 1}</td>
                        <td className="py-2 px-4 text-white">{score.username}</td>
                        <td className="py-2 px-4 text-accent font-medium">{score.score}</td>
                        <td className="py-2 px-4 text-white">{score.timeUsed}</td>
                        <td className="py-2 px-4 text-gray-400">
                          {new Date(score.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-4 px-4 text-center text-gray-400">
                        暂无记录
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 喵斯快跑 */}
          <div className="p-6 bg-card rounded-lg tech-border">
            <h2 className="text-2xl font-bold text-primary mb-4">喵斯快跑</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-2 px-4 text-gray-300">排名</th>
                    <th className="py-2 px-4 text-gray-300">用户名</th>
                    <th className="py-2 px-4 text-gray-300">得分</th>
                    <th className="py-2 px-4 text-gray-300">用时 (秒)</th>
                    <th className="py-2 px-4 text-gray-300">日期</th>
                  </tr>
                </thead>
                <tbody>
                  {miaoRunScores.length > 0 ? (
                    miaoRunScores.map((score, index) => (
                      <tr key={score.id} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                        <td className="py-2 px-4 text-white">{index + 1}</td>
                        <td className="py-2 px-4 text-white">{score.username}</td>
                        <td className="py-2 px-4 text-accent font-medium">{score.score}</td>
                        <td className="py-2 px-4 text-white">{score.timeUsed}</td>
                        <td className="py-2 px-4 text-gray-400">
                          {new Date(score.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-4 px-4 text-center text-gray-400">
                        暂无记录
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* 积分比拼 */}
          <div className="p-6 bg-card rounded-lg tech-border">
            <h2 className="text-2xl font-bold text-primary mb-4">积分比拼</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="py-2 px-4 text-gray-300">排名</th>
                    <th className="py-2 px-4 text-gray-300">用户名</th>
                    <th className="py-2 px-4 text-gray-300">得分</th>
                    <th className="py-2 px-4 text-gray-300">用时 (秒)</th>
                    <th className="py-2 px-4 text-gray-300">日期</th>
                  </tr>
                </thead>
                <tbody>
                  {scoreCompetitionScores.length > 0 ? (
                    scoreCompetitionScores.map((score, index) => (
                      <tr key={score.id} className="border-b border-gray-800 hover:bg-gray-800 transition-colors">
                        <td className="py-2 px-4 text-white">{index + 1}</td>
                        <td className="py-2 px-4 text-white">{score.username}</td>
                        <td className="py-2 px-4 text-accent font-medium">{score.score}</td>
                        <td className="py-2 px-4 text-white">{score.timeUsed}</td>
                        <td className="py-2 px-4 text-gray-400">
                          {new Date(score.date).toLocaleDateString()}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-4 px-4 text-center text-gray-400">
                        暂无记录
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* 返回按钮 */}
        <div className="mt-8">
          <button 
            className="px-6 py-3 bg-card hover:bg-gray-700 text-white rounded-lg font-medium btn-hover tech-border"
            onClick={handleBack}
          >
            返回菜单
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-bg flex flex-col items-center justify-center p-4">
      {/* 顶部信息栏 */}
      <div className="w-full max-w-4xl flex justify-end items-center mb-6">
        {username && (
          <div className="relative">
            <div className="text-xs text-gray-400 mb-1 text-right">点此切换用户↓</div>
            <button
              className="px-4 py-2 bg-card hover:bg-gray-700 text-white rounded-lg text-sm font-medium btn-hover tech-border"
              onClick={handleLogout}
            >
              {username}
            </button>
          </div>
        )}
      </div>

      {/* 游戏标题 */}
      <div className="mb-12 text-center animate-float">
        <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4 tech-border px-8 py-4 rounded-lg inline-block text-glow">
          化学知识大闯关
        </h1>
        <p className="text-xl text-gray-300 mt-4 animate-slide-in">硅及其化合物</p>
      </div>

      {/* 游戏菜单 */}
      <div className="w-full max-w-3xl space-y-4">
        <button 
          className="w-full py-4 px-6 bg-primary hover:bg-blue-600 text-white rounded-lg text-xl font-medium btn-hover tech-border animate-slide-in"
          style={{ animationDelay: '0.1s' }}
          onClick={handlePracticeClick}
        >
          个人练习
        </button>
        <button 
          className="w-full py-4 px-6 bg-card hover:bg-gray-700 text-white rounded-lg text-xl font-medium btn-hover tech-border animate-slide-in"
          style={{ animationDelay: '0.2s' }}
          onClick={handleChallengeClick}
        >
          单人挑战
        </button>

        <button 
          className="w-full py-4 px-6 bg-card hover:bg-gray-700 text-white rounded-lg text-xl font-medium btn-hover tech-border animate-slide-in"
          style={{ animationDelay: '0.3s' }}
          onClick={handleRankingClick}
        >
          天梯榜
        </button>
        <button 
          className="w-full py-4 px-6 bg-card hover:bg-gray-700 text-white rounded-lg text-xl font-medium btn-hover tech-border animate-slide-in"
          style={{ animationDelay: '0.4s' }}
          onClick={() => setCurrentView('credits')}
        >
          创作人员名单
        </button>
      </div>

      {/* 页脚 */}
      <div className="mt-16 text-gray-400 text-sm animate-slide-in flex flex-col items-center gap-2" style={{ animationDelay: '0.4s' }}>
        <p>© 2026 化学知识大闯关 | 版本 1.0.0</p>
        <a href="https://github.com/railgun31/chemistry-quiz" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
          <span>GitHub 仓库</span>
        </a>
      </div>
    </div>
  )
}

export default App