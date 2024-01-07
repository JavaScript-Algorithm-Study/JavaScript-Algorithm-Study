function solution(n, m, x, y, r, c, k) {
  const direction = [
    ["d", 1, 0],
    ["l", 0, -1],
    ["r", 0, 1],
    ["u", -1, 0],
  ];

  const shortestPath = Array.from(Array(n), () =>
    Array.from(Array(m), () => Array(k + 1).fill(""))
  );

  const bfs = (startR, startC) => {
    const queue = new Queue();
    queue.enqueue([startR, startC, 0]);

    while (!queue.isEmpty()) {
      const [curR, curC, length] = queue.dequeue();
      const path = shortestPath[curR][curC][length];

      const distance = calcDistance(curR, curC, r - 1, c - 1);
      const remain = k - length;
      if (distance > remain) {
        continue;
      }

      if ((remain - distance) % 2 !== 0) {
        continue;
      }

      if (length === k) {
        continue;
      }

      const nextLength = length + 1;

      for (let i = 0; i < direction.length; i++) {
        const [dir, dr, dc] = direction[i];
        const nextR = curR + dr;
        const nextC = curC + dc;
        if (outOfRange(nextR, nextC, n, m)) {
          continue;
        }

        const nextPath = path + dir;
        const nextShortestPath = shortestPath[nextR][nextC][nextLength];
        if (nextShortestPath !== "" && nextShortestPath <= nextPath) {
          continue;
        }

        shortestPath[nextR][nextC][nextLength] = nextPath;
        queue.enqueue([nextR, nextC, nextLength]);
      }
    }
  };

  bfs(x - 1, y - 1);

  return shortestPath[r - 1][c - 1][k] || "impossible";
}

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class Queue {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  enqueue(value) {
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.head = this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    this.length += 1;
  }

  dequeue() {
    if (this.isEmpty()) {
      return;
    }

    const value = this.head.value;
    if (this.length === 1) {
      this.head = this.tail = null;
    } else {
      this.head = this.head.next;
    }
    this.length -= 1;
    return value;
  }

  isEmpty() {
    return this.length === 0;
  }
}

function outOfRange(r, c, R, C) {
  return r < 0 || c < 0 || R <= r || C <= c;
}

function calcDistance(r1, c1, r2, c2) {
  return Math.abs(r1 - r2) + Math.abs(c1 - c2);
}
