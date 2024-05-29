const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, m, memory, cost) {
  const totalCost = cost.reduce((a, b) => a + b, 1);

  let dp = Array.from({ length: totalCost }, () => Array(n + 1).fill(0));

  for (let j = 1; j <= n; j++) {
    for (let i = 0; i < totalCost; i++) {
      if (i >= cost[j]) {
        dp[i][j] = Math.max(memory[j] + dp[i - cost[j]][j - 1], dp[i][j - 1]);
      } else {
        dp[i][j] = dp[i][j - 1];
      }
    }
  }

  for (let i = 0; i < totalCost; i++) {
    if (dp[i][n] >= m) {
      return i;
    }
  }

  return -1;
}

const [n, m] = input[0].split(' ').map(Number);
const memory = [0, ...input[1].split(' ').map(Number)];
const cost = [0, ...input[2].split(' ').map(Number)];

console.log(solution(n, m, memory, cost));
