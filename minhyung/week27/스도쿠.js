//https://www.acmicpc.net/problem/2239
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
103000509
002109400
000704000
300502006
060000050
700803004
000401000
009205800
804000107
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split("").map(Number)))();

const GRID_SIZE = 3;
const BOARD_SIZE = 9;
const EMPTY = 0;

// 가로 세로 중복 확인
function isDuplicateOfRowCol(board, row, col, checkValue) {
  for (let i = 0; i < BOARD_SIZE; i++) {
    if (board[row][i] === checkValue) return true;
    if (board[i][col] === checkValue) return true;
  }
  return false;
}
// 9칸 중복 확인
function isDuplicateOfGrid(board, row, col, checkValue) {
  const startRow = (Math.floor(row / 3) % 3) * 3;
  const startCol = (Math.floor(col / 3) % 3) * 3;

  for (let i = startRow; i < startRow + GRID_SIZE; i++) {
    for (let j = startCol; j < startCol + GRID_SIZE; j++) {
      if (board[i][j] === checkValue) {
        return true;
      }
    }
  }

  return false;
}
function canUseNumberOnBoard(board, row, col, checkValue) {
  const nowDuplicateOfRowCol = isDuplicateOfRowCol(board, row, col, checkValue);
  const nowDuplicateOfGrid = isDuplicateOfGrid(board, row, col, checkValue);

  if (!nowDuplicateOfRowCol && !nowDuplicateOfGrid) {
    return true;
  } else {
    return false;
  }
}

function solution(board) {
  let result = [];
  let end = false;

  const sudoku = (row, col) => {
    if (end) {
      return;
    }

    if (col === BOARD_SIZE) {
      row += 1;
      col = 0;
    }

    if (row === BOARD_SIZE) {
      end = true;
      result = board.map((row) => [...row]);
      return;
    }

    if (board[row][col] !== EMPTY) {
      return sudoku(row, col + 1);
    }

    // 1 ~ 9의 숫자를 넣을 수 있다면 넣음.
    for (let i = 1; i <= BOARD_SIZE; i++) {
      // 만약 중복되지 않았다면 진행함
      if (canUseNumberOnBoard(board, row, col, i)) {
        board[row][col] = i;

        sudoku(row, col + 1);

        board[row][col] = EMPTY;
      }
    }
  };

  sudoku(0, 0);

  return result.map((row) => row.join("")).join("\n");
}

const board = Array.from({ length: BOARD_SIZE }, () => input());
console.log(solution(board));

// dfs에서 isEnd가 없어서 시간초과 떴었음
