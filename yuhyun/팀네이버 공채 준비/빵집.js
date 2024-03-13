const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(R, C, board) {
  const BLOCK = 'x';

  const PIPELINE_DIRECTIONS = [
    [-1, 1],
    [0, 1],
    [1, 1],
  ];

  const visited = Array.from(Array(R), () => Array(C).fill(false));

  let result = 0;
  for (let row = 0; row < R; row += 1) {
    visited[row][0] = true;
    if (dfs([row, 0], board, visited)) {
      result += 1;
    }
  }

  return result;

  function dfs([row, col], board, visited) {
    if (col === C - 1) {
      return true;
    }

    for (const dirCoord of PIPELINE_DIRECTIONS) {
      const [nextRow, nextCol] = sumCoord([row, col], dirCoord);

      if (
        outOfRange(nextRow, nextCol) ||
        board[nextRow][nextCol] === BLOCK ||
        visited[nextRow][nextCol]
      ) {
        continue;
      }

      visited[nextRow][nextCol] = true;
      if (dfs([nextRow, nextCol], board, visited)) {
        return true;
      }
    }

    return false;
  }

  function sumCoord(coordA, coordB) {
    const ROW = 0;
    const COL = 1;
    return [coordA[ROW] + coordB[ROW], coordA[COL] + coordB[COL]];
  }

  function outOfRange(row, col) {
    return row < 0 || col < 0 || row >= R || col >= C;
  }
}

const [R, C] = input.shift().split(' ').map(Number);
const board = input.map((line) => line.split(''));
console.log(solution(R, C, board));
