//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
4 6 8
4 1 3 3 8
1 3 5 2 9
2 4 8 4 1
4 5 0 1 4
3 3 1 2 7
1 5 8 4 3
3 6 2 1 2
2 2 2 3 5
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

class Game {
  constructor(R, C, sharks) {
    this.R = R;
    this.C = C;
    this.board = Array.from({ length: R }, () => Array.from({ length: C }, () => []));
    this.score = 0;
    this.sharks = new Map();

    sharks.forEach(([r, c, s, d, z], sharkId) => {
      const newShark = new Shark(r - 1, c - 1, s, d, z, sharkId, R, C);
      this.sharks.set(sharkId, newShark);
      this.board[r - 1][c - 1] = [newShark];
    });
  }
  // 1초마다 아래를 반복,
  // 1. 낚시왕의 board[?][i]에서 가장 가까운 상어를 잡고, 잡으면 상어가 사라진다.
  // 2. 상어가 이동한다.
  start() {
    // 낚시꾼이 한칸씩 오른쪽으로 움직임
    // 1. board로 상어를 모두 넣음
    // 2. sharks를 순환하며 board에 같은게 있는지 확인하고,
    //    거기 있던게 사이즈가 더 작으면 거기 있던걸 지움,
    //    내가 더 작으면 나를 지움

    for (let x = 0; x < this.C; x++) {
      // 1. 사냥
      for (let y = 0; y < this.R; y++) {
        if (this.board[y][x][0] instanceof Shark) {
          const shark = this.board[y][x][0];

          this.score += shark.size;

          this.board[y][x] = [];

          this.sharks.delete(shark.id);
          break;
        }
      }

      // 2. 이동
      this.sharks.forEach((shark) => {
        shark.move(this.board, R, C);
      });

      // 3. 같은 공간에 있는 상어 제거
      this.sharks.forEach((shark) => {
        const { y, x } = shark;

        const arrayLength = this.board[y][x].length;
        if (arrayLength > 1) {
          const sortedSharks = this.board[y][x].sort((a, b) => b.getSize() - a.getSize());

          this.board[y][x] = [sortedSharks[0]];

          for (let i = 1; i < arrayLength; i++) {
            const shark = sortedSharks[i];
            this.sharks.delete(shark.id);
          }
        }
      });
    }
  }
  // 낚시꾼이 잡은 상어 사이즈 합 리턴
  getScore() {
    return this.score;
  }
}

class Shark {
  constructor(y, x, speed, direction, size, id) {
    this.y = y;
    this.x = x;
    this.speed = speed;
    // 1: 위, 2: 아래, 3: 오른쪽, 4: 왼쪽
    this.direction = this.initDirection(direction);
    this.size = size;
    this.id = id;
    // this.boardInfo = { row, col };
  }
  initDirection(direction) {
    const move = [0, 0];

    if (direction === 1) move[0] = -1;
    else if (direction === 2) move[0] = 1;
    else if (direction === 3) move[1] = 1;
    else if (direction === 4) move[1] = -1;

    return move;
  }

  move(board, R, C) {
    const isMovingY = this.direction[0] !== 0;
    const isMovingX = this.direction[1] !== 0;

    let maxMoveCount = 0;
    let moveCount = 0;

    if (isMovingY) {
      maxMoveCount = (R - 1) * 2;
      moveCount = this.speed % maxMoveCount;
    }
    if (isMovingX) {
      maxMoveCount = (C - 1) * 2;
      moveCount = this.speed % maxMoveCount;
    }

    let [nextY, nextX] = [this.y, this.x];

    for (let i = 0; i < moveCount; i++) {
      nextY += this.direction[0];
      nextX += this.direction[1];

      if (nextY < 0 || nextX < 0 || nextY >= R || nextX >= C) {
        this.direction[0] *= -1;
        this.direction[1] *= -1;

        nextY += this.direction[0] * 2;
        nextX += this.direction[1] * 2;
      }
    }

    const nowShark = board[this.y][this.x].shift();
    board[nextY][nextX].push(nowShark);
    this.y = nextY;
    this.x = nextX;
  }

  getSize() {
    return this.size;
  }
}

function solution(R, C, sharks) {
  const game = new Game(R, C, sharks);
  game.start();

  return game.getScore();
}

const [R, C, M] = input();
const sharks = Array.from({ length: M }, () => input());
console.log(solution(R, C, sharks));

// 1초동안 아래의 일이 일어남d
// 가장 오른쪽열의 오른쪽 칸에 이동하면 이동을 멈춤
// 1. 오른쪽으로 한칸 이동한다.
// 2. 낚시왕의 열에서 가장 가까운 상어를 잡고, 잡으면 상어가 사라진다.
// 3. 상어가 이동한다.

// 상어는 주어진 속도로 이동. 경계를 넘으면 방향을 반대로 바꿔 이동
// 이동을 마친 후 간에 상어가 있다면 크기가 큰 상어가 나머지를 모두 잡아먹음.
//

// 현위치 2

// 아래: 1(3), 2(4)
// 위: 3(3), 4(2), 5(1)
// 아래: 6(2), 7(3), 8(4)
// 위: 9(3), 10(2), 11(1)
