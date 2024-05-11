// 링크: https://www.acmicpc.net/problem/13460
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `

`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return (w) => stdin[l++].split(w)})();

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
const [WALL, BLUE, RED, EMPTY, GOAL] = ["#", "B", "R", ".", "O"];

function moveBall(board, y, x, canGoSpacePos) {
  if (!canGoSpacePos.length) return [];

  const [emptyY, emptyX] = canGoSpacePos.shift();
  // 공이 굴러감, 기존 위치는 빈칸이됨
  board[emptyY][emptyX] = board[y][x];
  board[y][x] = EMPTY;
}

function isBall(kind) {
  if (kind === RED || kind === BLUE) return true;
  else return false;
}

function getForCondition(position, width, height) {
  return {
    left: [height, 0, width, true, false],
    right: [height, width - 1, 0, false, false],
    up: [width, 0, height, true, true],
    down: [width, height - 1, 0, false, true],
  }[position];
}

function tilt(board, position) {
  const [ei, sj, ej, sumPlusJ, reverse] = getForCondition(position, board[0].length, board.length);

  const passGoalList = [];

  for (let i = 0; i < ei; i++) {
    let canGoSpacePos = [];

    for (let j = sj; sumPlusJ ? j < ej : j >= ej; sumPlusJ ? j++ : j--) {
      const [realI, realJ] = [reverse ? j : i, reverse ? i : j];
      const kind = board[realI][realJ];
      // 빈칸이면 갈 수 있는공간에 추가함.
      if (kind === EMPTY || kind === GOAL) {
        canGoSpacePos.push([realI, realJ]);
      }
      // 만약 더이상 못가면 기존 갈 수있는공간을 모두 제거함
      else if (kind === WALL) {
        canGoSpacePos = [];
      }

      if (isBall(kind) && canGoSpacePos.length) {
        const passedGoal = canGoSpacePos.some(([y, x]) => board[y][x] === GOAL);
        if (passedGoal) {
          passGoalList.push([realI, realJ, kind]);
          board[realI][realJ] = EMPTY;
        } else {
          moveBall(board, realI, realJ, canGoSpacePos);
          canGoSpacePos.push([realI, realJ]);
        }
      }
    }
  }

  if (passGoalList.some(([y, x, kind]) => kind === BLUE)) return "impossible";
  if (passGoalList.some(([y, x, kind]) => kind === RED)) return "goal";
  return "possible";
}

function solution(height, width, board) {
  const positions = ["left", "right", "up", "down"];
  const visit = {};

  const q = new Queue();
  q.push([board, 1]);

  while (!q.isEmpty()) {
    const [board, depth] = q.pop();

    const key = board.flat().join("") + depth;
    if (visit[key]) continue;
    visit[key] = true;

    for (const position of positions) {
      const boardCopy = board.map((row) => [...row]);
      const isGoal = tilt(boardCopy, position);

      if (isGoal === "goal") {
        return depth;
      }
      if (isGoal === "impossible") {
        continue;
      }
      if (isGoal === "possible" && depth + 1 < 11) {
        q.push([boardCopy, depth + 1]);
      }
    }
  }

  return -1;
}

const [N, M] = input(" ").map(Number);
const board = Array.from({ length: N }, () => input(""));

console.log(solution(N, M, board));
