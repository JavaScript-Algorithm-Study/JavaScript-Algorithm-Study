//https://www.acmicpc.net/problem/2667

const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, houses) {
  const answer = [];

  function dfs(y, x) {
    if (y < 0 || y >= n || x < 0 || x >= n) return 0;
    if (houses[y][x] === 0) return 0;
    if (houses[y][x] >= 1) {
      houses[y][x] -= 1;
      let result = 1;
      result += dfs(y - 1, x);
      result += dfs(y, x - 1);
      result += dfs(y + 1, x);
      result += dfs(y, x + 1);
      return result;
    }

    return 0;
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (houses[i][j] === 0) continue;
      answer.push(dfs(i, j));
    }
  }

  return [answer.length, ...answer.sort((a, b) => a - b)].join('\n');
}

const n = Number(input[0]);
const houses = input.slice(1, n + 1).map((row) => row.split('').map(Number));

console.log(solution(n, houses));
