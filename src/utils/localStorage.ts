import { LocalStorageData, ScoreRecord, Difficulty, GameMode } from '../data/types';

const STORAGE_KEY = 'chemistry-quiz-data';

// 初始化本地存储
export const initializeStorage = (): void => {
  const existingData = localStorage.getItem(STORAGE_KEY);
  if (!existingData) {
    const initialData: LocalStorageData = {
      scores: [],
      settings: {
        sound: true,
        animation: true,
        difficulty: Difficulty.EASY,
        questionCount: 10
      },
      progress: {
        true_false: {
          easy: 0,
          nightmare: 0
        },
        fill_blank: {
          easy: 0,
          nightmare: 0
        },
        equation_memory: {
          easy: 0,
          nightmare: 0
        },
        defend_meteor: {
          easy: 0,
          nightmare: 0
        },
        miao_run: {
          easy: 0,
          nightmare: 0
        },
        score_competition: {
          easy: 0,
          nightmare: 0
        }
      },
      username: ''
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));
  }
};

// 获取所有存储数据
export const getAllData = (): LocalStorageData => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    initializeStorage();
    return getAllData();
  }
  return JSON.parse(data);
};

// 保存数据
export const saveData = (data: LocalStorageData): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// 添加成绩记录
export const addScore = (score: ScoreRecord): void => {
  const data = getAllData();
  data.scores.push(score);
  // 按分数降序排序，分数相同时按用时升序排序
  data.scores.sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    } else {
      return a.timeUsed - b.timeUsed;
    }
  });
  // 只保留前20条记录
  if (data.scores.length > 20) {
    data.scores = data.scores.slice(0, 20);
  }
  saveData(data);
};

// 获取成绩记录
export const getScores = (mode?: GameMode, difficulty?: Difficulty): ScoreRecord[] => {
  const data = getAllData();
  let scores = data.scores;
  if (mode) {
    scores = scores.filter(score => score.mode === mode);
  }
  if (difficulty) {
    scores = scores.filter(score => score.difficulty === difficulty);
  }
  return scores;
};

// 更新游戏设置
export const updateSettings = (settings: Partial<LocalStorageData['settings']>): void => {
  const data = getAllData();
  data.settings = {
    ...data.settings,
    ...settings
  };
  saveData(data);
};

// 获取游戏设置
export const getSettings = () => {
  const data = getAllData();
  return data.settings;
};

// 更新游戏进度
export const updateProgress = (mode: string, difficulty: string, progress: number): void => {
  const data = getAllData();
  if (!data.progress[mode]) {
    data.progress[mode] = {};
  }
  data.progress[mode][difficulty] = progress;
  saveData(data);
};

// 获取游戏进度
export const getProgress = (mode: string, difficulty: string): number => {
  const data = getAllData();
  if (data.progress[mode] && data.progress[mode][difficulty]) {
    return data.progress[mode][difficulty];
  }
  return 0;
};

// 清空成绩记录
export const clearScores = (): void => {
  const data = getAllData();
  data.scores = [];
  saveData(data);
};

// 清空所有数据
export const clearAllData = (): void => {
  localStorage.removeItem(STORAGE_KEY);
  initializeStorage();
};

// 更新用户名
export const updateUsername = (username: string): void => {
  const data = getAllData();
  data.username = username;
  saveData(data);
};

// 获取用户名
export const getUsername = (): string => {
  const data = getAllData();
  return data.username;
};