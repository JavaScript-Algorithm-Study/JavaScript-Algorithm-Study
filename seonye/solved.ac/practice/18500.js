const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

class Queue {
  constructor() {
    this.D = {};
    this.headIndex = 0;
    this.tailIndex = 0;
  }

  enqueue(data) {
    this.D[this.tailIndex++] = data;
  }

  dequeue() {
    if (this.headIndex === this.tailIndex) return undefined;
    const data = this.D[this.headIndex];
    delete this.D[this.headIndex++];
    return data;
  }

  size() {
    return this.tailIndex - this.headIndex;
  }
}

function solution(R, C, board, N, heights) {
  let turn = 0;
  const dy = [-1, 1, 0, 0];
  const dx = [0, 0, -1, 1];

  function bfs(y, x, visited) {
    const queue = new Queue();
    queue.enqueue([y, x]);
    visited[y][x] = true;

    while (queue.size() > 0) {
      const [curY, curX] = queue.dequeue();

      for (let i = 0; i < 4; i++) {
        const ny = curY + dy[i];
        const nx = curX + dx[i];

        if (ny < 0 || ny >= R || nx < 0 || nx >= C) continue;
        if (board[ny][nx] === '.' || visited[ny][nx]) continue;

        visited[ny][nx] = true;
        queue.enqueue([ny, nx]);
      }
    }
  }

  function moveMineral(visited, board) {
    const minerals = [];
    for (let y = 0; y < R; y++) {
      for (let x = 0; x < C; x++) {
        if (board[y][x] === 'x' && !visited[y][x]) {
          board[y][x] = '.';
          minerals.push([y, x]);
        }
      }
    }

    let height = 101;
    for (let [y, x] of minerals) {
      let ny = y;

      while (ny < R) {
        if (!visited[ny][x] && board[ny][x] === 'x') break;
        if (visited[ny][x] && board[ny][x] === 'x') {
          height = Math.min(height, ny - y - 1);
          break;
        }
        if (ny === R - 1) {
          height = Math.min(height, R - y - 1);
          break;
        }
        ny++;
      }
    }

    for (let [y, x] of minerals) {
      board[y + height][x] = 'x';
    }
  }

  for (let height of heights) {
    const boardY = R - height;
    if (turn % 2 === 0) {
      // 왼쪽
      for (let i = 0; i < C; i++) {
        if (board[boardY][i] === 'x') {
          board[boardY][i] = '.';
          break;
        }
      }
    } else {
      //오른쪽
      for (let i = C - 1; i < C; i--) {
        if (board[boardY][i] === 'x') {
          board[boardY][i] = '.';
          break;
        }
      }
    }

    const visited = Array.from({ length: R }, () => new Array(C).fill(false));
    for (let x = 0; x < C; x++) {
      if (!visited[R - 1][x] && board[R - 1][x] === 'x') {
        bfs(R - 1, x, visited);
      }
    }

    moveMineral(visited, board);
    turn += 1;
  }

  for (let i = 0; i < R; i++) {
    console.log(board[i].join(''));
  }
}

const [R, C] = input[0].split(' ').map(Number);
const board = input.slice(1, R + 1).map((row) => row.trim().split(''));
const N = Number(input[R + 1]);
const heights = input[R + 2].trim().split(' ').map(Number);

solution(R, C, board, N, heights);
