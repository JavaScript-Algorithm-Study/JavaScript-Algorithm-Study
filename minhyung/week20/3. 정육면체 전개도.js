//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
0 0 0 0 0 0
0 0 0 0 0 0
0 0 1 0 0 0
0 1 1 1 1 0
0 0 1 0 0 0
0 0 0 0 0 0
0 1 1 0 0 0
0 1 0 0 0 0
0 1 0 0 0 0
1 1 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 0 0 0
0 0 0 1 1 0
0 0 1 1 0 0
0 0 0 1 1 0
0 0 0 0 0 0
0 0 0 0 0 0
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ")))();

const SIZE = 6;

function getFloorPosition(board) {
  for (let i = 0; i < SIZE; i++) {
    for (let j = 0; j < SIZE; j++) {
      if (board[i][j] === "1") {
        return [i, j];
      }
    }
  }
}

// 0: 바닥
// 1: 앞면
// 2: 천장
// 3: 뒷면
// 4: 좌면
// 5: 우면

// 위: 0 -> 3 (뒤, 위로이동)
//   바닥: 3 (이전 뒷면)
//   앞: 0 (이전 바닥)
//   뒤: 2 (이전 천장)
//   좌: 4 그대로
//   우: 5 그대로
//   천: 1 (이전 앞면)
function moveUp(diceState) {
  return {
    ...diceState,
    바닥: diceState.뒤,
    앞: diceState.바닥,
    뒤: diceState.천장,
    천장: diceState.앞,
  };
}
// 아래: 0 -> 1 (앞, 아래로 이동)
//   바닥: 1 (이전 앞면)
//   앞: 2 (이전 천장)
//   뒤: 0 (이전 바닥)
//   좌: 4 그대로
//   우: 5 그대로
//   천: 3 (이전 뒷면)
function moveDown(diceState) {
  return {
    ...diceState,
    바닥: diceState.앞,
    앞: diceState.천장,
    뒤: diceState.바닥,
    천장: diceState.뒤,
  };
}
// 좌: 0 -> 4 (좌)
//   바닥: 4 (이전 좌)
//   앞: 1 그대로
//   뒤: 3 그대로
//   좌: 2 (이전 천장)
//   우: 0 (이전 바닥)
//   천: 5 (이전 우)
function moveLeft(diceState) {
  return {
    ...diceState,
    바닥: diceState.좌,
    좌: diceState.천장,
    우: diceState.바닥,
    천장: diceState.우,
  };
}
// 우: 0 -> 5 (우)
//   바닥: 5 (이전 우)
//   앞: 1 그대로
//   뒤: 3 그대로
//   좌: 0 (이전 바닥)
//   우: 2 (이전 천장)
//   천: 4 (이전 좌)
function moveRight(diceState) {
  return {
    ...diceState,
    바닥: diceState.우,
    좌: diceState.바닥,
    우: diceState.천장,
    천장: diceState.좌,
  };
}
function solution(boards) {
  // prettier-ignore
  const move = [[-1, 0, moveUp], [1, 0, moveDown], [0, -1, moveLeft], [0, 1, moveRight]];
  const result = [];

  // 여기서 주사위를 이동시켜봄
  function travelDice(board, y, x, nowFloorNum, diceState, visitedFloors) {
    if (board[y][x] === "v") return;
    board[y][x] = "v";
    // 최초 도면에서 해당면이 바닥에 몇번 닿았는지 확인
    visitedFloors[nowFloorNum]++;

    // 네방향을 둘러봄
    move.forEach(([moveY, moveX, moveFn]) => {
      const [nextY, nextX] = [y + moveY, x + moveX];
      // 보드 밖이면 다음위치를 봄
      // 'v' 면 방문했다는 뜻이므로 다음위치를 봄
      // 0이면 도면 위가 아님 다음을 봄
      if (board?.[nextY]?.[nextX] === undefined || board[nextY][nextX] === "v" || board[nextY][nextX] === "0") return;

      const nextDiceState = moveFn({ ...diceState });

      travelDice(board, nextY, nextX, nextDiceState.바닥, nextDiceState, visitedFloors);
    });
  }

  boards.forEach((board) => {
    const diceState = {
      바닥: 0,
      앞: 1,
      천장: 2,
      뒤: 3,
      좌: 4,
      우: 5,
    };
    const [sy, sx] = getFloorPosition(board);
    const visitedFloors = Array(6).fill(0);

    travelDice(board, sy, sx, diceState.바닥, diceState, visitedFloors);

    const isCorrectDice = visitedFloors.every((el) => el === 1);
    result.push(isCorrectDice ? "yes" : "no");
  });

  return result.join("\n");
}

const boards = Array.from({ length: 3 }, () => Array.from({ length: 6 }, () => input()));
console.log(solution(boards));
