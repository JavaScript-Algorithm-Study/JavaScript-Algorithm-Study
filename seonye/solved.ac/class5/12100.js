const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(N, board) {
  let answer = 0;

  function getMax(board) {
    let res = 0;
    for (let row of board) {
      for (let cell of row) {
        res = Math.max(res, cell);
      }
    }
    return res;
  }

  function moveRight(board) {
    let check = Array.from({ length: N }, () => Array(N).fill(false));

    for (let i = 0; i < N; i++) {
      for (let j = N - 2; j >= 0; j--) {
        if (board[i][j] === 0) continue;
        for (let k = j + 1; k < N; k++) {
          if (board[i][k] === board[i][k - 1] && !check[i][k]) {
            board[i][k] *= 2;
            board[i][k - 1] = 0;
            check[i][k] = true;
            break;
          } else if (board[i][k] === 0) {
            board[i][k] = board[i][k - 1];
            board[i][k - 1] = 0;
          } else {
            break;
          }
        }
      }
    }
    return board;
  }

  function moveLeft(board) {
    let check = Array.from({ length: N }, () => Array(N).fill(false));

    for (let i = 0; i < N; i++) {
      for (let j = 1; j < N; j++) {
        if (board[i][j] === 0) continue;
        for (let k = j - 1; k >= 0; k--) {
          if (board[i][k] === board[i][k + 1] && !check[i][k]) {
            board[i][k] *= 2;
            board[i][k + 1] = 0;
            check[i][k] = true;
            break;
          } else if (board[i][k] === 0) {
            board[i][k] = board[i][k + 1];
            board[i][k + 1] = 0;
          } else {
            break;
          }
        }
      }
    }
    return board;
  }

  function moveDown(board) {
    let check = Array.from({ length: N }, () => Array(N).fill(false));

    for (let i = 0; i < N; i++) {
      for (let j = N - 2; j >= 0; j--) {
        if (board[j][i] === 0) continue;
        for (let k = j + 1; k < N; k++) {
          if (board[k][i] === board[k - 1][i] && !check[k][i]) {
            board[k][i] *= 2;
            board[k - 1][i] = 0;
            check[k][i] = true;
            break;
          } else if (board[k][i] === 0) {
            board[k][i] = board[k - 1][i];
            board[k - 1][i] = 0;
          } else {
            break;
          }
        }
      }
    }
    return board;
  }

  function moveUp(board) {
    let check = Array.from({ length: N }, () => Array(N).fill(false));

    for (let i = 0; i < N; i++) {
      for (let j = 1; j < N; j++) {
        if (board[j][i] === 0) continue;
        for (let k = j - 1; k >= 0; k--) {
          if (board[k][i] === board[k + 1][i] && !check[k][i]) {
            board[k][i] *= 2;
            board[k + 1][i] = 0;
            check[k][i] = true;
            break;
          } else if (board[k][i] === 0) {
            board[k][i] = board[k + 1][i];
            board[k + 1][i] = 0;
          } else {
            break;
          }
        }
      }
    }
    return board;
  }

  function dfs(cnt, board) {
    answer = Math.max(answer, getMax(board));
    if (cnt === 5) return;
    dfs(cnt + 1, moveRight(board));
    dfs(cnt + 1, moveLeft(board));
    dfs(cnt + 1, moveUp(board));
    dfs(cnt + 1, moveDown(board));
  }

  dfs(0, board);

  console.log(answer);
}

const N = Number(input[0]);
const board = input
  .slice(1, 1 + N)
  .map((row) => row.trim().split(' ').map(Number));

solution(N, board);
