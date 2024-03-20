const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(N, equation, values) {
  const OPERATORS = {
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '-': (a, b) => a - b,
    '+': (a, b) => a + b,
  };

  const stack = [];

  equation.forEach((char) => {
    if (!/[*+/-]/.test(char)) {
      stack.push(char);
      return;
    }

    const [operand2, operand1] = [stack.pop(), stack.pop()].map((value) =>
      isNumber(value) ? value : values[toValuesIndex(value)]
    );

    stack.push(OPERATORS[char](operand1, operand2));
  });

  return stack.reduce((acc, cur) => acc + cur, 0).toFixed(2);

  function isNumber(value) {
    return typeof value === 'number';
  }

  function toValuesIndex(alphabet) {
    return alphabet.charCodeAt(0) - 'A'.charCodeAt(0);
  }
}

const N = Number(input.shift());
const equation = input.shift().split('');
const values = input.map((line) => Number(line));
console.log(solution(N, equation, values));
