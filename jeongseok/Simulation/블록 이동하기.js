class Queue {
  head = 0;
  tail = 0;
  size = 0;

  data = {};

  enqueue(input) {
    this.data[this.tail++] = input;
    this.size++;
  }

  dequeue() {
    const val = this.data[this.head];
    delete this.data[this.head++];
    this.size--;
    return val;
  }
}

function validatePos(x1, y1, x2, y2, n) {
  if (x1 < 0 || y1 < 0 || x2 >= n || y2 >= n) {
    return false;
  }
  return true;
}

function solution(board) {
  const isVisited = new Set();
  // y1 x1 y2 x2
  isVisited.add("0001");

  function bfs(n) {
    const queue = new Queue();
    queue.enqueue({ x1: 0, y1: 0, x2: 1, y2: 0, move: 0 });

    while (queue.size) {
      console.log(queue.data);

      const { x1, y1, x2, y2, move } = queue.dequeue();

      if ((x1 === n - 1 && y1 === n - 1) || (x2 === n - 1 && y2 === n - 1)) {
        console.log("add");
        return move;
      }

      for (let i = 0; i < 8; i++) {
        let x11, x22, y11, y22;

        // 가로 왼쪽 이동
        if (i === 0) {
          x11 = x1 - 1;
          y11 = y1;
          x22 = x2 - 1;
          y22 = y2;

          // 불가능한 좌표
          if (!validatePos(x11, y11, x22, y22)) {
            continue;
          }

          // 벽
          if (board[y11][x11] === 1 || board[y22][x22] === 1) {
            continue;
          }

          const str = [y11, x11, y22, x22];

          // 이미 방문
          if (isVisited.has(str.join(""))) {
            continue;
          }

          isVisited.add(str.join(""));
          queue.enqueue({ x1: x11, y1: y11, x2: x22, y2: y22, move: move + 1 });
        }

        // 가로 오른쪽 이동
        if (i === 1) {
          x11 = x1 + 1;
          y11 = y1;
          x22 = x2 + 1;
          y22 = y2;

          // 불가능한 좌표
          if (!validatePos(x11, y11, x22, y22, n)) {
            continue;
          }

          // 벽
          if (board[y11][x11] === 1 || board[y22][x22] === 1) {
            continue;
          }

          const str = [y11, x11, y22, x22];

          // 이미 방문
          if (isVisited.has(str.join(""))) {
            continue;
          }

          isVisited.add(str.join(""));
          queue.enqueue({ x1: x11, y1: y11, x2: x22, y2: y22, move: move + 1 });
        }

        // 위로 이동
        if (i === 2) {
          x11 = x1;
          y11 = y1 - 1;
          x22 = x2;
          y22 = y2 - 1;

          // 불가능한 좌표
          if (!validatePos(x11, y11, x22, y22, n)) {
            continue;
          }

          // 벽
          if (board[y11][x11] === 1 || board[y22][x22] === 1) {
            continue;
          }

          const str = [y11, x11, y22, x22];

          // 이미 방문
          if (isVisited.has(str.join(""))) {
            continue;
          }

          isVisited.add(str.join(""));
          queue.enqueue({ x1: x11, y1: y11, x2: x22, y2: y22, move: move + 1 });
        }

        // 아래로 이동
        if (i === 3) {
          x11 = x1;
          y11 = y1 + 1;
          x22 = x2;
          y22 = y2 + 1;

          // 불가능한 좌표
          if (!validatePos(x11, y11, x22, y22, n)) {
            continue;
          }

          // 벽
          if (board[y11][x11] === 1 || board[y22][x22] === 1) {
            continue;
          }

          const str = [y11, x11, y22, x22];

          // 이미 방문
          if (isVisited.has(str.join(""))) {
            continue;
          }

          isVisited.add(str.join(""));
          queue.enqueue({ x1: x11, y1: y11, x2: x22, y2: y22, move: move + 1 });
        }

        // 왼쪽 대각 위 이동
        if (i === 4) {
          x11 = x1;
          y11 = y1 - 1;
          x22 = x1;
          y22 = y1;

          // 불가능한 좌표
          if (!validatePos(x11, y11, x22, y22, n)) {
            continue;
          }

          // 벽
          if (board[y11][x11] === 1 || board[y22][x22] === 1) {
            continue;
          }

          // 대각에 벽
          if (board[y11][x11 + 1] === 1) {
            continue;
          }

          const str = [y11, x11, y22, x22];

          // 이미 방문
          if (isVisited.has(str.join(""))) {
            continue;
          }

          isVisited.add(str.join(""));
          queue.enqueue({ x1: x11, y1: y11, x2: x22, y2: y22, move: move + 1 });
        }

        // 왼쪽 대각 아래 이동
        if (i === 5) {
          x11 = x1;
          y11 = y1;
          x22 = x1;
          y22 = y1 + 1;

          // 불가능한 좌표
          if (!validatePos(x11, y11, x22, y22, n)) {
            continue;
          }

          // 벽
          if (board[y11][x11] === 1 || board[y22][x22] === 1) {
            continue;
          }

          // 대각에 벽
          if (board[y22][x22 + 1] === 1) {
            continue;
          }

          const str = [y11, x11, y22, x22];

          // 이미 방문
          if (isVisited.has(str.join(""))) {
            continue;
          }

          isVisited.add(str.join(""));
          queue.enqueue({ x1: x11, y1: y11, x2: x22, y2: y22, move: move + 1 });
        }

        // 오른쪽 대각 위 이동
        if (i === 6) {
          x11 = x2;
          y11 = y2 - 1;
          x22 = x2;
          y22 = y2;

          // 불가능한 좌표
          if (!validatePos(x11, y11, x22, y22, n)) {
            continue;
          }

          // 벽
          if (board[y11][x11] === 1 || board[y22][x22] === 1) {
            continue;
          }

          // 대각에 벽
          if (board[y11][x11 - 1] === 1) {
            continue;
          }

          const str = [y11, x11, y22, x22];

          // 이미 방문
          if (isVisited.has(str.join(""))) {
            continue;
          }

          isVisited.add(str.join(""));
          queue.enqueue({ x1: x11, y1: y11, x2: x22, y2: y22, move: move + 1 });
        }

        // 오른쪽 대각 아래 이동
        if (i === 7) {
          x11 = x2;
          y11 = y2;
          x22 = x2;
          y22 = y2 + 1;

          // 불가능한 좌표
          if (!validatePos(x11, y11, x22, y22, n)) {
            continue;
          }

          // 벽
          if (board[y11][x11] === 1 || board[y22][x22] === 1) {
            continue;
          }

          // 대각에 벽
          if (board[y22][x22 - 1] === 1) {
            continue;
          }

          const str = [y11, x11, y22, x22];

          // 이미 방문
          if (isVisited.has(str.join(""))) {
            continue;
          }

          isVisited.add(str.join(""));
          queue.enqueue({ x1: x11, y1: y11, x2: x22, y2: y22, move: move + 1 });
        }
      }
    }
  }

  const answer = bfs(board[0].length);

  return answer;
}

solution([
  [0, 0, 0, 1, 1],
  [0, 0, 0, 1, 0],
  [0, 1, 0, 1, 1],
  [1, 1, 0, 0, 1],
  [0, 0, 0, 0, 0],
]);
