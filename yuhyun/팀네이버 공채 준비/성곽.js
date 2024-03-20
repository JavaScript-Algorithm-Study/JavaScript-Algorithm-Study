const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(N, M, board) {
  const [WEST, NORTH, EAST, SOUTH] = [0, 1, 2, 3];
  const DIRECTIONS = [
    [0, -1],
    [-1, 0],
    [0, 1],
    [1, 0],
  ];

  let lastRoom = 0;
  const roomBoard = Array.from(Array(M), () => Array(N).fill(null));
  const sizeMap = new Map();

  for (let row = 0; row < M; row += 1) {
    for (let col = 0; col < N; col += 1) {
      if (roomBoard[row][col] !== null) {
        continue;
      }

      const nMarked = markArea(row, col, lastRoom, roomBoard);
      sizeMap.set(lastRoom, nMarked);
      lastRoom += 1;
    }
  }

  let maxTwoRoomSize = 0;
  const adjacent = [DIRECTIONS[EAST], DIRECTIONS[SOUTH]];
  for (let row = 0; row < M; row += 1) {
    for (let col = 0; col < N; col += 1) {
      const curSize = sizeMap.get(roomBoard[row][col]);
      adjacent
        .map(([dr, dc]) => [row + dr, col + dc])
        .filter(([nr, nc]) => !outOfRange(nr, nc) && roomBoard[row][col] !== roomBoard[nr][nc])
        .forEach(([nr, nc]) => {
          maxTwoRoomSize = Math.max(maxTwoRoomSize, curSize + sizeMap.get(roomBoard[nr][nc]));
        });
    }
  }

  return [lastRoom, Math.max(...sizeMap.values()), maxTwoRoomSize].join('\n');

  function markArea(startRow, startCol, sign, signedBoard) {
    let nMarked = 0;
    const queue = createQueue();
    queue.push([startRow, startCol]);
    signedBoard[startRow][startCol] = sign;
    nMarked += 1;

    while (!queue.isEmpty()) {
      const [row, col] = queue.pop();

      DIRECTIONS.map(([dr, dc], directionType) => [row + dr, col + dc, directionType])
        .filter(
          ([nr, nc, directionType]) =>
            !outOfRange(nr, nc) &&
            signedBoard[nr][nc] === null &&
            (board[row][col] & (1 << directionType)) === 0
        )
        .forEach(([nr, nc]) => {
          signedBoard[nr][nc] = sign;
          nMarked += 1;
          queue.push([nr, nc]);
        });
    }

    return nMarked;
  }

  function outOfRange(row, col) {
    return row < 0 || col < 0 || row >= M || col >= N;
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

    return { isEmpty, pop, push };
  }
}

const [N, M] = input.shift().split(' ').map(Number);
const board = input.map((line) => line.split(' ').map(Number));
console.log(solution(N, M, board));
