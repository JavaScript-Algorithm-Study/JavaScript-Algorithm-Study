const stdin =
  process.platform === "linux"
    ? require("fs").readFileSync(0, "utf-8").trim().split("\n")
    : `
5 4
2 2
1 1 E
5 4 W
1 F 7
2 F 7
  `
        .trim()
        .split("\n");
const input = (() => {
  let l = 0;
  return () => stdin[l++].split(" ");
})();

const DIRECTION = {
  LEFT: "L",
  RIGHT: "R",
  EAST: "E",
  WEST: "W",
  NORTH: "N",
  SOUTH: "S",
};

class Robot {
  constructor(name, y, x, direction, board) {
    this.info = { pos: { y, x }, direction, name };
    this.board = board;
  }

  // rotateDirection: L, R
  rotate(rotateDirection) {
    //      S
    //    W   E
    //      N
    // W: x 감소,   S: y 감소,  E: x 증가,  N: y 증가,
    // W: [0, -1], S: [-1,0], E: [0, 1], N: [1,0]
    // L이면 idx 감소, R이면 idx 증가

    // 오른쪽: N -> E -> S -> W -> S
    // 왼쪽: N -> W -> S -> E -> S
    const directionsR = [DIRECTION.NORTH, DIRECTION.EAST, DIRECTION.SOUTH, DIRECTION.WEST];
    const directionsL = [DIRECTION.NORTH, DIRECTION.WEST, DIRECTION.SOUTH, DIRECTION.EAST];
    let directions;

    if (rotateDirection === DIRECTION.LEFT) directions = directionsL;
    if (rotateDirection === DIRECTION.RIGHT) directions = directionsR;

    let nowRotateIdx = directions.findIndex((d) => d === this.info.direction);
    const nextRotateIdx = (nowRotateIdx + 1) % 4;
    this.info.direction = directions[nextRotateIdx];
  }

  move() {
    // 다음으로 이동
    const moves = {
      [DIRECTION.NORTH]: [1, 0],
      [DIRECTION.SOUTH]: [-1, 0],
      [DIRECTION.WEST]: [0, -1],
      [DIRECTION.EAST]: [0, 1],
    };
    const [moveY, moveX] = moves[this.info.direction];
    const { y: nowY, x: nowX } = this.info.pos;
    const [nextY, nextX] = [nowY + moveY, nowX + moveX];

    // 만약 벽에 충돌하면
    if (this.board?.[nextY]?.[nextX] === undefined) {
      throw new Error(`Robot ${this.info.name} crashes into the wall`);
    }
    // 다음 장소에 다른 로봇이 있으면
    if (this.board[nextY][nextX] !== 0) {
      const crashedRobotName = this.board[nextY][nextX];
      throw new Error(`Robot ${this.info.name} crashes into robot ${crashedRobotName}`);
    }

    this.info.pos = { y: nextY, x: nextX };
    this.board[nextY][nextX] = this.info.name;
    this.board[nowY][nowX] = 0;
  }

  excute(command, tryCount) {
    for (let i = 0; i < tryCount; i++) {
      if (command === "F") {
        this.move();
      } else {
        this.rotate(command);
      }
    }
  }
}
function solution(maxRow, maxCol, robotPositions, commands) {
  const board = Array.from({ length: maxRow }, () => Array(maxCol).fill(0));
  const robotList = ["i"];

  robotPositions.forEach(([x, y, direction], idx) => {
    const [numY, numX] = [Number(y) - 1, Number(x) - 1];
    const robot = new Robot(idx + 1, numY, numX, direction, board);
    board[numY][numX] = idx + 1;
    robotList.push(robot);
  });

  for (const [robotNum, command, tryCount] of commands) {
    try {
      const numRobotNum = Number(robotNum);
      robotList[numRobotNum].excute(command, Number(tryCount));
    } catch (e) {
      return e.message;
    }
  }

  return "OK";
}

const [A, B] = input().map(Number); // 가로, 세로
const [N, M] = input().map(Number); // N: 로봇 초기위치, M 명령
const robotPositions = Array.from({ length: N }, () => input());
const commands = Array.from({ length: M }, () => input());
console.log(solution(B, A, robotPositions, commands));
