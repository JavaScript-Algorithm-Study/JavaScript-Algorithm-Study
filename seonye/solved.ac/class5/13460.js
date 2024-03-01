const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(N, M, board) {
  let initRedPos, initBluePos;

  for (let i = 0; i < N; i++) {
    for (let j = 0; j < M; j++) {
      if (board[i][j] === 'R') initRedPos = [i, j];
      else if (board[i][j] === 'B') initBluePos = [i, j];
    }
  }

  let q = [[initRedPos, initBluePos, 0]];
  let answer = -1;
  const move = [
    [0, -1],
    [0, 1],
    [1, 0],
    [-1, 0],
  ];

  function moveBall(ball, otherBall, dir) {
    const [dx, dy] = dir;
    while (1) {
      const ny = ball[0] + dy;
      const nx = ball[1] + dx;

      if (
        ny < 1 ||
        ny >= N ||
        nx < 1 ||
        nx >= M ||
        (ny === otherBall[0] && nx === otherBall[1])
      )
        break;
      else if (board[ny][nx] === '.') {
        board[ball[0]][ball[1]] = '.';
        ball = [ny, nx];
      } else if (board[ny][nx] === 'O') {
        ball = [-1, -1];
        break;
      } else break;
    }
    return ball;
  }

  function checkEscape(ball) {
    if (ball[0] === -1 && ball[1] === -1) return true;
    else return false;
  }

  while (q.length > 0) {
    let [redPos, bluePos, cnt] = q.shift();
    if (cnt >= 10) return -1;
    if (checkEscape(redPos) && !checkEscape(bluePos)) {
      answer = cnt;
      break;
    }

    for (let i = 0; i < 4; i++) {
      redPos = moveBall(redPos, bluePos, move[i]);
      bluePos = moveBall(bluePos, redPos, move[i]);
      q.push([redPos, bluePos, cnt + 1]);
    }
  }
  return answer;
}

const [N, M] = input[0].trim().split(' ').map(Number);
const board = input.slice(1, 1 + N).map((row) => row.trim().split(''));
console.log(solution(N, M, board));
