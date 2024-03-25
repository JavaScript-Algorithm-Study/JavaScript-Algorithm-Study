const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(data) {
  const EMPTY = 0;
  const FILL = 1;

  const [ROW, COL] = getRowAndCol(data);
  const visited = Array.from(Array(ROW), () => Array(COL).fill(false));

  const result = [];
  data.forEach((row, rowIndex) =>
    row.forEach((cell, collIndex) => {
      if (cell === EMPTY || visited[rowIndex][collIndex]) {
        return;
      }

      const coords = getConnectedCoords(rowIndex, collIndex, data, visited);
      const board = mapToBoard(coords, EMPTY, FILL);
      result.push(isCubeSketch(board));
    })
  );

  return result.map((cubeSketch) => (cubeSketch ? 'yes' : 'no')).join('\n');

  function mapToBoard(coords, emptyValue, fillValue) {
    const rowIndices = coords.map(([row]) => row);
    const colIndices = coords.map(([_, col]) => col);

    const minRowIndex = Math.min(...rowIndices);
    const minColIndex = Math.min(...colIndices);

    const ROW = Math.max(...rowIndices) - minRowIndex + 1;
    const COL = Math.max(...colIndices) - minColIndex + 1;

    const result = Array.from(Array(ROW), () => Array(COL).fill(emptyValue));
    coords
      .map(([row, col]) => [row - minRowIndex, col - minColIndex])
      .forEach(([boardRow, boardCol]) => {
        result[boardRow][boardCol] = fillValue;
      });
    return result;
  }

  function isCubeSketch(board) {
    const CUBE_SKETCHES = [
      [
        [1, 0, 0, 0],
        [1, 1, 1, 1],
        [1, 0, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 1, 1],
        [1, 0, 0, 0],
      ],
      [
        [0, 0, 1, 0],
        [1, 1, 1, 1],
        [1, 0, 0, 0],
      ],
      [
        [1, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 1],
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 1, 1],
        [0, 1, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 1, 0],
      ],
      [
        [0, 0, 1, 1, 1],
        [1, 1, 1, 0, 0],
      ],
      [
        [0, 0, 1, 1],
        [0, 1, 1, 0],
        [1, 1, 0, 0],
      ],
      [
        [0, 0, 1, 1],
        [1, 1, 1, 0],
        [1, 0, 0, 0],
      ],
      [
        [1, 1, 0, 0],
        [0, 1, 1, 1],
        [0, 1, 0, 0],
      ],
      [
        [0, 1, 0, 0],
        [1, 1, 1, 0],
        [0, 0, 1, 1],
      ],
    ];

    return CUBE_SKETCHES.some((cubeSketch) => isSameShape(board, cubeSketch));
  }

  function isSameShape(boardA, boardB) {
    let rotatedBoard = boardA;
    for (let nRotate = 0; nRotate < 4; nRotate += 1) {
      if (isSameBoard(rotatedBoard, boardB) || isSameBoard(mirror(rotatedBoard), boardB)) {
        return true;
      }

      rotatedBoard = rotateRight90(rotatedBoard);
    }
    return false;
  }

  function isSameBoard(boardA, boardB) {
    return (
      isSameCoord(getRowAndCol(boardA), getRowAndCol(boardB)) &&
      boardA.every((row, rowIndex) =>
        row.every((cell, colIndex) => cell === boardB[rowIndex][colIndex])
      )
    );
  }

  function mirror(board) {
    const result = board.map((row) => [...row]);
    result.forEach((row) => row.reverse());
    return result;
  }

  function rotateRight90(board) {
    const [ROW, COL] = getRowAndCol(board);
    const result = Array.from(Array(COL), () => Array(ROW));
    for (let row = 0; row < ROW; row += 1) {
      for (let col = 0; col < COL; col += 1) {
        result[col][ROW - row - 1] = board[row][col];
      }
    }
    return result;
  }

  function getConnectedCoords(startRow, startCol, board, visited) {
    const FILL = 1;
    const [ROW, COL] = getRowAndCol(board);
    const DIRECTIONS = [
      [0, 1],
      [1, 0],
      [0, -1],
      [-1, 0],
    ];

    const queue = createQueue();

    queue.push([startRow, startCol]);
    visited[startRow][startCol] = true;

    while (!queue.isEmpty()) {
      const [row, col] = queue.pop();

      DIRECTIONS.map(([dr, dc]) => [row + dr, col + dc])
        .filter(
          ([nr, nc]) => !outOfRange(nr, nc, ROW, COL) && !visited[nr][nc] && board[nr][nc] === FILL
        )
        .forEach(([nr, nc]) => {
          visited[nr][nc] = true;
          queue.push([nr, nc]);
        });
    }

    return queue.getHistory();
  }

  function createQueue() {
    let head = 0;
    const queue = [];

    function isEmpty() {
      return queue.length === head;
    }
    function pop() {
      return isEmpty() ? null : queue[head++];
    }
    function push(value) {
      queue.push(value);
    }
    function getHistory() {
      return queue;
    }

    return { isEmpty, pop, push, getHistory };
  }

  function outOfRange(row, col, ROW, COL) {
    return row < 0 || col < 0 || row >= ROW || col >= COL;
  }

  function getRowAndCol(board) {
    return [board.length, board[0].length];
  }

  function isSameCoord([rowA, colA], [rowB, colB]) {
    return rowA === rowB && colA === colB;
  }
}

const data = input.map((line) => line.split(' ').map(Number));
console.log(solution(data));
