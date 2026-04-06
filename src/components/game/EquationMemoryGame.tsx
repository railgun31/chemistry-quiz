import React, { useState, useEffect } from 'react';
import { EquationMemoryQuestion } from '../../data/types';
import { compareEquations, equationToHtml } from '../../utils/equationParser';
import HintButton from '../HintButton';

interface EquationMemoryGameProps {
  question: EquationMemoryQuestion;
  onAnswered: (isCorrect: boolean) => void;
}

interface EquationItem {
  id: string;
  content: string;
  coefficient: string;
  isReactant: boolean;
}

interface CoefficientState {
  value: string;
  hasUserInput: boolean;
}

const EquationMemoryGame: React.FC<EquationMemoryGameProps> = ({ question, onAnswered }) => {
  const [showExplanation, setShowExplanation] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [equationItems, setEquationItems] = useState<EquationItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<{id: string, content: string}[]>([]);
  const [draggedItem, setDraggedItem] = useState<string | null>(null);
  const [coefficients, setCoefficients] = useState<{[key: string]: CoefficientState}>({});

  // 初始化可选择的项目
  useEffect(() => {
    // 生成可选择的项目（10个方块，不重复）
    const allItems = [...(question.reactants || []), ...(question.products || [])];
    // 去重
    const uniqueItems = [...new Set(allItems)];
    // 确保至少有10个项目，如果不够就添加一些常见的化学物质
    const commonSubstances = ['H₂O', 'CO₂', 'O₂', 'H₂', 'Cl₂', 'NaOH', 'HCl', 'H₂SO₄', 'CuO', 'Fe'];
    let items = [...uniqueItems];
    let i = 0;
    while (items.length < 10) {
      if (!items.includes(commonSubstances[i])) {
        items.push(commonSubstances[i]);
      }
      i = (i + 1) % commonSubstances.length;
    }
    // 取前10个项目
    items = items.slice(0, 10);
    // 为每个项目生成唯一ID
    const itemsWithId = items.map((item, index) => ({
      id: `item-${index}`,
      content: item
    }));
    // 随机打乱顺序
    setSelectedItems(itemsWithId.sort(() => Math.random() - 0.5));
    // 初始化方程式项目
    setEquationItems([]);
    // 初始化系数
    setCoefficients({});
  }, [question]);

  // 处理拖放开始
  const handleDragStart = (e: React.DragEvent, itemId: string) => {
    setDraggedItem(itemId);
    let itemContent = '';
    
    // 检查是否是气体符号或沉淀符号
    if (itemId === 'symbol-0') {
      itemContent = '↑';
    } else if (itemId === 'symbol-1') {
      itemContent = '↓';
    } else {
      // 从 selectedItems 中查找拖动的项目
      const item = selectedItems.find(i => i.id === itemId);
      if (item) {
        itemContent = item.content;
      }
    }
    
    if (itemContent && e.dataTransfer && e.currentTarget) {
      // 创建一个临时元素作为拖动图像
      const dragImage = document.createElement('div');
      dragImage.style.position = 'absolute';
      dragImage.style.left = '-9999px';
      dragImage.style.top = '-9999px';
      dragImage.style.padding = '8px';
      dragImage.style.backgroundColor = '#1e293b';
      dragImage.style.color = '#e2e8f0';
      dragImage.style.borderRadius = '8px';
      dragImage.style.border = '1px solid #475569';
      dragImage.textContent = itemContent;
      document.body.appendChild(dragImage);
      
      // 设置拖动图像
      e.dataTransfer.setDragImage(dragImage, 0, 0);
      e.dataTransfer.setData('text/plain', itemContent);
      e.dataTransfer.effectAllowed = 'copy';
      
      // 拖动结束后移除临时元素
      setTimeout(() => {
        document.body.removeChild(dragImage);
      }, 0);
    }
  };

  // 处理拖放结束
  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  // 处理拖放目标
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  // 处理拖放
  const handleDrop = (e: React.DragEvent, isReactant: boolean) => {
    e.preventDefault();
    if (draggedItem) {
      let itemContent = '';
      
      // 检查是否是气体符号或沉淀符号
      if (draggedItem === 'symbol-0') {
        itemContent = '↑';
      } else if (draggedItem === 'symbol-1') {
        itemContent = '↓';
      } else {
        // 从 selectedItems 中查找拖动的项目
        const item = selectedItems.find(i => i.id === draggedItem);
        if (item) {
          itemContent = item.content;
        }
      }
      
      if (itemContent) {
        // 对于气体符号和沉淀符号，不需要检查是否已经存在
        // 直接添加到方程式中
        if (itemContent === '↑' || itemContent === '↓') {
          // 气体符号和沉淀符号只能添加到生成物中
          if (!isReactant) {
            const newItem: EquationItem = {
              id: `eq-${Date.now()}-${Math.random()}`,
              content: itemContent,
              coefficient: '',
              isReactant: false
            };
            setEquationItems([...equationItems, newItem]);
            // 初始化系数状态
            setCoefficients(prev => ({
              ...prev,
              [newItem.id]: {
                value: '',
                hasUserInput: false
              }
            }));
          }
        } else {
          // 对于普通物质，检查是否已经存在相同的物质
          if (!equationItems.some(i => i.content === itemContent)) {
            const newItem: EquationItem = {
              id: `eq-${Date.now()}-${Math.random()}`,
              content: itemContent,
              coefficient: '',
              isReactant
            };
            setEquationItems([...equationItems, newItem]);
            // 初始化系数状态
            setCoefficients(prev => ({
              ...prev,
              [newItem.id]: {
                value: '0',
                hasUserInput: false
              }
            }));
            // 从可选择项目中移除已拖放的项目
            setSelectedItems(selectedItems.filter(i => i.id !== draggedItem));
          }
        }
      }
    }
  };

  // 移除已拖放的项目
  const handleRemoveItem = (id: string) => {
    const item = equationItems.find(i => i.id === id);
    if (item) {
      setEquationItems(equationItems.filter(i => i.id !== id));
      // 对于气体符号和沉淀符号，不需要添加回可选择项目中
      if (item.content !== '↑' && item.content !== '↓') {
        setSelectedItems([...selectedItems, { id: `item-${Date.now()}`, content: item.content }]);
      }
      // 移除对应的系数
      const newCoefficients = { ...coefficients };
      delete newCoefficients[id];
      setCoefficients(newCoefficients);
    }
  };

  // 处理系数变化
  const handleCoefficientChange = (id: string, value: string) => {
    // 移除前导零
    if (value.startsWith('0') && value.length > 1) {
      value = value.replace(/^0+/, '');
    }
    // 如果值为空，设置为 '0'
    if (value === '') {
      value = '0';
    }
    setCoefficients(prev => ({
      ...prev,
      [id]: {
        value: value,
        hasUserInput: value !== '0'
      }
    }));
  };

  // 从正确答案中提取反应条件
  const getReactionCondition = () => {
    const correctAnswer = question.correctAnswer;
    // 常见的反应条件关键词
    const conditionKeywords = ['高温', '加热', '△', '催化剂', '点燃', '通电'];
    
    // 遍历关键词，查找是否存在反应条件
    for (const keyword of conditionKeywords) {
      if (correctAnswer.includes(keyword)) {
        return keyword;
      }
    }
    
    return '';
  };

  // 处理提交
  const handleSubmit = () => {
    // 分离反应物和生成物
    const reactants = equationItems.filter(item => item.isReactant);
    const products = equationItems.filter(item => !item.isReactant);
    
    // 构建方程式
    const reactantStr = reactants
      .map(item => {
        // 对于气体符号和沉淀符号，不需要添加系数
        if (item.content === '↑' || item.content === '↓') {
          return item.content;
        }
        const coeff = coefficients[item.id]?.value || '0';
        return `${coeff === '0' ? '' : coeff}${item.content}`;
      })
      .join(' + ');
    
    const productStr = products
      .map(item => {
        // 对于气体符号和沉淀符号，不需要添加系数
        if (item.content === '↑' || item.content === '↓') {
          return item.content;
        }
        const coeff = coefficients[item.id]?.value || '0';
        return `${coeff === '0' ? '' : coeff}${item.content}`;
      })
      .join(' + ');
    
    // 添加反应条件
    const reactionCondition = getReactionCondition();
    const answer = `${reactantStr} ${reactionCondition ? `${reactionCondition} ` : ''}${'='} ${productStr}`;
    
    const correct = compareEquations(answer, question.correctAnswer);
    setIsCorrect(correct);
    setShowExplanation(true);
  };

  // 处理下一题
  const handleNext = () => {
    onAnswered(isCorrect === true);
    // 重置状态，避免影响下一题
    setShowExplanation(false);
    setIsCorrect(null);
    setEquationItems([]);
    setSelectedItems([]);
    setCoefficients({});
  };

  // 键盘事件监听
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // 阻止空格键的默认滚动行为
      if (e.key === ' ') {
        e.preventDefault();
      }
      // 当未显示解析时，按Enter或空格提交答案
      if (!showExplanation && equationItems.length > 0 && (e.key === 'Enter' || e.key === ' ')) {
        handleSubmit();
      }
      // 当显示解析时，按Enter或空格进入下一题
      else if (showExplanation && (e.key === 'Enter' || e.key === ' ')) {
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [showExplanation, equationItems.length, isCorrect, onAnswered]);

  return (
    <div>
      {/* 题目内容 */}
      <div className="mb-6">
        <h3 className="text-xl font-medium mb-4">{question.content}</h3>
        {getReactionCondition() && (
          <div className="mb-2">
            <span className="text-gray-300">反应条件: </span>
            <span className="text-white">{getReactionCondition()}</span>
          </div>
        )}
      </div>

      {/* 可选择的项目（10个方块） */}
      <div className="mb-6">
        <h4 className="text-lg font-medium mb-2 text-primary">选择反应物和生成物:</h4>
        <div className="grid grid-cols-5 gap-2">
          {selectedItems.map((item) => (
            <div
              key={item.id}
              className="p-2 bg-bg rounded-lg tech-border cursor-move hover:bg-gray-700 transition-colors"
              draggable
              onDragStart={(e) => handleDragStart(e, item.id)}
              onDragEnd={handleDragEnd}
            >
              <p className="text-center text-gray-300">{item.content}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 方程式填空区域 */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <h4 className="text-lg font-medium text-primary">请将选择的项目拖放到对应区域并填入系数:</h4>
          <div className="flex items-center gap-2">
            <span className="text-gray-300">沉淀或气体：</span>
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, 'symbol-0')}
              onDragEnd={handleDragEnd}
              className="px-3 py-2 bg-card rounded-lg border border-gray-700 hover:border-primary cursor-move transition-colors"
            >
              ↑
            </div>
            <div
              draggable
              onDragStart={(e) => handleDragStart(e, 'symbol-1')}
              onDragEnd={handleDragEnd}
              className="px-3 py-2 bg-card rounded-lg border border-gray-700 hover:border-primary cursor-move transition-colors"
            >
              ↓
            </div>
          </div>
        </div>
        
        {/* 反应物区域 */}
        <div 
          className="mb-4 p-4 bg-bg rounded-lg tech-border"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, true)}
        >
          <h5 className="text-md font-medium mb-2 text-gray-300">反应物:</h5>
          <div className="flex flex-wrap gap-2">
            {equationItems
              .filter(item => item.isReactant)
              .map((item) => (
                <div key={item.id} className="flex items-center gap-1">
                  {/* 对于气体符号和沉淀符号，不显示输入框 */}
                  {item.content !== '↑' && item.content !== '↓' && (
                    <input
                      type="text"
                      className={`w-10 p-1 bg-card rounded-lg tech-border text-center ${(!coefficients[item.id] || !coefficients[item.id].hasUserInput) ? 'text-gray-500' : ''}`}
                      value={coefficients[item.id]?.value || '0'}
                      onChange={(e) => handleCoefficientChange(item.id, e.target.value)}
                      onFocus={(e) => {
                        if (!coefficients[item.id] || !coefficients[item.id].hasUserInput) {
                          e.target.value = '';
                          setCoefficients(prev => ({
                            ...prev,
                            [item.id]: {
                              value: '',
                              hasUserInput: true
                            }
                          }));
                        }
                      }}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          setCoefficients(prev => ({
                            ...prev,
                            [item.id]: {
                              value: '0',
                              hasUserInput: false
                            }
                          }));
                        } else if (e.target.value === '0') {
                          setCoefficients(prev => ({
                            ...prev,
                            [item.id]: {
                              value: '0',
                              hasUserInput: false
                            }
                          }));
                        }
                      }}
                    />
                  )}
                  <span className="p-2 bg-card rounded-lg tech-border">{item.content}</span>
                  <button
                    className="text-danger hover:text-red-400"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    ×
                  </button>
                  {equationItems.filter(i => i.isReactant).indexOf(item) < equationItems.filter(i => i.isReactant).length - 1 && <span className="text-gray-300">+</span>}
                </div>
              ))}
            {equationItems.filter(item => item.isReactant).length === 0 && (
              <p className="text-gray-400">请从上方选择反应物拖放到此处</p>
            )}
          </div>
        </div>
        
        {/* 等号 */}
        <div className="flex flex-col items-center mb-4">
          {getReactionCondition() && (
            <span className="text-lg font-medium text-white mb-2">{getReactionCondition()}</span>
          )}
          <span className="text-2xl font-bold text-white">=</span>
        </div>
        
        {/* 生成物区域 */}
        <div 
          className="p-4 bg-bg rounded-lg tech-border"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, false)}
        >
          <h5 className="text-md font-medium mb-2 text-gray-300">生成物:</h5>
          <div className="flex flex-wrap gap-2">
            {equationItems
              .filter(item => !item.isReactant)
              .map((item) => (
                <div key={item.id} className="flex items-center gap-1">
                  {/* 对于气体符号和沉淀符号，不显示输入框 */}
                  {item.content !== '↑' && item.content !== '↓' && (
                    <input
                      type="text"
                      className={`w-10 p-1 bg-card rounded-lg tech-border text-center ${(!coefficients[item.id] || !coefficients[item.id].hasUserInput) ? 'text-gray-500' : ''}`}
                      value={coefficients[item.id]?.value || '0'}
                      onChange={(e) => handleCoefficientChange(item.id, e.target.value)}
                      onFocus={(e) => {
                        if (!coefficients[item.id] || !coefficients[item.id].hasUserInput) {
                          e.target.value = '';
                          setCoefficients(prev => ({
                            ...prev,
                            [item.id]: {
                              value: '',
                              hasUserInput: true
                            }
                          }));
                        }
                      }}
                      onBlur={(e) => {
                        if (!e.target.value) {
                          setCoefficients(prev => ({
                            ...prev,
                            [item.id]: {
                              value: '0',
                              hasUserInput: false
                            }
                          }));
                        } else if (e.target.value === '0') {
                          setCoefficients(prev => ({
                            ...prev,
                            [item.id]: {
                              value: '0',
                              hasUserInput: false
                            }
                          }));
                        }
                      }}
                    />
                  )}
                  <span className="p-2 bg-card rounded-lg tech-border">{item.content}</span>
                  <button
                    className="text-danger hover:text-red-400"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    ×
                  </button>
                  {equationItems.filter(_ => !item.isReactant).indexOf(item) < equationItems.filter(_ => !item.isReactant).length - 1 && <span className="text-gray-300">+</span>}
                </div>
              ))}
            {equationItems.filter(item => !item.isReactant).length === 0 && (
              <p className="text-gray-400">请从上方选择生成物拖放到此处</p>
            )}
          </div>
        </div>
      </div>

      {/* 提示按钮 */}
      {question.hints && question.maxHints && (
        <HintButton
          hints={question.hints}
        />
      )}

      {/* 提交按钮 */}
      {!showExplanation && (
        <button
          className={`w-full py-3 rounded-lg font-medium transition-all ${equationItems.length > 0 ? 'bg-primary hover:bg-blue-600 text-white' : 'bg-gray-600 text-gray-300 cursor-not-allowed'}`}
          onClick={handleSubmit}
          disabled={equationItems.length === 0}
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
            <div className="p-3 bg-bg rounded-lg" dangerouslySetInnerHTML={{ __html: equationToHtml(question.correctAnswer) }} />
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

export default EquationMemoryGame;