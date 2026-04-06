// 系数与角标判断逻辑

/**
 * 标准化化学方程式，将上标转换为普通数字，忽略空格和大小写
 * @param input 用户输入的化学方程式
 * @returns 标准化后的化学方程式
 */
export function normalizeEquation(input: string): string {
  // 移除所有空格
  let normalized = input.replace(/\s/g, '');
  
  // 转换上标数字
  const superscriptMap: { [key: string]: string } = {
    '⁰': '0', '¹': '1', '²': '2', '³': '3', '⁴': '4',
    '⁵': '5', '⁶': '6', '⁷': '7', '⁸': '8', '⁹': '9'
  };
  
  for (const [superscript, normal] of Object.entries(superscriptMap)) {
    normalized = normalized.replace(new RegExp(superscript, 'g'), normal);
  }
  
  // 转换大小写（统一为小写，然后根据需要调整）
  // 这里我们保持元素符号的首字母大写，其他小写
  normalized = normalized.replace(/[a-zA-Z]+/g, (match) => {
    if (match.length === 1) {
      return match.toUpperCase();
    } else {
      return match[0].toUpperCase() + match.slice(1).toLowerCase();
    }
  });
  
  return normalized;
}

/**
 * 移除化学方程式中的气体和沉淀符号
 * @param equation 化学方程式
 * @returns 移除符号后的方程式
 */
export function removeStateSymbols(equation: string): string {
  // 移除气体符号 ↑
  let result = equation.replace(/↑/g, '');
  // 移除沉淀符号 ↓
  result = result.replace(/↓/g, '');
  return result;
}

/**
 * 比较两个化学方程式是否相等
 * @param input 用户输入的化学方程式
 * @param correctAnswer 正确的化学方程式
 * @returns 是否相等
 */
export function compareEquations(input: string, correctAnswer: string): boolean {
  // 标准化化学方程式
  const normalizedInput = normalizeEquation(input);
  const normalizedCorrect = normalizeEquation(correctAnswer);
  
  // 提取反应物和生成物
  function extractReactantsAndProducts(equation: string) {
    // 处理不同类型的方程式分隔符
    let reactants: string[] = [];
    let products: string[] = [];
    
    // 尝试不同的分隔符
    const separators = ['=', '→', '→', '⇒', '⇨'];
    let foundSeparator = false;
    
    for (const separator of separators) {
      if (equation.includes(separator)) {
        const parts = equation.split(separator);
        if (parts.length === 2) {
          // 提取反应物并移除系数和状态符号
          reactants = parts[0].split('+').map(item => {
            // 移除系数（只移除开头的数字）
            let cleanedItem = item.trim().replace(/^\d+/, '');
            // 移除气体和沉淀符号
            cleanedItem = cleanedItem.replace(/[↑↓]/g, '');
            return cleanedItem;
          }).filter(item => item);
          
          // 提取生成物并移除系数和状态符号
          products = parts[1].split('+').map(item => {
            // 移除系数（只移除开头的数字）
            let cleanedItem = item.trim().replace(/^\d+/, '');
            // 移除气体和沉淀符号
            cleanedItem = cleanedItem.replace(/[↑↓]/g, '');
            return cleanedItem;
          }).filter(item => item);
          
          foundSeparator = true;
          break;
        }
      }
    }
    
    if (!foundSeparator) {
      // 如果没有找到分隔符，返回空数组
      return { reactants: [], products: [] };
    }
    
    return { reactants, products };
  }
  
  // 提取反应物和生成物
  const inputParts = extractReactantsAndProducts(normalizedInput);
  const correctParts = extractReactantsAndProducts(normalizedCorrect);
  
  // 检查反应物和生成物的数量是否相同
  if (inputParts.reactants.length !== correctParts.reactants.length || 
      inputParts.products.length !== correctParts.products.length) {
    return false;
  }
  
  // 检查反应物是否相同（不考虑顺序）
  const sortedInputReactants = [...inputParts.reactants].sort();
  const sortedCorrectReactants = [...correctParts.reactants].sort();
  
  for (let i = 0; i < sortedInputReactants.length; i++) {
    if (sortedInputReactants[i] !== sortedCorrectReactants[i]) {
      return false;
    }
  }
  
  // 检查生成物是否相同（不考虑顺序）
  const sortedInputProducts = [...inputParts.products].sort();
  const sortedCorrectProducts = [...correctParts.products].sort();
  
  for (let i = 0; i < sortedInputProducts.length; i++) {
    if (sortedInputProducts[i] !== sortedCorrectProducts[i]) {
      return false;
    }
  }
  
  return true;
}

/**
 * 解析化学方程式中的系数
 * @param equation 化学方程式
 * @returns 解析后的系数数组
 */
export function parseCoefficients(equation: string): number[] {
  const normalized = normalizeEquation(equation);
  const parts = normalized.split(/[+→]/).filter(part => part.trim() !== '');
  const coefficients: number[] = [];
  
  for (const part of parts) {
    // 提取系数（如果没有系数，默认为1）
    const match = part.match(/^\d+/);
    if (match) {
      coefficients.push(parseInt(match[0], 10));
    } else {
      coefficients.push(1);
    }
  }
  
  return coefficients;
}

/**
 * 验证填补空缺题目的答案
 * @param userAnswers 用户输入的答案数组
 * @param correctAnswers 正确的答案数组
 * @returns 是否全部正确
 */
export function validateFillBlankAnswers(userAnswers: string[], correctAnswers: string[]): boolean {
  if (userAnswers.length !== correctAnswers.length) {
    return false;
  }
  
  for (let i = 0; i < userAnswers.length; i++) {
    const normalizedUser = normalizeEquation(userAnswers[i]);
    const normalizedCorrect = normalizeEquation(correctAnswers[i]);
    if (normalizedUser !== normalizedCorrect) {
      return false;
    }
  }
  
  return true;
}

/**
 * 生成化学方程式的HTML表示，包含上标
 * @param equation 化学方程式
 * @returns HTML字符串
 */
export function equationToHtml(equation: string): string {
  let html = equation;
  
  // 将数字转换为上标（角标）
  html = html.replace(/([A-Za-z])(\d+)/g, '$1<sup>$2</sup>');
  
  // 保持系数为普通数字
  // 这里我们假设系数在化合物前面，且与化合物之间没有空格
  
  return html;
}

/**
 * 从HTML字符串解析化学方程式
 * @param html HTML字符串
 * @returns 化学方程式
 */
export function htmlToEquation(html: string): string {
  let equation = html;
  
  // 移除HTML标签
  equation = equation.replace(/<[^>]+>/g, '');
  
  return equation;
}