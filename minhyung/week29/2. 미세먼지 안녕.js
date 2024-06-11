//https://www.acmicpc.net/problem/17144
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
7 8 50
0 0 0 0 0 0 0 9
0 0 0 0 3 0 0 8
-1 0 5 0 0 0 22 0
-1 8 0 0 0 0 0 0
0 0 0 0 0 10 43 0
0 0 5 0 15 0 0 0
0 0 40 0 0 0 20 0
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

const AIR_CLEANER = -1;
const EMPTY = 0;
const OUT_OF_BOARD = undefined;

const nextDirection = {
  // y, x
  left: [0, -1],
  right: [0, 1],
  top: [-1, 0],
  down: [1, 0],
};

function getAirCleanerPosition(board, maxRow) {
  const position = {
    up: {
      y: 0,
      x: 0,
    },
    down: {
      y: 0,
      x: 0,
    },
  };

  for (let row = 0; row < maxRow; row++) {
    const tile = board[row][0];

    if (tile === AIR_CLEANER) {
      position.up.y = row;
      position.down.y = row + 1;
      break;
    }
  }

  return position;
}

function spreadDust(orgBoard, board, rowIdx, colIdx, amountDustSpread) {
  const { left, right, top, down } = nextDirection;
  let spreadCount = 0;

  [left, right, top, down].forEach(([addY, addX]) => {
    const [nextY, nextX] = [rowIdx + addY, colIdx + addX];
    const next = orgBoard?.[nextY]?.[nextX];

    if (next === OUT_OF_BOARD || next === AIR_CLEANER) return;

    spreadCount += 1;
    board[nextY][nextX] += amountDustSpread;
  });

  return spreadCount;
}

function runSpreadDust(board, maxRow, maxCol, airCleanerPosition) {
  const tempBoard = makeTempBoard(maxRow, maxCol, airCleanerPosition);

  board.forEach((row, rowIdx) => {
    row.forEach((tile, colIdx) => {
      if (tile === EMPTY || tile === AIR_CLEANER) return;

      const amountDust = tile;
      const amountDustSpread = Math.floor(tile / 5);

      const spreadCount = spreadDust(board, tempBoard, rowIdx, colIdx, amountDustSpread);

      tempBoard[rowIdx][colIdx] += amountDust - amountDustSpread * spreadCount;
    });
  });

  return tempBoard;
}

function makeTempBoard(maxRow, maxCol, airCleanerPosition) {
  const tempBoard = Array.from({ length: maxRow }, () => Array(maxCol).fill(0));
  tempBoard[airCleanerPosition.up.y][airCleanerPosition.up.x] = -1;
  tempBoard[airCleanerPosition.down.y][airCleanerPosition.down.x] = -1;

  return tempBoard;
}

function airCleaner(board, nextPositions, airCleanerPosition, startY, canGo) {
  board[startY][airCleanerPosition.x] = 0;
  let [nowY, nowX] = [startY, airCleanerPosition.x];

  nextPositions.forEach(([addY, addX]) => {
    while (true) {
      const [nextY, nextX] = [nowY + addY, nowX + addX];
      let next = board?.[nextY]?.[nextX];

      if (next === OUT_OF_BOARD || next === AIR_CLEANER || !canGo(nextY)) {
        break;
      } else {
        [board[nowY][nowX], board[nextY][nextX]] = [board[nextY][nextX], board[nowY][nowX]];
        [nowY, nowX] = [nextY, nextX];
      }
    }
  });
}
function runAirCleaner(board, airCleanerPosition) {
  const { up: airCleanerUp, down: airCleanerDown } = airCleanerPosition;
  const { left, right, top, down } = nextDirection;

  const upPositions = [top, right, down, left];
  airCleaner(board, upPositions, airCleanerUp, airCleanerUp.y - 1, (nextY) => nextY <= airCleanerUp.y);

  const downPositions = [down, right, top, left];
  airCleaner(board, downPositions, airCleanerDown, airCleanerDown.y + 1, (nextY) => nextY >= airCleanerDown.y);

  return board;
}
function solution(board, maxRow, maxCol, maxTime) {
  const airCleanerPosition = getAirCleanerPosition(board, maxRow);

  for (let time = 0; time < maxTime; time++) {
    board = runSpreadDust(board, maxRow, maxCol, airCleanerPosition);
    board = runAirCleaner(board, airCleanerPosition);
  }

  let result = board
    .map((row) => row.reduce((sum, col) => (col !== AIR_CLEANER ? sum + col : sum), 0))
    .reduce((sum, col) => sum + col, 0);

  return result;
}

const [R, C, T] = input();
const board = Array.from({ length: R }, () => input());
console.log(solution(board, R, C, T));

// 공기청정기는 항상 1번열에 설치 되어있음, 어떤 행인지는 ㅁㄹ
// 설치되어 있지 않은 칸에는 미세먼지가 있음
// - 미세먼지 확산
// 미세먼지는 확산됨. 모든 칸에서 동시에 일어남
// 공기청정기 있으면 확산 x, 확산되는 양은 현재먼지/5, 서수점은 버림
// 현재 공간에 남은 미세먼지 = 현재먼지 - (|현재먼지/5|) * 확산된 방향
// - 공기청정기 작동
// 위쪽: 반 시계방향으로 순환
// 아래쪽: 시계 방향으로 순환
// 바람이 불면 미세전지가 방향대로 한칸씩 이동함
// 공기청정기로 부는 바람: 미세먼지 x,
// 공기청정기로 들어간 미세먼지: 없어짐

// 확산:
// - board 모두 탐색 하면서 새로운 board에 위 조건에 따라 값들을 더해줌
// - 끝까지 탐색하면 현재 board와 교체함

// 공기청정기:
// - 위쪽: 오른쪽 -> 위 -> 왼쪽 -> 아래로 이동
//   - 공기 청정기 바로 위쪽을 0으로 바꿈
//   - 다음 인덱스, 다다음 인덱스를 바꿈
//     - 다다음 인덱스가 undefined일 때 까지 반복
//   - 방향을 오른쪽으로 바꿔서 반복
//   - 방향을 아래로 바꿔서 반복
//   - 방향을 왼쪽으로 바꿔서 공기청정기가 나올 떄 까지 반복
