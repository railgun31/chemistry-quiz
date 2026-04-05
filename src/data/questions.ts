import { QuestionBank, QuestionType, Difficulty } from './types';

const questionBank: QuestionBank = {
  easy: [
    // 判断正误题目
    {
      id: 'easy-tf-1',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: 'SiO₂ 是酸性氧化物，能与水反应生成硅酸。',
      explanation: 'SiO₂ 是酸性氧化物，但不溶于水，不能与水直接反应生成硅酸。',
      correctAnswer: false
    },
    {
      id: 'easy-tf-2',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '玻璃的主要成分是 SiO₂。',
      explanation: '玻璃的主要成分是 SiO₂，还含有 Na₂SiO₃ 和 CaSiO₃。',
      correctAnswer: true
    },
    {
      id: 'easy-tf-3',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '硅在自然界中主要以单质形式存在。',
      explanation: '硅在自然界中主要以二氧化硅和硅酸盐的形式存在，没有游离态的硅。',
      correctAnswer: false
    },
    {
      id: 'easy-tf-4',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '硅酸钠溶液可以与盐酸反应生成硅酸沉淀。',
      explanation: '硅酸钠溶液与盐酸反应生成氯化钠和硅酸沉淀，反应方程式为 Na₂SiO₃ + 2HCl → 2NaCl + H₂SiO₃↓。',
      correctAnswer: true
    },
    {
      id: 'easy-tf-5',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '二氧化硅可以与氢氟酸反应生成四氟化硅和水。',
      explanation: '二氧化硅与氢氟酸反应生成四氟化硅和水，反应方程式为 SiO₂ + 4HF → SiF₄↑ + 2H₂O。',
      correctAnswer: true
    },
    {
      id: 'easy-tf-6',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '硅是地壳中含量最多的元素。',
      explanation: '地壳中含量最多的元素是氧，其次是硅。',
      correctAnswer: false
    },
    {
      id: 'easy-tf-7',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '硅酸是一种强酸，能与金属反应生成氢气。',
      explanation: '硅酸是一种弱酸，酸性比碳酸还弱，不能与金属反应生成氢气。',
      correctAnswer: false
    },
    {
      id: 'easy-tf-8',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '硅的导电性介于导体和绝缘体之间，是一种半导体材料。',
      explanation: '硅是一种半导体材料，其导电性介于导体和绝缘体之间，广泛应用于电子工业。',
      correctAnswer: true
    },
    {
      id: 'easy-tf-9',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '二氧化硅可以与氧化钙反应生成硅酸钙。',
      explanation: '二氧化硅与氧化钙在高温下反应生成硅酸钙，反应方程式为 SiO₂ + CaO 高温 CaSiO₃。',
      correctAnswer: true
    },
    {
      id: 'easy-tf-10',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '硅酸钠溶液与二氧化碳反应生成碳酸钠和硅酸沉淀。',
      explanation: '硅酸钠溶液与二氧化碳反应生成碳酸钠和硅酸沉淀，反应方程式为 Na₂SiO₃ + CO₂ + H₂O → Na₂CO₃ + H₂SiO₃↓。',
      correctAnswer: true
    },
    {
      id: 'easy-tf-11',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '硅与氧气在高温下反应生成二氧化硅。',
      explanation: '硅与氧气在高温下反应生成二氧化硅，反应方程式为 Si + O₂ 高温 SiO₂。',
      correctAnswer: true
    },
    {
      id: 'easy-tf-12',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '硅与氯气在高温下反应生成四氯化硅。',
      explanation: '硅与氯气在高温下反应生成四氯化硅，反应方程式为 Si + 2Cl₂ 高温 SiCl₄。',
      correctAnswer: true
    },
    {
      id: 'easy-tf-13',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '二氧化硅与氢氧化钠反应生成硅酸钠和水。',
      explanation: '二氧化硅与氢氧化钠反应生成硅酸钠和水，反应方程式为 SiO₂ + 2NaOH → Na₂SiO₃ + H₂O。',
      correctAnswer: true
    },
    {
      id: 'easy-tf-14',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '四氯化硅与水反应生成二氧化硅和氯化氢。',
      explanation: '四氯化硅与水反应生成二氧化硅和氯化氢，反应方程式为 SiCl₄ + 2H₂O → SiO₂ + 4HCl。',
      correctAnswer: true
    },
    {
      id: 'easy-tf-15',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '硅与氢氧化钠溶液反应生成硅酸钠和氢气。',
      explanation: '硅与氢氧化钠溶液反应生成硅酸钠和氢气，反应方程式为 Si + 2NaOH + H₂O → Na₂SiO₃ + 2H₂↑。',
      correctAnswer: true
    },
    {
      id: 'easy-tf-16',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '二氧化硅与碳在高温下反应生成硅和一氧化碳。',
      explanation: '二氧化硅与碳在高温下反应生成硅和一氧化碳，反应方程式为 SiO₂ + 2C 高温 Si + 2CO↑。',
      correctAnswer: true
    },
    {
      id: 'easy-tf-17',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '硅酸是一种白色胶状沉淀。',
      explanation: '硅酸是一种白色胶状沉淀，不溶于水。',
      correctAnswer: true
    },
    {
      id: 'easy-tf-18',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '硅酸钠的水溶液俗称水玻璃。',
      explanation: '硅酸钠的水溶液俗称水玻璃，是一种常用的黏合剂。',
      correctAnswer: true
    },
    {
      id: 'easy-tf-19',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '二氧化硅是制造玻璃、陶瓷、水泥等的重要原料。',
      explanation: '二氧化硅是制造玻璃、陶瓷、水泥等的重要原料。',
      correctAnswer: true
    },
    {
      id: 'easy-tf-20',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.EASY,
      content: '硅是一种金属元素。',
      explanation: '硅是非金属元素，位于元素周期表的第三周期第IVA族。',
      correctAnswer: false
    },
    
    // 填补空缺题目
    {
      id: 'easy-fill-1',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'SiO₂ + NaOH → Na₂SiO₃ + H₂O',
      explanation: '二氧化硅与氢氧化钠反应生成硅酸钠和水，配平后系数为 1:2:1:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ]
    },
    {
      id: 'easy-fill-2',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'Si + Cl₂ → SiCl₄',
      explanation: '硅与氯气在高温下反应生成四氯化硅，配平后系数为 1:2:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ]
    },
    {
      id: 'easy-fill-3',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'Na₂SiO₃ + HCl → NaCl + H₂SiO₃↓',
      explanation: '硅酸钠与盐酸反应生成氯化钠和硅酸沉淀，配平后系数为 1:2:2:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '2' },
        { index: 3, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ]
    },
    {
      id: 'easy-fill-4',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'SiO₂ + CaO → CaSiO₃',
      explanation: '二氧化硅与氧化钙在高温下反应生成硅酸钙，配平后系数为 1:1:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '1' },
        { index: 2, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: false },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ]
    },
    {
      id: 'easy-fill-5',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'Si + O₂ → SiO₂',
      explanation: '硅与氧气在高温下反应生成二氧化硅，配平后系数为 1:1:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '1' },
        { index: 2, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: false },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ]
    },
    {
      id: 'easy-fill-6',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'SiO₂ + 4HF → SiF₄↑ + H₂O',
      explanation: '二氧化硅与氢氟酸反应生成四氟化硅和水，配平后系数为 1:4:1:2。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '4' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '2' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: false },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: true }
      ]
    },
    {
      id: 'easy-fill-7',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'SiCl₄ + H₂O → SiO₂ + HCl',
      explanation: '四氯化硅水解生成二氧化硅和氯化氢，配平后系数为 1:2:1:4。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '4' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: true }
      ]
    },
    {
      id: 'easy-fill-8',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'Na₂SiO₃ + CO₂ + H₂O → Na₂CO₃ + H₂SiO₃↓',
      explanation: '硅酸钠与二氧化碳和水反应生成碳酸钠和硅酸沉淀，配平后系数为 1:1:1:1:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '1' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '1' },
        { index: 4, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: false },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ]
    },
    {
      id: 'easy-fill-9',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'Si + 2NaOH + H₂O → Na₂SiO₃ + H₂↑',
      explanation: '硅与氢氧化钠和水反应生成硅酸钠和氢气，配平后系数为 1:2:1:1:2。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '1' },
        { index: 4, correctAnswer: '2' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ]
    },
    {
      id: 'easy-fill-10',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'SiO₂ + 2C → Si + 2CO↑',
      explanation: '二氧化硅与碳在高温下反应生成硅和一氧化碳，配平后系数为 1:2:1:2。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '2' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ]
    },
    {
      id: 'easy-fill-11',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'H₂SiO₃ → SiO₂ + H₂O',
      explanation: '硅酸受热分解生成二氧化硅和水，配平后系数为 1:1:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '1' },
        { index: 2, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: false },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ]
    },
    {
      id: 'easy-fill-12',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'Si + 2F₂ → SiF₄',
      explanation: '硅与氟气反应生成四氟化硅，配平后系数为 1:2:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ]
    },
    {
      id: 'easy-fill-13',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'SiO₂ + Na₂CO₃ → Na₂SiO₃ + CO₂↑',
      explanation: '二氧化硅与碳酸钠在高温下反应生成硅酸钠和二氧化碳，配平后系数为 1:1:1:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '1' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: false },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ]
    },
    {
      id: 'easy-fill-14',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'Si + 2H₂ → SiH₄',
      explanation: '硅与氢气在高温下反应生成硅烷，配平后系数为 1:2:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ]
    },
    {
      id: 'easy-fill-15',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'SiH₄ + 2O₂ → SiO₂ + 2H₂O',
      explanation: '硅烷在氧气中燃烧生成二氧化硅和水，配平后系数为 1:2:1:2。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '2' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ]
    },
    {
      id: 'easy-fill-16',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'Na₂SiO₃ + 2HNO₃ → 2NaNO₃ + H₂SiO₃↓',
      explanation: '硅酸钠与硝酸反应生成硝酸钠和硅酸沉淀，配平后系数为 1:2:2:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '2' },
        { index: 3, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ]
    },
    {
      id: 'easy-fill-17',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'SiO₂ + 6HF → H₂SiF₆ + 2H₂O',
      explanation: '二氧化硅与过量氢氟酸反应生成氟硅酸和水，配平后系数为 1:6:1:2。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '6' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '2' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: false },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false },
        { id: '5', text: '5', correct: false },
        { id: '6', text: '6', correct: true }
      ]
    },
    {
      id: 'easy-fill-18',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'Si + 2Cl₂ + 2H₂ → SiCl₄ + 2H₂',
      explanation: '硅、氯气和氢气反应生成四氯化硅和氢气，配平后系数为 1:2:2:1:2。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '2' },
        { index: 3, correctAnswer: '1' },
        { index: 4, correctAnswer: '2' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ]
    },
    {
      id: 'easy-fill-19',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'Na₂SiO₃ + CaCl₂ → CaSiO₃↓ + 2NaCl',
      explanation: '硅酸钠与氯化钙反应生成硅酸钙沉淀和氯化钠，配平后系数为 1:1:1:2。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '1' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '2' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ]
    },
    {
      id: 'easy-fill-20',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.EASY,
      content: 'SiO₂ + 3C → SiC + 2CO↑',
      explanation: '二氧化硅与碳在高温下反应生成碳化硅和一氧化碳，配平后系数为 1:3:1:2。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '3' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '2' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: false },
        { id: '3', text: '3', correct: true },
        { id: '4', text: '4', correct: false }
      ]
    },
    
    // 方程式默写题目
    {
      id: 'easy-memory-1',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '二氧化硅与碳在高温下反应制备粗硅',
      explanation: '二氧化硅与碳在高温下发生置换反应，生成硅和一氧化碳。',
      correctAnswer: 'SiO₂ + 2C 高温 Si + 2CO↑',
      reactants: ['SiO₂', 'C'],
      products: ['Si', 'CO'],
      hints: [
        { id: 'hint1', content: '反应物是二氧化硅和碳。' },
        { id: 'hint2', content: '产物是硅和一氧化碳。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-2',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '硅酸钠溶液与二氧化碳反应',
      explanation: '硅酸钠溶液与二氧化碳反应生成碳酸钠和硅酸沉淀。',
      correctAnswer: 'Na₂SiO₃ + CO₂ + H₂O → Na₂CO₃ + H₂SiO₃↓',
      reactants: ['Na₂SiO₃', 'CO₂', 'H₂O'],
      products: ['Na₂CO₃', 'H₂SiO₃'],
      hints: [
        { id: 'hint1', content: '反应物包括硅酸钠、二氧化碳和水。' },
        { id: 'hint2', content: '产物是碳酸钠和硅酸沉淀。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-3',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '二氧化硅与氢氧化钠反应',
      explanation: '二氧化硅与氢氧化钠反应生成硅酸钠和水。',
      correctAnswer: 'SiO₂ + 2NaOH → Na₂SiO₃ + H₂O',
      reactants: ['SiO₂', 'NaOH'],
      products: ['Na₂SiO₃', 'H₂O'],
      hints: [
        { id: 'hint1', content: '反应物是二氧化硅和氢氧化钠。' },
        { id: 'hint2', content: '配平时需要考虑 Na 元素的平衡。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-4',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '硅与氧气反应',
      explanation: '硅与氧气在高温下反应生成二氧化硅。',
      correctAnswer: 'Si + O₂ 高温 SiO₂',
      reactants: ['Si', 'O₂'],
      products: ['SiO₂'],
      hints: [
        { id: 'hint1', content: '反应物是硅和氧气。' },
        { id: 'hint2', content: '产物是二氧化硅。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-5',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '硅与氯气反应',
      explanation: '硅与氯气在高温下反应生成四氯化硅。',
      correctAnswer: 'Si + 2Cl₂ 高温 SiCl₄',
      reactants: ['Si', 'Cl₂'],
      products: ['SiCl₄'],
      hints: [
        { id: 'hint1', content: '反应物是硅和氯气。' },
        { id: 'hint2', content: '产物是四氯化硅。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-6',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '二氧化硅与氢氟酸反应',
      explanation: '二氧化硅与氢氟酸反应生成四氟化硅和水。',
      correctAnswer: 'SiO₂ + 4HF → SiF₄↑ + 2H₂O',
      reactants: ['SiO₂', 'HF'],
      products: ['SiF₄', 'H₂O'],
      hints: [
        { id: 'hint1', content: '反应物是二氧化硅和氢氟酸。' },
        { id: 'hint2', content: '产物是四氟化硅和水。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-7',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '硅酸钠与盐酸反应',
      explanation: '硅酸钠与盐酸反应生成氯化钠和硅酸沉淀。',
      correctAnswer: 'Na₂SiO₃ + 2HCl → 2NaCl + H₂SiO₃↓',
      reactants: ['Na₂SiO₃', 'HCl'],
      products: ['NaCl', 'H₂SiO₃'],
      hints: [
        { id: 'hint1', content: '反应物是硅酸钠和盐酸。' },
        { id: 'hint2', content: '配平时需要考虑 Na 元素的平衡。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-8',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '二氧化硅与氧化钙反应',
      explanation: '二氧化硅与氧化钙在高温下反应生成硅酸钙。',
      correctAnswer: 'SiO₂ + CaO 高温 CaSiO₃',
      reactants: ['SiO₂', 'CaO'],
      products: ['CaSiO₃'],
      hints: [
        { id: 'hint1', content: '反应物是二氧化硅和氧化钙。' },
        { id: 'hint2', content: '产物是硅酸钙。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-9',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '硅与氢氧化钠溶液反应',
      explanation: '硅与氢氧化钠溶液反应生成硅酸钠和氢气。',
      correctAnswer: 'Si + 2NaOH + H₂O → Na₂SiO₃ + 2H₂↑',
      reactants: ['Si', 'NaOH', 'H₂O'],
      products: ['Na₂SiO₃', 'H₂'],
      hints: [
        { id: 'hint1', content: '反应物包括硅、氢氧化钠和水。' },
        { id: 'hint2', content: '产物是硅酸钠和氢气。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-10',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '四氯化硅水解反应',
      explanation: '四氯化硅与水反应生成二氧化硅和氯化氢。',
      correctAnswer: 'SiCl₄ + 2H₂O → SiO₂ + 4HCl',
      reactants: ['SiCl₄', 'H₂O'],
      products: ['SiO₂', 'HCl'],
      hints: [
        { id: 'hint1', content: '反应物是四氯化硅和水。' },
        { id: 'hint2', content: '配平时需要考虑 Cl 元素的平衡。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-11',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '硅酸受热分解',
      explanation: '硅酸受热分解生成二氧化硅和水。',
      correctAnswer: 'H₂SiO₃ △ SiO₂ + H₂O',
      reactants: ['H₂SiO₃'],
      products: ['SiO₂', 'H₂O'],
      hints: [
        { id: 'hint1', content: '反应物是硅酸。' },
        { id: 'hint2', content: '产物是二氧化硅和水。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-12',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '硅与氟气反应',
      explanation: '硅与氟气反应生成四氟化硅。',
      correctAnswer: 'Si + 2F₂ → SiF₄',
      reactants: ['Si', 'F₂'],
      products: ['SiF₄'],
      hints: [
        { id: 'hint1', content: '反应物是硅和氟气。' },
        { id: 'hint2', content: '产物是四氟化硅。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-13',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '二氧化硅与碳酸钠在高温下反应',
      explanation: '二氧化硅与碳酸钠在高温下反应生成硅酸钠和二氧化碳。',
      correctAnswer: 'SiO₂ + Na₂CO₃ 高温 Na₂SiO₃ + CO₂↑',
      reactants: ['SiO₂', 'Na₂CO₃'],
      products: ['Na₂SiO₃', 'CO₂'],
      hints: [
        { id: 'hint1', content: '反应物是二氧化硅和碳酸钠。' },
        { id: 'hint2', content: '产物是硅酸钠和二氧化碳。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-14',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '硅与氢气在高温下反应',
      explanation: '硅与氢气在高温下反应生成硅烷。',
      correctAnswer: 'Si + 2H₂ 高温 SiH₄',
      reactants: ['Si', 'H₂'],
      products: ['SiH₄'],
      hints: [
        { id: 'hint1', content: '反应物是硅和氢气。' },
        { id: 'hint2', content: '产物是硅烷。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-15',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '硅烷在氧气中燃烧',
      explanation: '硅烷在氧气中燃烧生成二氧化硅和水。',
      correctAnswer: 'SiH₄ + 2O₂ → SiO₂ + 2H₂O',
      reactants: ['SiH₄', 'O₂'],
      products: ['SiO₂', 'H₂O'],
      hints: [
        { id: 'hint1', content: '反应物是硅烷和氧气。' },
        { id: 'hint2', content: '产物是二氧化硅和水。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-16',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '硅酸钠与硝酸反应',
      explanation: '硅酸钠与硝酸反应生成硝酸钠和硅酸沉淀。',
      correctAnswer: 'Na₂SiO₃ + 2HNO₃ → 2NaNO₃ + H₂SiO₃↓',
      reactants: ['Na₂SiO₃', 'HNO₃'],
      products: ['NaNO₃', 'H₂SiO₃'],
      hints: [
        { id: 'hint1', content: '反应物是硅酸钠和硝酸。' },
        { id: 'hint2', content: '配平时需要考虑 Na 元素的平衡。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-17',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '二氧化硅与过量氢氟酸反应',
      explanation: '二氧化硅与过量氢氟酸反应生成氟硅酸和水。',
      correctAnswer: 'SiO₂ + 6HF → H₂SiF₆ + 2H₂O',
      reactants: ['SiO₂', 'HF'],
      products: ['H₂SiF₆', 'H₂O'],
      hints: [
        { id: 'hint1', content: '反应物是二氧化硅和氢氟酸。' },
        { id: 'hint2', content: '产物是氟硅酸和水。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-18',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '硅酸钠与氯化钙反应',
      explanation: '硅酸钠与氯化钙反应生成硅酸钙沉淀和氯化钠。',
      correctAnswer: 'Na₂SiO₃ + CaCl₂ → CaSiO₃↓ + 2NaCl',
      reactants: ['Na₂SiO₃', 'CaCl₂'],
      products: ['CaSiO₃', 'NaCl'],
      hints: [
        { id: 'hint1', content: '反应物是硅酸钠和氯化钙。' },
        { id: 'hint2', content: '配平时需要考虑 Na 元素的平衡。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-19',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '二氧化硅与碳在高温下反应生成碳化硅',
      explanation: '二氧化硅与碳在高温下反应生成碳化硅和一氧化碳。',
      correctAnswer: 'SiO₂ + 3C 高温 SiC + 2CO↑',
      reactants: ['SiO₂', 'C'],
      products: ['SiC', 'CO'],
      hints: [
        { id: 'hint1', content: '反应物是二氧化硅和碳。' },
        { id: 'hint2', content: '产物是碳化硅和一氧化碳。' }
      ],
      maxHints: 2
    },
    {
      id: 'easy-memory-20',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.EASY,
      content: '硅与溴单质在高温下反应',
      explanation: '硅与溴单质在高温下反应生成四溴化硅。',
      correctAnswer: 'Si + 2Br₂ 高温 SiBr₄',
      reactants: ['Si', 'Br₂'],
      products: ['SiBr₄'],
      hints: [
        { id: 'hint1', content: '反应物是硅和溴单质。' },
        { id: 'hint2', content: '产物是四溴化硅。' }
      ],
      maxHints: 2
    }
  ],
  nightmare: [
    // 判断正误题目
    {
      id: 'nightmare-tf-1',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: 'SiO₂ 是酸性氧化物，能与水反应生成硅酸。',
      explanation: 'SiO₂ 是酸性氧化物，但不溶于水，不能与水直接反应生成硅酸。',
      correctAnswer: false,
      hints: [
        { id: 'hint1', content: 'SiO₂ 是酸性氧化物，但不溶于水。' },
        { id: 'hint2', content: '硅酸通常通过硅酸盐与酸反应制备。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-2',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅与氢氧化钠溶液反应生成硅酸钠和氢气。',
      explanation: '硅与氢氧化钠溶液反应生成硅酸钠和氢气，反应方程式为 Si + 2NaOH + H₂O → Na₂SiO₃ + 2H₂↑。',
      correctAnswer: true,
      hints: [
        { id: 'hint1', content: '硅在碱性溶液中会发生反应，生成硅酸盐和氢气。' },
        { id: 'hint2', content: '反应需要水参与，硅与干燥的氢氧化钠固体不反应。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-3',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '二氧化硅可以与氢氟酸反应生成四氟化硅和水。',
      explanation: '二氧化硅与氢氟酸反应生成四氟化硅和水，反应方程式为 SiO₂ + 4HF → SiF₄↑ + 2H₂O。',
      correctAnswer: true,
      hints: [
        { id: 'hint1', content: '二氧化硅与氢氟酸反应是一个特殊的反应。' },
        { id: 'hint2', content: '四氟化硅是一种气体。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-4',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅酸钠溶液与二氧化碳反应生成碳酸钠和硅酸沉淀。',
      explanation: '硅酸钠溶液与二氧化碳反应生成碳酸钠和硅酸沉淀，反应方程式为 Na₂SiO₃ + CO₂ + H₂O → Na₂CO₃ + H₂SiO₃↓。',
      correctAnswer: true,
      hints: [
        { id: 'hint1', content: '硅酸钠溶液与二氧化碳反应生成硅酸沉淀。' },
        { id: 'hint2', content: '这是一个强酸制弱酸的反应。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-5',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅是地壳中含量最多的元素。',
      explanation: '地壳中含量最多的元素是氧，其次是硅。',
      correctAnswer: false,
      hints: [
        { id: 'hint1', content: '地壳中含量最多的元素是氧。' },
        { id: 'hint2', content: '硅是地壳中含量第二多的元素。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-6',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅酸是一种强酸，能与金属反应生成氢气。',
      explanation: '硅酸是一种弱酸，酸性比碳酸还弱，不能与金属反应生成氢气。',
      correctAnswer: false,
      hints: [
        { id: 'hint1', content: '硅酸是一种弱酸。' },
        { id: 'hint2', content: '酸性比碳酸还弱。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-7',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅的导电性介于导体和绝缘体之间，是一种半导体材料。',
      explanation: '硅是一种半导体材料，其导电性介于导体和绝缘体之间，广泛应用于电子工业。',
      correctAnswer: true,
      hints: [
        { id: 'hint1', content: '硅是一种半导体材料。' },
        { id: 'hint2', content: '半导体的导电性介于导体和绝缘体之间。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-8',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '二氧化硅可以与氧化钙反应生成硅酸钙。',
      explanation: '二氧化硅与氧化钙在高温下反应生成硅酸钙，反应方程式为 SiO₂ + CaO 高温 CaSiO₃。',
      correctAnswer: true,
      hints: [
        { id: 'hint1', content: '二氧化硅与氧化钙在高温下反应。' },
        { id: 'hint2', content: '产物是硅酸钙。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-9',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅在自然界中主要以单质形式存在。',
      explanation: '硅在自然界中主要以二氧化硅和硅酸盐的形式存在，没有游离态的硅。',
      correctAnswer: false,
      hints: [
        { id: 'hint1', content: '硅在自然界中主要以化合物形式存在。' },
        { id: 'hint2', content: '主要存在形式是二氧化硅和硅酸盐。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-10',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '玻璃的主要成分是 SiO₂。',
      explanation: '玻璃的主要成分是 SiO₂，还含有 Na₂SiO₃ 和 CaSiO₃。',
      correctAnswer: true,
      hints: [
        { id: 'hint1', content: '玻璃的主要成分是 SiO₂。' },
        { id: 'hint2', content: '还含有 Na₂SiO₃ 和 CaSiO₃。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-11',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅酸钠溶液可以与盐酸反应生成硅酸沉淀。',
      explanation: '硅酸钠溶液与盐酸反应生成氯化钠和硅酸沉淀，反应方程式为 Na₂SiO₃ + 2HCl → 2NaCl + H₂SiO₃↓。',
      correctAnswer: true,
      hints: [
        { id: 'hint1', content: '硅酸钠溶液与盐酸反应生成硅酸沉淀。' },
        { id: 'hint2', content: '反应方程式为 Na₂SiO₃ + 2HCl → 2NaCl + H₂SiO₃↓。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-12',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅与氧气在高温下反应生成二氧化硅。',
      explanation: '硅与氧气在高温下反应生成二氧化硅，反应方程式为 Si + O₂ 高温 SiO₂。',
      correctAnswer: true,
      hints: [
        { id: 'hint1', content: '硅与氧气在高温下反应。' },
        { id: 'hint2', content: '产物是二氧化硅。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-13',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅与氯气在高温下反应生成四氯化硅。',
      explanation: '硅与氯气在高温下反应生成四氯化硅，反应方程式为 Si + 2Cl₂ 高温 SiCl₄。',
      correctAnswer: true,
      hints: [
        { id: 'hint1', content: '硅与氯气在高温下反应。' },
        { id: 'hint2', content: '产物是四氯化硅。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-14',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '二氧化硅与氢氧化钠反应生成硅酸钠和水。',
      explanation: '二氧化硅与氢氧化钠反应生成硅酸钠和水，反应方程式为 SiO₂ + 2NaOH → Na₂SiO₃ + H₂O。',
      correctAnswer: true,
      hints: [
        { id: 'hint1', content: '二氧化硅与氢氧化钠反应。' },
        { id: 'hint2', content: '产物是硅酸钠和水。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-15',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '四氯化硅与水反应生成二氧化硅和氯化氢。',
      explanation: '四氯化硅与水反应生成二氧化硅和氯化氢，反应方程式为 SiCl₄ + 2H₂O → SiO₂ + 4HCl。',
      correctAnswer: true,
      hints: [
        { id: 'hint1', content: '四氯化硅与水反应。' },
        { id: 'hint2', content: '产物是二氧化硅和氯化氢。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-16',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅酸是一种白色胶状沉淀。',
      explanation: '硅酸是一种白色胶状沉淀，不溶于水。',
      correctAnswer: true,
      hints: [
        { id: 'hint1', content: '硅酸是一种白色胶状沉淀。' },
        { id: 'hint2', content: '不溶于水。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-17',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅酸钠的水溶液俗称水玻璃。',
      explanation: '硅酸钠的水溶液俗称水玻璃，是一种常用的黏合剂。',
      correctAnswer: true,
      hints: [
        { id: 'hint1', content: '硅酸钠的水溶液俗称水玻璃。' },
        { id: 'hint2', content: '是一种常用的黏合剂。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-18',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '二氧化硅是制造玻璃、陶瓷、水泥等的重要原料。',
      explanation: '二氧化硅是制造玻璃、陶瓷、水泥等的重要原料。',
      correctAnswer: true,
      hints: [
        { id: 'hint1', content: '二氧化硅是制造玻璃的重要原料。' },
        { id: 'hint2', content: '也是制造陶瓷、水泥等的重要原料。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-19',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅是一种金属元素。',
      explanation: '硅是非金属元素，位于元素周期表的第三周期第IVA族。',
      correctAnswer: false,
      hints: [
        { id: 'hint1', content: '硅是非金属元素。' },
        { id: 'hint2', content: '位于元素周期表的第三周期第IVA族。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-tf-20',
      type: QuestionType.TRUE_FALSE,
      difficulty: Difficulty.NIGHTMARE,
      content: '二氧化硅与碳在高温下反应生成硅和一氧化碳。',
      explanation: '二氧化硅与碳在高温下反应生成硅和一氧化碳，反应方程式为 SiO₂ + 2C 高温 Si + 2CO↑。',
      correctAnswer: true,
      hints: [
        { id: 'hint1', content: '二氧化硅与碳在高温下反应。' },
        { id: 'hint2', content: '产物是硅和一氧化碳。' }
      ],
      maxHints: 2
    },
    
    // 填补空缺题目
    {
      id: 'nightmare-fill-1',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'SiO₂ + NaOH → Na₂SiO₃ + H₂O',
      explanation: '二氧化硅与氢氧化钠反应生成硅酸钠和水，配平后系数为 1:2:1:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ],
      hints: [
        { id: 'hint1', content: '配平时需要考虑 Na 元素的平衡。' },
        { id: 'hint2', content: '反应前后各元素的原子数守恒。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-2',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'Si + Cl₂ → SiCl₄',
      explanation: '硅与氯气在高温下反应生成四氯化硅，配平后系数为 1:2:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ],
      hints: [
        { id: 'hint1', content: '配平时需要考虑 Cl 元素的平衡。' },
        { id: 'hint2', content: '每个 SiCl₄ 分子含有 4 个 Cl 原子。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-3',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'Na₂SiO₃ + HCl → NaCl + H₂SiO₃↓',
      explanation: '硅酸钠与盐酸反应生成氯化钠和硅酸沉淀，配平后系数为 1:2:2:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '2' },
        { index: 3, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ],
      hints: [
        { id: 'hint1', content: '配平时需要考虑 Na 元素的平衡。' },
        { id: 'hint2', content: '反应前后各元素的原子数守恒。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-4',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'SiO₂ + CaO → CaSiO₃',
      explanation: '二氧化硅与氧化钙在高温下反应生成硅酸钙，配平后系数为 1:1:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '1' },
        { index: 2, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: false },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ],
      hints: [
        { id: 'hint1', content: '反应前后各元素的原子数守恒。' },
        { id: 'hint2', content: '每个化学式中各元素的原子数已经平衡。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-5',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'Si + O₂ → SiO₂',
      explanation: '硅与氧气在高温下反应生成二氧化硅，配平后系数为 1:1:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '1' },
        { index: 2, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: false },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ],
      hints: [
        { id: 'hint1', content: '反应前后各元素的原子数守恒。' },
        { id: 'hint2', content: '每个化学式中各元素的原子数已经平衡。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-6',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'SiO₂ + 4HF → SiF₄↑ + H₂O',
      explanation: '二氧化硅与氢氟酸反应生成四氟化硅和水，配平后系数为 1:4:1:2。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '4' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '2' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: false },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: true }
      ],
      hints: [
        { id: 'hint1', content: '配平时需要考虑 F 元素的平衡。' },
        { id: 'hint2', content: '每个 SiF₄ 分子含有 4 个 F 原子。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-7',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'SiCl₄ + H₂O → SiO₂ + HCl',
      explanation: '四氯化硅水解生成二氧化硅和氯化氢，配平后系数为 1:2:1:4。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '4' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: true }
      ],
      hints: [
        { id: 'hint1', content: '配平时需要考虑 Cl 元素的平衡。' },
        { id: 'hint2', content: '每个 SiCl₄ 分子含有 4 个 Cl 原子。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-8',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'Na₂SiO₃ + CO₂ + H₂O → Na₂CO₃ + H₂SiO₃↓',
      explanation: '硅酸钠与二氧化碳和水反应生成碳酸钠和硅酸沉淀，配平后系数为 1:1:1:1:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '1' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '1' },
        { index: 4, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: false },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ],
      hints: [
        { id: 'hint1', content: '反应前后各元素的原子数守恒。' },
        { id: 'hint2', content: '每个化学式中各元素的原子数已经平衡。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-9',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'Si + 2NaOH + H₂O → Na₂SiO₃ + H₂↑',
      explanation: '硅与氢氧化钠和水反应生成硅酸钠和氢气，配平后系数为 1:2:1:1:2。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '1' },
        { index: 4, correctAnswer: '2' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ],
      hints: [
        { id: 'hint1', content: '配平时需要考虑 H 元素的平衡。' },
        { id: 'hint2', content: '反应生成了 2 分子的氢气。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-10',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'SiO₂ + 2C → Si + 2CO↑',
      explanation: '二氧化硅与碳在高温下反应生成硅和一氧化碳，配平后系数为 1:2:1:2。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '2' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ],
      hints: [
        { id: 'hint1', content: '配平时需要考虑 C 元素的平衡。' },
        { id: 'hint2', content: '反应生成了 2 分子的一氧化碳。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-11',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'H₂SiO₃ → SiO₂ + H₂O',
      explanation: '硅酸受热分解生成二氧化硅和水，配平后系数为 1:1:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '1' },
        { index: 2, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: false },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ],
      hints: [
        { id: 'hint1', content: '反应前后各元素的原子数守恒。' },
        { id: 'hint2', content: '每个化学式中各元素的原子数已经平衡。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-12',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'Si + 2F₂ → SiF₄',
      explanation: '硅与氟气反应生成四氟化硅，配平后系数为 1:2:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ],
      hints: [
        { id: 'hint1', content: '配平时需要考虑 F 元素的平衡。' },
        { id: 'hint2', content: '每个 SiF₄ 分子含有 4 个 F 原子。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-13',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'SiO₂ + Na₂CO₃ → Na₂SiO₃ + CO₂↑',
      explanation: '二氧化硅与碳酸钠在高温下反应生成硅酸钠和二氧化碳，配平后系数为 1:1:1:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '1' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: false },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ],
      hints: [
        { id: 'hint1', content: '反应前后各元素的原子数守恒。' },
        { id: 'hint2', content: '每个化学式中各元素的原子数已经平衡。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-14',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'Si + 2H₂ → SiH₄',
      explanation: '硅与氢气在高温下反应生成硅烷，配平后系数为 1:2:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ],
      hints: [
        { id: 'hint1', content: '配平时需要考虑 H 元素的平衡。' },
        { id: 'hint2', content: '每个 SiH₄ 分子含有 4 个 H 原子。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-15',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'SiH₄ + 2O₂ → SiO₂ + 2H₂O',
      explanation: '硅烷在氧气中燃烧生成二氧化硅和水，配平后系数为 1:2:1:2。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '2' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ],
      hints: [
        { id: 'hint1', content: '配平时需要考虑 O 元素的平衡。' },
        { id: 'hint2', content: '反应生成了 2 分子的水。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-16',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'Na₂SiO₃ + 2HNO₃ → 2NaNO₃ + H₂SiO₃↓',
      explanation: '硅酸钠与硝酸反应生成硝酸钠和硅酸沉淀，配平后系数为 1:2:2:1。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '2' },
        { index: 3, correctAnswer: '1' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ],
      hints: [
        { id: 'hint1', content: '配平时需要考虑 Na 元素的平衡。' },
        { id: 'hint2', content: '反应前后各元素的原子数守恒。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-17',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'SiO₂ + 6HF → H₂SiF₆ + 2H₂O',
      explanation: '二氧化硅与过量氢氟酸反应生成氟硅酸和水，配平后系数为 1:6:1:2。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '6' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '2' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: false },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false },
        { id: '5', text: '5', correct: false },
        { id: '6', text: '6', correct: true }
      ],
      hints: [
        { id: 'hint1', content: '配平时需要考虑 F 元素的平衡。' },
        { id: 'hint2', content: '每个 H₂SiF₆ 分子含有 6 个 F 原子。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-18',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'Si + 2Cl₂ + 2H₂ → SiCl₄ + 2H₂',
      explanation: '硅、氯气和氢气反应生成四氯化硅和氢气，配平后系数为 1:2:2:1:2。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '2' },
        { index: 2, correctAnswer: '2' },
        { index: 3, correctAnswer: '1' },
        { index: 4, correctAnswer: '2' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ],
      hints: [
        { id: 'hint1', content: '配平时需要考虑 Cl 元素的平衡。' },
        { id: 'hint2', content: '每个 SiCl₄ 分子含有 4 个 Cl 原子。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-19',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'Na₂SiO₃ + CaCl₂ → CaSiO₃↓ + 2NaCl',
      explanation: '硅酸钠与氯化钙反应生成硅酸钙沉淀和氯化钠，配平后系数为 1:1:1:2。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '1' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '2' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: true },
        { id: '3', text: '3', correct: false },
        { id: '4', text: '4', correct: false }
      ],
      hints: [
        { id: 'hint1', content: '配平时需要考虑 Na 元素的平衡。' },
        { id: 'hint2', content: '反应前后各元素的原子数守恒。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-fill-20',
      type: QuestionType.FILL_BLANK,
      difficulty: Difficulty.NIGHTMARE,
      content: 'SiO₂ + 3C → SiC + 2CO↑',
      explanation: '二氧化硅与碳在高温下反应生成碳化硅和一氧化碳，配平后系数为 1:3:1:2。',
      blanks: [
        { index: 0, correctAnswer: '1' },
        { index: 1, correctAnswer: '3' },
        { index: 2, correctAnswer: '1' },
        { index: 3, correctAnswer: '2' }
      ],
      options: [
        { id: '1', text: '1', correct: true },
        { id: '2', text: '2', correct: false },
        { id: '3', text: '3', correct: true },
        { id: '4', text: '4', correct: false }
      ],
      hints: [
        { id: 'hint1', content: '配平时需要考虑 C 元素的平衡。' },
        { id: 'hint2', content: '反应生成了 2 分子的一氧化碳。' }
      ],
      maxHints: 2
    },
    
    // 方程式默写题目
    {
      id: 'nightmare-memory-1',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '二氧化硅与碳在高温下反应制备粗硅',
      explanation: '二氧化硅与碳在高温下发生置换反应，生成硅和一氧化碳。',
      correctAnswer: 'SiO₂ + 2C 高温 Si + 2CO↑',
      reactants: ['SiO₂', 'C'],
      products: ['Si', 'CO'],
      hints: [
        { id: 'hint1', content: '反应物是二氧化硅和碳。' },
        { id: 'hint2', content: '产物是硅和一氧化碳。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-2',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅酸钠溶液与二氧化碳反应',
      explanation: '硅酸钠溶液与二氧化碳反应生成碳酸钠和硅酸沉淀。',
      correctAnswer: 'Na₂SiO₃ + CO₂ + H₂O → Na₂CO₃ + H₂SiO₃↓',
      reactants: ['Na₂SiO₃', 'CO₂', 'H₂O'],
      products: ['Na₂CO₃', 'H₂SiO₃'],
      hints: [
        { id: 'hint1', content: '反应物包括硅酸钠、二氧化碳和水。' },
        { id: 'hint2', content: '产物是碳酸钠和硅酸沉淀。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-3',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '二氧化硅与氢氧化钠反应',
      explanation: '二氧化硅与氢氧化钠反应生成硅酸钠和水。',
      correctAnswer: 'SiO₂ + 2NaOH → Na₂SiO₃ + H₂O',
      reactants: ['SiO₂', 'NaOH'],
      products: ['Na₂SiO₃', 'H₂O'],
      hints: [
        { id: 'hint1', content: '反应物是二氧化硅和氢氧化钠。' },
        { id: 'hint2', content: '配平时需要考虑 Na 元素的平衡。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-4',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅与氧气反应',
      explanation: '硅与氧气在高温下反应生成二氧化硅。',
      correctAnswer: 'Si + O₂ 高温 SiO₂',
      reactants: ['Si', 'O₂'],
      products: ['SiO₂'],
      hints: [
        { id: 'hint1', content: '反应物是硅和氧气。' },
        { id: 'hint2', content: '产物是二氧化硅。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-5',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅与氯气反应',
      explanation: '硅与氯气在高温下反应生成四氯化硅。',
      correctAnswer: 'Si + 2Cl₂ 高温 SiCl₄',
      reactants: ['Si', 'Cl₂'],
      products: ['SiCl₄'],
      hints: [
        { id: 'hint1', content: '反应物是硅和氯气。' },
        { id: 'hint2', content: '产物是四氯化硅。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-6',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '二氧化硅与氢氟酸反应',
      explanation: '二氧化硅与氢氟酸反应生成四氟化硅和水。',
      correctAnswer: 'SiO₂ + 4HF → SiF₄↑ + 2H₂O',
      reactants: ['SiO₂', 'HF'],
      products: ['SiF₄', 'H₂O'],
      hints: [
        { id: 'hint1', content: '反应物是二氧化硅和氢氟酸。' },
        { id: 'hint2', content: '产物是四氟化硅和水。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-7',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅酸钠与盐酸反应',
      explanation: '硅酸钠与盐酸反应生成氯化钠和硅酸沉淀。',
      correctAnswer: 'Na₂SiO₃ + 2HCl → 2NaCl + H₂SiO₃↓',
      reactants: ['Na₂SiO₃', 'HCl'],
      products: ['NaCl', 'H₂SiO₃'],
      hints: [
        { id: 'hint1', content: '反应物是硅酸钠和盐酸。' },
        { id: 'hint2', content: '配平时需要考虑 Na 元素的平衡。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-8',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '二氧化硅与氧化钙反应',
      explanation: '二氧化硅与氧化钙在高温下反应生成硅酸钙。',
      correctAnswer: 'SiO₂ + CaO 高温 CaSiO₃',
      reactants: ['SiO₂', 'CaO'],
      products: ['CaSiO₃'],
      hints: [
        { id: 'hint1', content: '反应物是二氧化硅和氧化钙。' },
        { id: 'hint2', content: '产物是硅酸钙。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-9',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅与氢氧化钠溶液反应',
      explanation: '硅与氢氧化钠溶液反应生成硅酸钠和氢气。',
      correctAnswer: 'Si + 2NaOH + H₂O → Na₂SiO₃ + 2H₂↑',
      reactants: ['Si', 'NaOH', 'H₂O'],
      products: ['Na₂SiO₃', 'H₂'],
      hints: [
        { id: 'hint1', content: '反应物包括硅、氢氧化钠和水。' },
        { id: 'hint2', content: '产物是硅酸钠和氢气。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-10',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '四氯化硅水解反应',
      explanation: '四氯化硅与水反应生成二氧化硅和氯化氢。',
      correctAnswer: 'SiCl₄ + 2H₂O → SiO₂ + 4HCl',
      reactants: ['SiCl₄', 'H₂O'],
      products: ['SiO₂', 'HCl'],
      hints: [
        { id: 'hint1', content: '反应物是四氯化硅和水。' },
        { id: 'hint2', content: '配平时需要考虑 Cl 元素的平衡。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-11',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅酸受热分解',
      explanation: '硅酸受热分解生成二氧化硅和水。',
      correctAnswer: 'H₂SiO₃ △ SiO₂ + H₂O',
      reactants: ['H₂SiO₃'],
      products: ['SiO₂', 'H₂O'],
      hints: [
        { id: 'hint1', content: '反应物是硅酸。' },
        { id: 'hint2', content: '产物是二氧化硅和水。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-12',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅与氟气反应',
      explanation: '硅与氟气反应生成四氟化硅。',
      correctAnswer: 'Si + 2F₂ → SiF₄',
      reactants: ['Si', 'F₂'],
      products: ['SiF₄'],
      hints: [
        { id: 'hint1', content: '反应物是硅和氟气。' },
        { id: 'hint2', content: '产物是四氟化硅。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-13',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '二氧化硅与碳酸钠在高温下反应',
      explanation: '二氧化硅与碳酸钠在高温下反应生成硅酸钠和二氧化碳。',
      correctAnswer: 'SiO₂ + Na₂CO₃ 高温 Na₂SiO₃ + CO₂↑',
      reactants: ['SiO₂', 'Na₂CO₃'],
      products: ['Na₂SiO₃', 'CO₂'],
      hints: [
        { id: 'hint1', content: '反应物是二氧化硅和碳酸钠。' },
        { id: 'hint2', content: '产物是硅酸钠和二氧化碳。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-14',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅与氢气在高温下反应',
      explanation: '硅与氢气在高温下反应生成硅烷。',
      correctAnswer: 'Si + 2H₂ 高温 SiH₄',
      reactants: ['Si', 'H₂'],
      products: ['SiH₄'],
      hints: [
        { id: 'hint1', content: '反应物是硅和氢气。' },
        { id: 'hint2', content: '产物是硅烷。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-15',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅烷在氧气中燃烧',
      explanation: '硅烷在氧气中燃烧生成二氧化硅和水。',
      correctAnswer: 'SiH₄ + 2O₂ → SiO₂ + 2H₂O',
      reactants: ['SiH₄', 'O₂'],
      products: ['SiO₂', 'H₂O'],
      hints: [
        { id: 'hint1', content: '反应物是硅烷和氧气。' },
        { id: 'hint2', content: '产物是二氧化硅和水。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-16',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅酸钠与硝酸反应',
      explanation: '硅酸钠与硝酸反应生成硝酸钠和硅酸沉淀。',
      correctAnswer: 'Na₂SiO₃ + 2HNO₃ → 2NaNO₃ + H₂SiO₃↓',
      reactants: ['Na₂SiO₃', 'HNO₃'],
      products: ['NaNO₃', 'H₂SiO₃'],
      hints: [
        { id: 'hint1', content: '反应物是硅酸钠和硝酸。' },
        { id: 'hint2', content: '配平时需要考虑 Na 元素的平衡。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-17',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '二氧化硅与过量氢氟酸反应',
      explanation: '二氧化硅与过量氢氟酸反应生成氟硅酸和水。',
      correctAnswer: 'SiO₂ + 6HF → H₂SiF₆ + 2H₂O',
      reactants: ['SiO₂', 'HF'],
      products: ['H₂SiF₆', 'H₂O'],
      hints: [
        { id: 'hint1', content: '反应物是二氧化硅和氢氟酸。' },
        { id: 'hint2', content: '产物是氟硅酸和水。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-18',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅酸钠与氯化钙反应',
      explanation: '硅酸钠与氯化钙反应生成硅酸钙沉淀和氯化钠。',
      correctAnswer: 'Na₂SiO₃ + CaCl₂ → CaSiO₃↓ + 2NaCl',
      reactants: ['Na₂SiO₃', 'CaCl₂'],
      products: ['CaSiO₃', 'NaCl'],
      hints: [
        { id: 'hint1', content: '反应物是硅酸钠和氯化钙。' },
        { id: 'hint2', content: '配平时需要考虑 Na 元素的平衡。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-19',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '二氧化硅与碳在高温下反应生成碳化硅',
      explanation: '二氧化硅与碳在高温下反应生成碳化硅和一氧化碳。',
      correctAnswer: 'SiO₂ + 3C 高温 SiC + 2CO↑',
      reactants: ['SiO₂', 'C'],
      products: ['SiC', 'CO'],
      hints: [
        { id: 'hint1', content: '反应物是二氧化硅和碳。' },
        { id: 'hint2', content: '产物是碳化硅和一氧化碳。' }
      ],
      maxHints: 2
    },
    {
      id: 'nightmare-memory-20',
      type: QuestionType.EQUATION_MEMORY,
      difficulty: Difficulty.NIGHTMARE,
      content: '硅与溴单质在高温下反应',
      explanation: '硅与溴单质在高温下反应生成四溴化硅。',
      correctAnswer: 'Si + 2Br₂ 高温 SiBr₄',
      reactants: ['Si', 'Br₂'],
      products: ['SiBr₄'],
      hints: [
        { id: 'hint1', content: '反应物是硅和溴单质。' },
        { id: 'hint2', content: '产物是四溴化硅。' }
      ],
      maxHints: 2
    }
  ]
};

export default questionBank;