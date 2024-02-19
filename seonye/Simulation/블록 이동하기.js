/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/60063
난이도 : Level3

이동함수를 정의하고 백트래킹으로 풀었는데 왜 틀린지 모르겠다..
*/
const board = [
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1],
  [1, 1, 0, 0, 1],
  [0, 0, 0, 0, 0],
];

function goRight(robot, board) {
  if (robot.dir !== 'row') return false;
  const [robotY, robotX] = robot.startPos;
  const N = board.length;

  if (robotX + 2 >= N) return false;
  if (board[robotY][robotX + 2] === 1) return false;

  robot.startPos = [robotY, robotX + 1];
  return robot;
}

function goDown(robot, board) {
  if (robot.dir !== 'col') return false;
  const [robotY, robotX] = robot.startPos;
  const N = board.length;

  if (robotY + 2 >= N) return false;
  if (board[robotY + 2][robotX] === 1) return false;

  robot.startPos = [robotY + 1, robotX];
  return robot;
}
//오른쪽 회전(시계방향)시 가로방향일때는 시작점을 기준, 세로방향일때는 끝점을 기준으로 회전
function turnRight(robot, board) {
  const [robotY, robotX] = robot.startPos;
  const N = board.length;

  if (robotY + 1 >= N || robotX + 1 >= N) return false;
  if (robot.dir === 'row') {
    if (board[robotY + 1][robotX] === 1 || board[robotY + 1][robotX + 1] === 1)
      return false;

    robot.dir = 'col';
  } else if (robot.dir === 'col') {
    if (board[robotY][robotX + 1] === 1 || board[robotY + 1][robotX + 1] === 1)
      return false;

    robot.dir = 'row';
    robot.startPos = [robotY + 1, robotX];
  }
  return robot;
}

//왼쪽 회전(반시계방향)시 가로방향일때는 끝점을 기준, 세로방향일때는 시작점을 기준으로 회전
function turnLeft(robot, board) {
  const [robotY, robotX] = robot.startPos;
  const N = board.length;

  if (robotY + 1 >= N || robotX + 1 >= N) return false;
  if (robot.dir === 'row') {
    if (board[robotY + 1][robotX] === 1 || board[robotY + 1][robotX + 1] === 1)
      return false;

    robot.dir = 'col';
    robot.startPos = [robotY, robotX + 1];
  } else if (robot.dir === 'col') {
    if (board[robotY][robotX + 1] === 1 || board[robotY + 1][robotX + 1] === 1)
      return false;

    robot.dir = 'row';
  }

  return robot;
}

function solution(board) {
  var answer = 0;
  const visited = Array.from({ length: board.length }, () =>
    Array(board[0].length).fill(false)
  );
  let robot = {
    startPos: [0, 0],
    dir: 'row',
  };

  answer = backtracking(robot, 0);

  function backtracking(robot, time) {
    const [robotY, robotX] = robot.startPos;
    const N = board.length;

    if (robot.dir === 'row' && robotY === N - 1 && robotX + 1 === N - 1)
      return time;

    if (robot.dir === 'col' && robotY + 1 === N - 1 && robotX === N - 1)
      return time;

    visited[robotY][robotX] = true;
    time += 1;

    for (let i = 0; i < 4; i++) {
      let nextRobot = Object.assign({}, robot);
      let result = null;

      if (i === 0) {
        nextRobot = goRight(nextRobot, board);
      } else if (i === 1) {
        nextRobot = goDown(nextRobot, board);
      } else if (i === 2) {
        nextRobot = turnLeft(nextRobot, board);
      } else if (i === 3) {
        nextRobot = turnRight(nextRobot, board);
      }

      if (nextRobot && !visited[nextRobot.startPos[0]][nextRobot.startPos[1]]) {
        result = backtracking(nextRobot, time);
      }

      if (result !== null) {
        if (answer === 0) answer = result;
        else answer = Math.min(answer, result);
      }
    }

    visited[robotY][robotX] = false;

    return answer;
  }

  return answer;
}

console.log(solution(board));
