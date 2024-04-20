//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
6 5 
00000
11110
00000
01111
01111
00010
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++]))();
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

const EMPTY = "0";
const WALL = "1";

function solution(N, M, board) {
  const q = new Queue();
  // prettier-ignore
  const move = [[1,0],[0,1],[-1,0],[0,-1]];
  const visited = Array.from({ length: N }, () => Array.from({ length: M }, () => [false, false]));

  q.push([0, 0, 1, false]);

  while (!q.isEmpty()) {
    const [y, x, dist, breaked] = q.pop();

    if (y === N - 1 && x === M - 1) {
      return dist;
    }

    for (const [moveY, moveX] of move) {
      const [nextY, nextX] = [moveY + y, moveX + x];

      if (board?.[nextY]?.[nextX] === undefined) continue;

      if (board[nextY][nextX] === WALL && !breaked && !visited[nextY][nextX][1]) {
        q.push([nextY, nextX, dist + 1, true]);
        visited[nextY][nextX][1] = true;
      }

      if (board[nextY][nextX] === EMPTY && !visited[nextY][nextX][breaked]) {
        q.push([nextY, nextX, dist + 1, breaked]);
        visited[nextY][nextX][breaked] = true;
      }
    }
  }
  return -1;
}

const [N, M] = input().split(" ").map(Number);
const board = Array.from({ length: N }, () => input().split(""));
console.log(solution(N, M, board));
