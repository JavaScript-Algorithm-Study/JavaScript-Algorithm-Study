const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(ROW, COL, robots, commands) {
  const PAD = 1;
  const EMPTY = null;
  const DIRECTIONS = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];
  const board = Array.from(Array(ROW), () => Array(COL).fill(EMPTY));
  const robotCoords = [];
  robots
    .map(([x, y, type]) => [...toCoord(x, y), type])
    .forEach(([row, col, type]) => {
      board[row][col] = createDirection(type);
      robotCoords.push([row, col]);
    });

  for (const [robotIndex, op, iter] of commands) {
    const [row, col] = robotCoords[robotIndex - PAD];
    const robot = board[row][col];
    board[row][col] = EMPTY;

    let nr = row;
    let nc = col;
    let round = 0;
    while (round < iter && !outOfRange(nr, nc) && board[nr][nc] === EMPTY) {
      switch (op) {
        case 'L':
          robot.turnLeft90();
          break;
        case 'R':
          robot.turnRight90();
          break;
        case 'F':
          const [dr, dc] = robot.getDirection();
          nr += dr;
          nc += dc;
          break;
      }
      round += 1;
    }

    if (outOfRange(nr, nc)) {
      return `Robot ${robotIndex} crashes into the wall`;
    }

    if (board[nr][nc] !== EMPTY) {
      const crashedRobotIndex = robotCoords.findIndex(([row, col]) => row === nr && col === nc);
      return `Robot ${robotIndex} crashes into robot ${crashedRobotIndex + PAD}`;
    }

    robotCoords[robotIndex - PAD] = [nr, nc];
    board[nr][nc] = robot;
  }

  return 'OK';

  function outOfRange(row, col) {
    return row < 0 || col < 0 || row >= ROW || col >= COL;
  }

  function toCoord(x, y) {
    return [ROW - y, x - 1];
  }

  function createDirection(initType) {
    let type = ((initType) => {
      switch (initType) {
        case 'E':
          return 0;
        case 'S':
          return 1;
        case 'W':
          return 2;
        case 'N':
          return 3;
      }
    })(initType);

    function turnLeft90() {
      type = (type - 1 + DIRECTIONS.length) % DIRECTIONS.length;
    }

    function turnRight90() {
      type = (type + 1) % DIRECTIONS.length;
    }

    function getDirection() {
      return DIRECTIONS[type];
    }

    return { turnLeft90, turnRight90, getDirection };
  }
}

const parse = (value) => (/\d/.test(value) ? Number(value) : value);
const [A, B] = input.shift().split(' ').map(Number);
const [N, M] = input.shift().split(' ').map(Number);
const robots = input.splice(0, N).map((line) => line.split(' ').map(parse));
const commands = input.map((line) => line.split(' ').map(parse));
console.log(solution(B, A, robots, commands));
