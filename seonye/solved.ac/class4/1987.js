const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(R, C, board) {
  const dx = [0, 1, 0, -1];
  const dy = [-1, 0, 1, 0];

  function check(x, y) {
    if (x < 0 || x >= C || y < 0 || y >= R) return false;
    return true;
  }

  let answer = 0;
  let visited = new Array(26).fill(false);
  visited[board[0][0].charCodeAt() - 65] = true;

  function dfs(depth, x, y) {
    answer = Math.max(answer, depth);

    for (let i = 0; i < 4; i++) {
      let nx = x + dx[i];
      let ny = y + dy[i];
      if (!check(nx, ny)) continue;
      const code = board[ny][nx].charCodeAt() - 65;
      if (!visited[code]) {
        visited[code] = true;
        dfs(depth + 1, nx, ny);
        visited[code] = false;
      }
    }
  }

  dfs(1, 0, 0);

  return answer;
}

const [R, C] = input[0].split(' ').map(Number);
const board = input.splice(1, R).map((r) => r.trim().split(''));

console.log(solution(R, C, board));
