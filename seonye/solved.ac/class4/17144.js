const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(r, c, t, board) {
  let pos = [];

  for (let i = 0; i < r; i++) {
    for (let j = 0; j < c; j++) {
      if (board[i][j] === -1) {
        pos.push([i, j].join('_'));
      }
    }
  }

  function spreadDust(curBoard) {
    let tempBoard = JSON.parse(JSON.stringify(curBoard));
    const dirX = [0, 1, 0, -1];
    const dirY = [1, 0, -1, 0];

    for (let i = 0; i < r; i++) {
      for (let j = 0; j < c; j++) {
        if (curBoard[i][j] <= 0) continue;
        const spreadAmount = parseInt(curBoard[i][j] / 5);
        let spreadCnt = 0;
        for (let k = 0; k < 4; k++) {
          const nX = j + dirX[k];
          const nY = i + dirY[k];
          if (nX < 0 || nX >= c || nY < 0 || nY >= r) continue;
          if (pos.includes(`${nY}_${nX}`)) continue;
          tempBoard[nY][nX] += spreadAmount;
          spreadCnt += 1;
        }
        tempBoard[i][j] -= spreadAmount * spreadCnt;
      }
    }

    return tempBoard;
  }

  function rotateUpper() {
    const upperCleaner = pos[0].split('_').map(Number);
    for (let row = upperCleaner[0] - 2; row >= 0; row--) {
      board[row + 1][0] = board[row][0];
    }

    for (let col = 1; col < c; col++) {
      board[0][col - 1] = board[0][col];
    }

    for (let row = 1; row <= upperCleaner[0]; row++) {
      board[row - 1][c - 1] = board[row][c - 1];
    }

    for (let col = c - 2; col > 0; col--) {
      board[upperCleaner[0]][col + 1] = board[upperCleaner[0]][col];
    }

    board[upperCleaner[0]][1] = 0;
  }

  function rotateDown() {
    const downCleaner = pos[1].split('_').map(Number);
    for (let row = downCleaner[0] + 2; row < r; row++) {
      board[row - 1][0] = board[row][0];
    }

    for (let col = 1; col < c; col++) {
      board[r - 1][col - 1] = board[r - 1][col];
    }

    for (let row = r - 2; row >= downCleaner[0]; row--) {
      board[row + 1][c - 1] = board[row][c - 1];
    }

    for (let col = c - 2; col > 0; col--) {
      board[downCleaner[0]][col + 1] = board[downCleaner[0]][col];
    }

    board[downCleaner[0]][1] = 0;
  }

  while (t-- > 0) {
    board = spreadDust(board);
    rotateUpper();
    rotateDown();
  }

  return board.map((row) => row.filter((cell) => cell > 0).reduce((a, b) => a + b, 0)).reduce((a, b) => a + b, 0);
}

const [r, c, t] = input[0].split(' ').map(Number);
const board = input.slice(1).map((row) => row.split(' ').map(Number));
console.log(solution(r, c, t, board));
