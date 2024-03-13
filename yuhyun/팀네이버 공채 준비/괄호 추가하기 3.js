const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(N, equation) {
  const SIGN_FN = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
  };

  const minDP = Array.from(Array(N), () => Array(N).fill(null));
  const maxDP = Array.from(Array(N), () => Array(N).fill(null));
  for (let index = 0; index < equation.length; index += 2) {
    minDP[index][index] = equation[index];
    maxDP[index][index] = equation[index];
  }

  calc(0, equation.length - 1);
  return maxDP[0][equation.length - 1];

  function calc(start, end) {
    if (minDP[start][end] !== null) {
      return;
    }

    for (let mid = start + 1; mid < end; mid += 2) {
      calc(start, mid - 1);
      calc(mid + 1, end);

      const sign = equation[mid];
      const result = [];
      result.push(SIGN_FN[sign](minDP[start][mid - 1], minDP[mid + 1][end]));
      result.push(SIGN_FN[sign](minDP[start][mid - 1], maxDP[mid + 1][end]));
      result.push(SIGN_FN[sign](maxDP[start][mid - 1], minDP[mid + 1][end]));
      result.push(SIGN_FN[sign](maxDP[start][mid - 1], maxDP[mid + 1][end]));

      result.sort((a, b) => a - b);
      minDP[start][end] = Math.min(minDP[start][end] ?? result[0], result[0]);
      maxDP[start][end] = Math.max(maxDP[start][end] ?? result.at(-1), result.at(-1));
    }
  }
}

const N = Number(input[0]);
const equation = input[1].split('').map((v, index) => (index % 2 === 0 ? Number(v) : v));
console.log(solution(N, equation));
