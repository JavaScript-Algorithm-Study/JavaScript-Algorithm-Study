const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(R, C, N, board) {
  const EMPTY = '.';
  const BOMB = 'O';

  let time = 0;
  const installedTimeBoard = Array.from(Array(R), () => Array(C).fill(null));
  board.forEach((row, rowIndex) =>
    row.forEach((cell, colIndex) => {
      if (cell === BOMB) {
        installedTimeBoard[rowIndex][colIndex] = time;
      }
    })
  );

  time += 1;

  while (time < N) {
    time += 1;
    installBombs(time);

    if (time < N) {
      time += 1;
      explode(time);
    }
  }

  return board.map((line) => line.join('')).join('\n');

  function installBombs(time) {
    board.forEach((row, rowIndex) =>
      row.forEach((cell, colIndex) => {
        if (cell === BOMB) {
          return;
        }

        board[rowIndex][colIndex] = BOMB;
        installedTimeBoard[rowIndex][colIndex] = time;
      })
    );
  }

  function explode(time) {
    const DURATION = 3;
    const DIRECTIONS = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    const explodedBombs = [];

    board.forEach((row, rowIndex) =>
      row.forEach((cell, colIndex) => {
        if (
          cell === EMPTY ||
          (installedTimeBoard[rowIndex][colIndex] &&
            installedTimeBoard[rowIndex][colIndex] + DURATION !== time)
        ) {
          return;
        }

        explodedBombs.push([rowIndex, colIndex]);
      })
    );

    explodedBombs.forEach(([row, col]) => {
      [[row, col], ...DIRECTIONS.map(([dr, dc]) => [row + dr, col + dc])]
        .filter(([row, col]) => !outOfRange(row, col))
        .forEach(([row, col]) => {
          board[row][col] = EMPTY;
          installedTimeBoard[row][col] = null;
        });
    });
  }

  function outOfRange(row, col) {
    return row < 0 || row >= R || col < 0 || col >= C;
  }
}

const [R, C, N] = input.shift().split(' ').map(Number);
const board = input.map((line) => line.split(''));
console.log(solution(R, C, N, board));
