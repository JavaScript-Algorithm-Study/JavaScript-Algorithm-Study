//https://www.acmicpc.net/problem/17070
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
22
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ')})();

const WALL = "1";

class Pipe {
  constructor(horizontal, vertical, diagonal) {
    this.horizontal = horizontal;
    this.vertical = vertical;
    this.diagonal = diagonal;
  }
  sumEvery = () => this.horizontal + this.vertical + this.diagonal;
  sumLeft = () => this.horizontal + this.diagonal;
  sumTop = () => this.vertical + this.diagonal;
}

function isPipe(board, y, x) {
  return board[y]?.[x] instanceof Pipe;
}

function solution(N, board) {
  board[0][0] = new Pipe(0, 0, 0);
  board[0][1] = new Pipe(1, 0, 0);

  // 가로: 왼쪽 가로, 왼쪽 대각
  // 세로: 위 세로, 위 대각
  // 대각: 왼쪽위 가로, 왼쪽위 세로, 왼쪽위 대각
  // 근데 현재가 2거나 해당 위치를 볼 때 2면 더하지 않음
  for (let y = 0; y < N; y++) {
    for (let x = 1; x < N; x++) {
      if (y === 0 && x === 1) continue;
      if (board[y][x] === WALL) continue;

      const left = board[y]?.[x - 1]?.sumLeft?.() ?? 0;
      const top = board[y - 1]?.[x]?.sumTop?.() ?? 0;
      // 왼쪽, 위에 아무것도 없어야 대각선 이동이 가능함
      // 이동이 가능하다면 대각선의 값들을 더해줌
      // 왼쪽과 위가 파이프 === 이동 가능한 위치와 같은 의미
      let canMoveDiagonal = isPipe(board, y, x - 1) && isPipe(board, y - 1, x);
      const diagonal = canMoveDiagonal ? board[y - 1]?.[x - 1]?.sumEvery?.() ?? 0 : 0;

      board[y][x] = new Pipe(left, top, diagonal);
    }
  }

  return board[N - 1][N - 1]?.sumEvery?.() ?? 0;
}

const N = Number(input());
const board = Array.from({ length: N }, () => input());
console.log(solution(N, board));
