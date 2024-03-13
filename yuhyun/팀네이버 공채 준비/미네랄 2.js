const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(ROW, COL, board, heights) {
  const EMPTY = '.';
  const MINERAL = 'x';
  const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  heights
    .map((height, index) =>
      index % 2 === 0
        ? { row: ROW - height, col: 0, dc: 1 }
        : { row: ROW - height, col: COL - 1, dc: -1 }
    )
    .forEach(({ row, col, dc }) => {
      const collisionCoord = findCollisionCoord({ row, col, dc });
      if (collisionCoord === null) {
        return;
      }

      setEmpty(collisionCoord);

      const [collisionRow, collisionCol] = collisionCoord;
      const visited = Array.from(Array(ROW), () => Array(COL).fill(false));

      DIRECTIONS.map(([dr, dc]) => [collisionRow + dr, collisionCol + dc])
        .filter(([row, col]) => !outOfRange(row, col) && board[row][col] === MINERAL)
        .map((coord) => getClusters(coord, visited))
        .filter((cluster) => cluster.length > 0 && isFloating(cluster))
        .map(drop);
    });

  return board.map((line) => line.join('')).join('\n');

  function getClusters([row, col], visited) {
    if (visited[row][col]) {
      return [];
    }

    visited[row][col] = true;

    let cursor = 0;
    const result = [[row, col]];
    while (cursor < result.length) {
      const [curRow, curCol] = result[cursor++];
      DIRECTIONS.map(([dr, dc]) => [curRow + dr, curCol + dc])
        .filter(
          ([nextRow, nextCol]) =>
            !outOfRange(nextRow, nextCol) &&
            !visited[nextRow][nextCol] &&
            board[nextRow][nextCol] === MINERAL
        )
        .forEach(([nextRow, nextCol]) => {
          visited[nextRow][nextCol] = true;
          result.push([nextRow, nextCol]);
        });
    }

    return result;
  }

  function outOfRange(row, col) {
    return row < 0 || row >= ROW || col < 0 || col >= COL;
  }

  function findCollisionCoord({ row, col, dc }) {
    for (let curCol = col; curCol >= 0 && curCol < COL; curCol += dc) {
      if (board[row][curCol] === MINERAL) {
        return [row, curCol];
      }
    }
    return null;
  }

  function drop(cluster) {
    const isInCluster = (row, col) => {
      return cluster.some(([clusterRow, clusterCol]) => clusterRow === row && clusterCol === col);
    };

    const minDiffHeights = cluster.map(([row, col]) => {
      for (let nextRow = row + 1; nextRow < ROW; nextRow += 1) {
        if (board[nextRow][col] !== MINERAL) {
          continue;
        }

        return isInCluster(nextRow, col) ? null : nextRow - row - 1;
      }
      return ROW - 1 - row;
    });

    const minDiffHeight = Math.min(
      ...minDiffHeights.filter((minDiffHeight) => minDiffHeight !== null)
    );

    cluster.forEach(setEmpty);
    cluster.forEach(([row, col]) => setMineral([row + minDiffHeight, col]));
  }

  function setMineral([row, col]) {
    board[row][col] = MINERAL;
  }

  function setEmpty([row, col]) {
    board[row][col] = EMPTY;
  }

  function isFloating(cluster) {
    return cluster.every(([row]) => row !== ROW - 1);
  }
}

const [R, C] = input.shift().split(' ').map(Number);
const board = input.splice(0, R).map((line) => line.split(''));
const nThrow = Number(input.shift());
const heights = input[0].split(' ').map(Number);
console.log(solution(R, C, board, heights));
