// 링크: https://www.acmicpc.net/problem/12100
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
3
2 2 2
4 4 4
8 8 8
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

class Queue {
  l = 0;
  r = 0;
  d = {};
  push(data) {
    this.d[this.r++] = data;
  }
  pop() {
    if (this.isEmpty()) return undefined;
    return this.d[this.l++];
  }
  isEmpty() {
    return this.l === this.r;
  }
}

function getForCondition(position, width, height) {
  return {
    left: [height, 0, width, true, false],
    right: [height, width - 1, 0, false, false],
    up: [width, 0, height, true, true],
    down: [width, height - 1, 0, false, true],
  }[position];
}

function print(board) {
  console.log(board.map((row) => row.join(" ")).join("\n"));
  console.log("------------");
}
// 한쪽 방향으로 뭉침
function merge(board, position) {
  const [ei, sj, ej, sumPlusJ, reverse] = getForCondition(position, board[0].length, board.length);

  for (let i = 0; i < ei; i++) {
    let beforePos = [];
    let beforeNum = 0;

    for (let j = sj; sumPlusJ ? j < ej : j >= ej; sumPlusJ ? j++ : j--) {
      const [realI, realJ] = [reverse ? j : i, reverse ? i : j];
      const nowNum = board[realI][realJ];

      // 최초 초기화 or 숫자 두개가 다르면 다음걸 봄
      if (nowNum !== 0 && beforeNum !== nowNum) {
        beforeNum = nowNum;
        beforePos = [realI, realJ];
        continue;
      }
      // 숫자 두개가 같으면 합치고, 현위치는 0으로 만듬
      if (beforeNum === nowNum && beforePos.length) {
        board[beforePos[0]][beforePos[1]] *= 2;
        board[realI][realJ] = 0;
        beforePos = [];
        beforeNum = 0;
      }
    }
  }
}
function move(board, position) {
  const [ei, sj, ej, sumPlusJ, reverse] = getForCondition(position, board[0].length, board.length);

  for (let i = 0; i < ei; i++) {
    // let beforePos = [];
    // let beforeNum = -1;
    const emptySpaces = new Queue();

    for (let j = sj; sumPlusJ ? j < ej : j >= ej; sumPlusJ ? j++ : j--) {
      const [realI, realJ] = [reverse ? j : i, reverse ? i : j];
      const nowNum = board[realI][realJ];

      // 만약 현 위치가 0이면 빈공간에 넣음
      if (nowNum === 0) {
        emptySpaces.push([realI, realJ]);
      }
      // 만약 현 위치가 0이 아니고, 빈공간이 있으면 거기로 옮김
      // 그리고 현 위치 숫자는 0으로 바꿈
      // 그리고 현위치를 빈공간 맨 앞에 넣음
      if (nowNum !== 0 && !emptySpaces.isEmpty()) {
        const [y, x] = emptySpaces.pop();
        board[y][x] = nowNum;
        board[realI][realJ] = 0;

        emptySpaces.push([realI, realJ]);
      }
    }
  }
}
function maxNum(board) {
  let max = 0;
  board.forEach((row) => {
    row.forEach((col) => {
      if (col > max) max = col;
    });
  });
  return max;
}
function solution(board, size) {
  const positions = ["left", "right", "up", "down"];
  let result = 0;

  const dfs = (board, depth, a = "") => {
    if (depth === 5) {
      result = Math.max(maxNum(board), result);
      return;
    }
    positions.forEach((position) => {
      const copyBoard = board.map((row) => [...row]);
      merge(copyBoard, position);
      move(copyBoard, position);
      dfs(copyBoard, depth + 1, position);
    });
  };

  dfs(board, 0);

  return result;
}

const N = +input();
const board = Array.from({ length: N }, () => input());
console.log(solution(board, N));
// 20 * 20 * 20 = 8000
// 중복순열 = 3125개
// 400 * 3125 = 25,000,000
// for문 두번 돌리면서 같은숫자 있으면 합치고, 있던자리는 지우면 될듯
