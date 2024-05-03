//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
3
0 0 1
0 0 0
0 9 0z  
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

const SHARK = 9;
const EMPTY = 0;

class Queue {
  l = 0;
  r = 0;
  d = {};
  push(data) {
    this.d[this.r++] = data;
  }
  pop() {
    if (this.isEmpty()) return undefined;
    const result = this.d[this.l];
    delete this.d[this.l++];
    return result;
  }
  isEmpty() {
    return this.l === this.r;
  }
}

class Shark {
  constructor(board, game) {
    this.board = board;
    this.boardSize = board.length;

    const [y, x] = this.findSharkPosition();
    this.pos = { y, x };
    this.size = 2;
    this.neededFeedNum = this.size;

    // prettier-ignore
    this.nextMove = [[-1,0], [0,-1], [1, 0], [0, 1]]
    this.game = game;
  }

  findNextMoveCandidates() {
    const q = new Queue();
    const boardSize = this.boardSize;
    const visited = Array.from({ length: boardSize }, () => Array(boardSize).fill(false));
    const nextMoveCandidates = [];

    q.push([this.pos.y, this.pos.x, 0]);
    visited[this.pos.y][this.pos.x] = true;

    while (!q.isEmpty()) {
      const [nowY, nowX, time] = q.pop();

      for (const [moveY, moveX] of this.nextMove) {
        const [nextY, nextX] = [nowY + moveY, nowX + moveX];
        const nextTile = this.board?.[nextY]?.[nextX];

        if (nextTile === undefined || visited[nextY][nextX] || nextTile > this.size) {
          continue;
        }

        visited[nextY][nextX] = true;

        // 상어 사이즈와 같거나 EMPTY면 큐에 넣음(지나감)
        if (nextTile === EMPTY || nextTile >= this.size) {
          q.push([nextY, nextX, time + 1]);
        }
        // 만약 상어보다 작은 물고기면 후보에 넣어줌
        if (nextTile !== EMPTY && nextTile < this.size) {
          nextMoveCandidates.push([nextY, nextX, time + 1]);
        }
      }
    }

    return nextMoveCandidates;
  }
  calcMoveTime() {
    const nextPositions = this.findNextMoveCandidates();

    if (nextPositions.length === 0) {
      return 0;
    } else {
      nextPositions.sort((a, b) => a[2] - b[2] || a[0] - b[0] || a[1] - b[1]);
    }

    // 정렬된 첫번째 목록이 다음 좌표
    const [nextY, nextX, dist] = nextPositions[0];

    // 현재 위치를 비워주고, 상어를 움직여줌
    this.board[this.pos.y][this.pos.x] = EMPTY;
    this.pos.y = nextY;
    this.pos.x = nextX;

    // 물고기를 먹고, 물고기 카운터를 감소시킴
    this.eatFish();
    this.game.killFish(nextY, nextX);
    this.game.decreaseFishCount();

    // 움직인 거리를 리턴시킴
    return dist;
  }
  eatFish() {
    this.neededFeedNum -= 1;

    if (this.neededFeedNum === 0) {
      this.size += 1;
      this.neededFeedNum = this.size;
    }
  }

  findSharkPosition() {
    const n = this.board.length;
    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (this.board[y][x] === SHARK) {
          return [y, x];
        }
      }
    }
  }
}

class Game {
  constructor(board) {
    const fishesPos = this.getFishesPos(board);
    this.fishes = this.initFishes(fishesPos);
    this.fishCount = fishesPos.length;

    this.board = board;

    this.shark = new Shark(board, this);
    this.time = 0;
  }

  initFishes(fishesPos) {
    const fishes = {};
    fishesPos.forEach(([y, x]) => {
      const fishId = [y, x];
      fishes[fishId] = [y, x];
    });
    return fishes;
  }

  getFishesPos(board) {
    const n = board.length;
    const fishesPos = [];

    for (let y = 0; y < n; y++) {
      for (let x = 0; x < n; x++) {
        if (board[y][x] !== SHARK && board[y][x] !== EMPTY) {
          fishesPos.push([y, x]);
        }
      }
    }

    return fishesPos;
  }

  decreaseFishCount() {
    this.fishCount--;
  }

  killFish(y, x) {
    const fishId = [y, x];
    delete this.fishes[fishId];
    this.board[y][x] = EMPTY;
  }

  play() {
    while (this.fishCount > 0) {
      const movedCount = this.shark.calcMoveTime();
      this.time += movedCount;

      if (movedCount === 0) {
        break;
      }
    }
  }

  getResult() {
    return this.time;
  }
}

function solution(board, n) {
  const game = new Game(board);

  game.play();

  return game.getResult();
}

const N = +input();
const board = Array.from({ length: N }, () => input());
console.log(solution(board, N));

// N x N 보드
// 물거기 M마리
// 아기상어 1마리
// 한카에는 물고기 최대 1마리
// 아기상어, 물고기는 크기를 가지고 있음
// 최초 아기상어 크기는 2, 1초후 상하좌우 이동
// 아기상어 자기보다 큰 물고기 못지나감
// 작은 물고기만 먹을 수 있음,
// 크기가 같은 물고기는 먹을 수 없지만 지나갈수는 있음

// 물고기 0마리: 엄마상어에게 도움 요청
// 물고기 1마리: 그 물고기 먹으러감
// 물고기 2마리 이상: 거리가 가장 가까운 물고기 먹으러감
// 거리 = 아기상어 칸 -> 물고기칸 이동할 때 지나야 하는 칸의 개수 최소값
// 거리가 같은 물고기가 여러마리면 가장 위 물고기 먹음
// 그래도 같다면 가장 왼쪽 물고기 먹음

// 이동은 1초가 걸림. 이동과 동시에 물고기를 먹음.
// 물고기를 먹으면 그 칸은 빈칸이됨

// 아기상어는 자신의 크기의 수만큼 물고기를 먹을 때 크기가 1 증가한다.
// ex) 크기가 2면 물고기 2마리 먹어야 크기가 3이된다.

// 아기상어가 몇초가 지나야 모든 물고기를 머
