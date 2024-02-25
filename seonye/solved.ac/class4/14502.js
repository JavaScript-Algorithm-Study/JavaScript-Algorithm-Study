const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(N, M, board) {
  const dx = [-1, 0, 1, 0];
  const dy = [0, 1, 0, -1];
  let temp = [];

  let result = 0;

  function virus(x, y) {
    for (let i = 0; i < 4; i++) {
      const nx = x + dx[i];
      const ny = y + dy[i];

      if (nx >= 0 && nx < M && ny >= 0 && ny < N) {
        if (temp[ny][nx] === 0) {
          temp[ny][nx] = 2;
          virus(nx, ny);
        }
      }
    }
  }

  function getScore() {
    let score = 0;
    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (temp[i][j] === 0) score += 1;
      }
    }
    return score;
  }

  function dfs(count) {
    if (count === 3) {
      temp = JSON.parse(JSON.stringify(board));

      for (let i = 0; i < N; i++) {
        for (let j = 0; j < M; j++) {
          if (temp[i][j] === 2) virus(j, i);
        }
      }

      result = Math.max(result, getScore());
      return;
    }

    for (let i = 0; i < N; i++) {
      for (let j = 0; j < M; j++) {
        if (board[i][j] === 0) {
          board[i][j] = 1;
          count += 1;
          dfs(count);
          board[i][j] = 0;
          count -= 1;
        }
      }
    }
  }

  dfs(0);

  return result;
}

const [N, M] = input[0].trim().split(' ').map(Number);
const board = input
  .slice(1, 1 + N)
  .map((row) => row.trim().split(' ').map(Number));

console.log(solution(N, M, board));
