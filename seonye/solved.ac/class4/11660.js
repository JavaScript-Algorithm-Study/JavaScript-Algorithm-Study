const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, m, numbers, cases) {
  const answer = [];
  const dp = Array.from({ length: n + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        dp[i - 1][j] + dp[i][j - 1] - dp[i - 1][j - 1] + numbers[i - 1][j - 1];
    }
  }

  dp[1][1] = numbers[0][0];

  for (let i = 0; i < m; i++) {
    let sum = 0;
    const [x1, y1, x2, y2] = cases[i];

    sum = dp[x2][y2] - dp[x2][y1 - 1] - dp[x1 - 1][y2] + dp[x1 - 1][y1 - 1];
    answer.push(sum);
  }

  return answer.join('\n');
}

const [n, m] = input[0].split(' ').map(Number);
const numbers = input.slice(1, n + 1).map((row) => row.split(' ').map(Number));
const cases = input
  .slice(n + 1, n + m + 1)
  .map((c) => c.split(' ').map(Number));

console.log(solution(n, m, numbers, cases));
