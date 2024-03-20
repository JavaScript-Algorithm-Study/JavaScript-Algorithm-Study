const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(N, board) {
  const TEACHER = 'T';
  const BLOCK = 'O';
  const STUDENT = 'S';
  const EMPTY = 'X';

  const N_NEW_BLOCKS = 3;

  const directions = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const teachers = [];
  const blocks = [];
  board.forEach((row, rowIndex) =>
    row.forEach((col, colIndex) => {
      const coord = [rowIndex, colIndex];
      switch (col) {
        case TEACHER:
          teachers.push(coord);
          break;

        case EMPTY:
          blocks.push(coord);
          break;
      }
    })
  );

  const result = getCombinations(N_NEW_BLOCKS, blocks).some((newBlocks) => {
    newBlocks.forEach(([row, col]) => {
      board[row][col] = BLOCK;
    });

    const curCanSeeStudent = canSeeStudent(N, teachers, board);

    newBlocks.forEach(([row, col]) => {
      board[row][col] = EMPTY;
    });

    return !curCanSeeStudent;
  });

  return result ? 'YES' : 'NO';

  function canSeeStudent(N, teachers, board) {
    const visited = Array.from(Array(N), () => Array(N).fill(false));

    for (const [row, col] of teachers) {
      visited[row][col] = true;

      for (const [dr, dc] of directions) {
        let nr = row + dr;
        let nc = col + dc;

        while (!outOfRange(nr, nc, N) && board[nr][nc] !== BLOCK) {
          if (!visited[nr][nc]) {
            visited[nr][nc] = true;
          }

          if (board[nr][nc] === STUDENT) {
            return true;
          }

          nr += dr;
          nc += dc;
        }
      }
    }

    return false;
  }

  function outOfRange(row, col, N) {
    return row < 0 || col < 0 || row >= N || col >= N;
  }

  function getCombinations(nPick, array) {
    if (nPick === 1) {
      return array.map((v) => [v]);
    }

    return array.flatMap((selectedItem, index) => {
      const combinations = getCombinations(nPick - 1, array.slice(index + 1));
      return combinations.map((combination) => [selectedItem, ...combination]);
    });
  }
}

const N = Number(input.shift());
const board = input.map((line) => line.split(' '));
console.log(solution(N, board));
