const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(sudoku) {
  function check(x, y, sudoku, k) {
    for (let i = 0; i < 9; i++) if (sudoku[y][i] === k) return false;
    for (let i = 0; i < 9; i++) if (sudoku[i][x] === k) return false;

    let startX = Math.floor(x / 3) * 3;
    let startY = Math.floor(y / 3) * 3;
    for (let i = startY; i < startY + 3; i++) {
      for (let j = startX; j < startX + 3; j++) {
        if (sudoku[i][j] === k) return false;
      }
    }
    return true;
  }

  function solveSudoku(sudoku) {
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (sudoku[i][j] === 0) {
          for (let k = 1; k <= 9; k++) {
            if (check(j, i, sudoku, k)) {
              sudoku[i][j] = k;
              if (solveSudoku(sudoku)) return true;
              sudoku[i][j] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  }

  if (solveSudoku(sudoku)) {
    sudoku.forEach((row) => console.log(row.join('')));
    return sudoku;
  } else {
    console.log(0);
    return 0;
  }
}

const sudoku = input.map((row) => row.trim().split('').map(Number));
solution(sudoku);
