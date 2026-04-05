// 题目类型
export enum QuestionType {
  TRUE_FALSE = 'true_false',
  FILL_BLANK = 'fill_blank',
  EQUATION_MEMORY = 'equation_memory'
}

// 难度等级
export enum Difficulty {
  EASY = 'easy',
  NIGHTMARE = 'nightmare'
}

// 游戏模式
export enum GameMode {
  DEFEND_METEOR = 'defend_meteor',
  MIAO_RUN = 'miao_run',
  SCORE_COMPETITION = 'score_competition',
  TRUE_FALSE = 'true_false',
  FILL_BLANK = 'fill_blank',
  EQUATION_MEMORY = 'equation_memory'
}

// 选项类型
export interface Option {
  id: string;
  text: string;
  correct: boolean;
}

// 提示类型
export interface Hint {
  id: string;
  content: string;
}

// 题目基础接口
export interface BaseQuestion {
  id: string;
  type: QuestionType;
  difficulty: Difficulty;
  content: string;
  explanation: string;
  hints?: Hint[];
  maxHints?: number;
}

// 判断正误题目
export interface TrueFalseQuestion extends BaseQuestion {
  type: QuestionType.TRUE_FALSE;
  correctAnswer: boolean;
}

// 填补空缺题目
export interface FillBlankQuestion extends BaseQuestion {
  type: QuestionType.FILL_BLANK;
  blanks: {
    index: number;
    correctAnswer: string;
  }[];
  options?: Option[];
}

// 方程式默写题目
export interface EquationMemoryQuestion extends BaseQuestion {
  type: QuestionType.EQUATION_MEMORY;
  correctAnswer: string;
  reactants?: string[];
  products?: string[];
}

// 题目联合类型
export type Question = TrueFalseQuestion | FillBlankQuestion | EquationMemoryQuestion;

// 题库类型
export interface QuestionBank {
  easy: Question[];
  nightmare: Question[];
}

// 游戏配置类型
export interface GameConfig {
  mode: GameMode;
  difficulty: Difficulty;
  questionCount: number;
  timeLimit?: number;
}

// 成绩记录类型
export interface ScoreRecord {
  id: string;
  mode: GameMode;
  difficulty: Difficulty;
  score: number;
  timeUsed: number;
  date: string;
  username: string;
}

// 本地存储类型
export interface LocalStorageData {
  scores: ScoreRecord[];
  settings: {
    sound: boolean;
    animation: boolean;
    difficulty: Difficulty;
    questionCount: number;
  };
  progress: {
    [mode: string]: {
      [difficulty: string]: number;
    };
  };
  username: string;
}