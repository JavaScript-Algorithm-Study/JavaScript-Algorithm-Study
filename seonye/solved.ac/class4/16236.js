const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, board) {
  let shark_pos;
  let shark_size = 2;
  const fish_pos = [];
  let eat_cnt = 0;

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (board[i][j] === 9) {
        shark_pos = [j, i];
      } else if (board[i][j] !== 9 && board[i][j] !== 0) fish_pos.push([i, j]);
    }
  }

  const dir = [
    [-1, 0],
    [0, -1],
    [0, 1],
    [1, 0],
  ];

  function bfs(x, y) {
    const visited = Array.from({ length: n }, () => Array(n).fill(false));
    const q = [];
    const distance = [];
    let min_dist = Infinity;

    q.push([x, y, 0]);
    visited[y][x] = true;

    while (q.length > 0 && fish_pos.length > 0) {
      const [cx, cy, dist] = q.shift();
      for (let i = 0; i < 4; i++) {
        const [dy, dx] = dir[i];
        const ny = cy + dy;
        const nx = cx + dx;
        if (ny < 0 || ny >= n || nx < 0 || nx >= n) continue;
        if (visited[ny][nx] || shark_size < board[ny][nx]) continue;

        visited[ny][nx] = true;
        if (board[ny][nx] > 0 && board[ny][nx] < shark_size) {
          min_dist = dist;
          distance.push([dist + 1, nx, ny]);
        }
        if (dist + 1 <= min_dist) q.push([nx, ny, dist + 1]);
      }
    }

    if (distance.length > 0) {
      distance.sort((a, b) => a[0] - b[0] || a[2] - b[2] || a[1] - b[1]);
      return distance[0];
    } else return false;
  }

  let fish_cnt = fish_pos.length;
  let time = 0;
  let [shark_x, shark_y] = shark_pos;
  board[shark_y][shark_x] = 0;

  while (fish_cnt) {
    let result = bfs(shark_x, shark_y);
    if (!result) break;
    [shark_x, shark_y] = result.slice(1);
    time += result[0];
    eat_cnt += 1;
    fish_cnt -= 1;
    if (shark_size === eat_cnt) {
      shark_size += 1;
      eat_cnt = 0;
    }
    board[shark_y][shark_x] = 0;
  }

  return time;
}

const n = Number(input[0]);
const board = input.slice(1, 1 + n).map((row) => row.split(' ').map(Number));
console.log(solution(n, board));
