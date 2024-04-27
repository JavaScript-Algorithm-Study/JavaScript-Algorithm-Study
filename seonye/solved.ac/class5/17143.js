const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(r, c, info) {
  let board = Array.from({ length: r + 1 }, () => new Array(c + 1).fill(0));
  const sharks = new Map();
  const RESET_R_MOVE = (r - 1) * 2;
  const RESET_C_MOVE = (c - 1) * 2;

  for (let [r, c, s, d, z] of info) {
    const sharkCode = `${r}_${c}`;
    board[r][c] = sharkCode;
    d = d - 1 === 1 ? 2 : d - 1 === 2 ? 1 : d - 1;
    sharks.set(sharkCode, {
      s: d === 0 || d === 2 ? s % RESET_R_MOVE : s % RESET_C_MOVE,
      d,
      z,
    });
  }

  let cur = 0;
  let sharkSum = 0;

  const dir = [
    [0, -1],
    [1, 0],
    [0, 1],
    [-1, 0],
  ];

  function moveShark(board) {
    const newBoard = Array.from({ length: r + 1 }, () =>
      new Array(c + 1).fill(0)
    );

    for (let i = 1; i <= r; i++) {
      for (let j = 1; j <= c; j++) {
        let ny = i;
        let nx = j;
        if (board[i][j] !== 0) {
          const sharkCode = board[i][j];
          let { s, d, z } = sharks.get(sharkCode);

          while (s > 0) {
            const [dx, dy] = dir[d];

            if (ny + dy < 1 || ny + dy > r || nx + dx < 1 || nx + dx > c) {
              d = (d + 2) % 4;
              sharks.get(sharkCode).d = d;
              continue;
            }

            ny += dy;
            nx += dx;
            s -= 1;
          }
          if (newBoard[ny][nx] === 0 || z > sharks.get(newBoard[ny][nx]).z) {
            newBoard[ny][nx] = sharkCode;
          }
        }
      }
    }

    return newBoard;
  }

  while (cur < c) {
    cur += 1;

    for (let i = 1; i <= r; i++) {
      if (board[i][cur] !== 0) {
        const sharkCode = board[i][cur];

        sharkSum += sharks.get(sharkCode).z;
        board[i][cur] = 0;
        sharks.delete(sharkCode);
        break;
      }
    }

    board = moveShark(board);
  }

  return sharkSum;
}

const [r, c, m] = input[0].split(' ').map(Number);
const info = input.slice(1).map((row) => row.split(' ').map(Number));
console.log(solution(r, c, info));
