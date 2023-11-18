class Node {
  constructor(data) {
    this.data = data;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  enqueue(data) {
    const node = new Node(data);

    if (!this.head) {
      this.head = node;
    } else {
      this.tail.next = node;
    }
    this.tail = node;
    this.size++;
  }

  dequeue() {
    if (this.size === 0) {
      return -1;
    }

    const node = this.head.data;
    this.head = this.head.next;

    if (!this.head) {
      this.tail = null;
    }

    this.size--;
    return node;
  }
}

const moveY = [1, 0, 0, -1];
const moveX = [0, -1, 1, 0];
const dir = ["d", "l", "r", "u"];

function solution(n, m, x, y, r, c, k) {
  let pathArr = Array.from(Array(n), () => Array(m).fill(""));

  function bfs(y, x) {
    const queue = new Queue();

    queue.enqueue({ y, x });

    while (queue.size) {
      const { y, x } = queue.dequeue();

      if (y === r - 1 && x === c - 1 && pathArr[y][x] === k) {
        break;
      }

      for (let i = 0; i < 4; i++) {
        const newY = y + moveY[i];
        const newX = x + moveX[i];

        // 움직일 수 있는 범위
        if (newY > -1 && newX > -1 && newY < n && newX < m) {
          // 해당 요소에 다른 depth에 도착했을 때 혹은 처음 도착했을 때
          if (pathArr[newY][newX].length < pathArr[y][x].length || pathArr[y][x].length === 0) {
            pathArr[newY][newX] = pathArr[y][x] + dir[i];
          }

          if (pathArr[newY][newX].length < k) {
            const curCost = pathArr[newY][newX].length;
            const cost = Math.abs(newY - (r - 1)) + Math.abs(newX - (c - 1)); // 남은 거리

            // 현재 지점과 목적지의 최단거리와 남은 거리의 2로 나눈 나머지가 같아야 탈출 가능
            if (cost % 2 === (k - curCost) % 2) {
              if (cost <= k - curCost) {
                queue.enqueue({ y: newY, x: newX });
                break; // 여기가 가장 중요함
              }
            }
          }
        }
      }
    }
  }

  bfs(x - 1, y - 1);

  if (pathArr[r - 1][c - 1].length === k) {
    return pathArr[r - 1][c - 1];
  } else {
    return "impossible";
  }
}

solution(3, 4, 2, 3, 3, 1, 5);
