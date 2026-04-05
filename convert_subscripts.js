import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 读取题库文件
const filePath = path.join(__dirname, 'src', 'data', 'questions.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 正则表达式：匹配化学式中的数字（不是系数）
// 系数通常在化学式前，用空格或符号分隔
// 化学式中的数字通常跟在元素符号后面
const regex = /([A-Z][a-z]?)(\d+)/g;

// 替换数字为下角标
content = content.replace(regex, (match, element, number) => {
  // 将数字转换为下角标
  const subscriptNumber = number.split('').map(digit => {
    const subscriptMap = {
      '0': '₀',
      '1': '₁',
      '2': '₂',
      '3': '₃',
      '4': '₄',
      '5': '₅',
      '6': '₆',
      '7': '₇',
      '8': '₈',
      '9': '₉'
    };
    return subscriptMap[digit] || digit;
  }).join('');
  return element + subscriptNumber;
});

// 写回文件
fs.writeFileSync(filePath, content, 'utf8');

console.log('转换完成！所有化学式中的数字已转换为下角标。');
