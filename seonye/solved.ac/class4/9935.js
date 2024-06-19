const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(s, bomb) {
  const bombLen = bomb.length;
  let stack = [];

  for (let i = 0; i < s.length; i++) {
    stack.push(s[i]);
    if (s[i] === bomb[bombLen - 1]) {
      const str = stack.slice(-bombLen);
      if (str.join('') === bomb) stack.splice(-bombLen);
    }
  }

  return stack.length ? stack.join('') : 'FRULA';
}

const s = input[0].trim().split('');
const bomb = input[1];
console.log(solution(s, bomb));
