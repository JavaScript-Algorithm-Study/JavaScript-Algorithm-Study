const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, board) {
  const objPos = [];
  const tPos = [];
  const sPos = [];

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 'X') objPos.push([i, j]);
      else if (board[i][j] === 'T') tPos.push([i, j]);
      else if (board[i][j] === 'S') sPos.push([i, j]);
      else continue;
    }
  }

  const cases = [];

  function combination(arr, depth) {
    if (arr.length === 3) {
      cases.push(arr);
      return;
    }

    for (let i = depth; i < objPos.length; i++) {
      combination([...arr, objPos[i]], i + 1);
    }
  }

  combination([], 0);

  const dy = [0, 0, -1, 1];
  const dx = [-1, 1, 0, 0];

  for (let i = 0; i < cases.length; i++) {
    const tempBoard = JSON.parse(JSON.stringify(board));
    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    for (let k = 0; k < 3; k++) {
      const [oY, oX] = cases[i][k];
      tempBoard[oY][oX] = 'O';
    }

    for (let j = 0; j < tPos.length; j++) {
      let [tY, tX] = tPos[j];
      visited[tY][tX] = true;

      for (let l = 0; l < 4; l++) {
        let dist = 1;
        while (true) {
          const ny = tY + dy[l] * dist;
          const nx = tX + dx[l] * dist;
          if (ny < 0 || ny >= n || nx < 0 || nx >= n) break;
          if (tempBoard[ny][nx] === 'O') break;
          visited[ny][nx] = true;

          dist += 1;
        }
      }
    }

    let isStudent = false;
    for (let s = 0; s < sPos.length; s++) {
      const [sY, sX] = sPos[s];
      if (visited[sY][sX] === true) isStudent = true;
    }

    if (!isStudent) return 'YES';
  }

  return 'NO';
}

const n = Number(input[0]);
const board = input.slice(1, n + 1).map((row) => row.trim().split(' '));
console.log(solution(n, board));
