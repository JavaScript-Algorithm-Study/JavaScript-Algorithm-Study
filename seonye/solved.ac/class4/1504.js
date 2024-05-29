const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

class Heap {
  constructor(compareFn) {
    this.compareFn = compareFn;
    this.heap = [];
  }

  getLeftChildIndex = (parentIndex) => parentIndex * 2 + 1;
  getRightChildIndex = (parentIndex) => parentIndex * 2 + 2;
  getParentIndex = (childIndex) => Math.floor((childIndex - 1) / 2);

  hasLeftChild = (parentIndex) =>
    this.getLeftChildIndex(parentIndex) < this.heap.length;
  hasRightChild = (parentIndex) =>
    this.getRightChildIndex(parentIndex) < this.heap.length;
  hasParent = (childIndex) => this.getParentIndex(childIndex) >= 0;

  size = () => this.heap.length;
  swap = (a, b) =>
    ([this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]);
  isEmpty = () => this.size() === 0;

  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  pop() {
    if (this.size() <= 1) return this.heap.pop();

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();

    return value;
  }

  top() {
    return this.heap[0];
  }

  heapifyUp() {
    let cur = this.size() - 1;
    while (
      this.hasParent(cur) &&
      this.compareFn(this.heap[cur], this.heap[this.getParentIndex(cur)]) < 0
    ) {
      const next = this.getParentIndex(cur);
      this.swap(cur, next);
      cur = next;
    }
  }

  heapifyDown() {
    let cur = 0;
    while (this.hasLeftChild(cur)) {
      let smallerChildIndex = this.getLeftChildIndex(cur);

      if (
        this.hasRightChild(cur) &&
        this.compareFn(
          this.heap[this.getRightChildIndex(cur)],
          this.heap[this.getLeftChildIndex(cur)]
        ) < 0
      ) {
        smallerChildIndex = this.getRightChildIndex(cur);
      }
      if (this.compareFn(this.heap[cur], this.heap[smallerChildIndex]) <= 0)
        break;

      this.swap(cur, smallerChildIndex);
      cur = smallerChildIndex;
    }
  }
}

function solution(n, info, v1, v2) {
  const board = Array.from({ length: n + 1 }, () => []);

  info.forEach((i) => {
    const [a, b, c] = i;
    board[a].push([b, c]);
    board[b].push([a, c]);
  });

  function dikjstra(start, end, board) {
    const q = new Heap((a, b) => a[1] - b[1]);
    const dist = new Array(n + 1).fill(Infinity);
    q.push([start, 0]);
    dist[start] = 0;

    while (q.size() !== 0) {
      let [now, cost] = q.pop();
      if (dist[now] < cost) continue;

      for (const [next, nCost] of board[now]) {
        const nc = cost + nCost;
        if (nc < dist[next]) {
          dist[next] = nc;
          q.push([next, nc]);
        }
      }
    }

    return dist[end];
  }
  const startTov1 = dikjstra(1, v1, board);
  const startTov2 = dikjstra(1, v2, board);
  const v1Tov2 = dikjstra(v1, v2, board);
  const v2Tov1 = dikjstra(v2, v1, board);
  const v1ToEnd = dikjstra(v1, n, board);
  const v2ToEnd = dikjstra(v2, n, board);

  let result = Math.min(
    startTov1 + v1Tov2 + v2ToEnd,
    startTov2 + v2Tov1 + v1ToEnd
  );
  if (result === Infinity) result = -1;

  return result;
}

const [n, e] = input[0].split(' ').map(Number);
const info = input.slice(1, 1 + e).map((row) => row.split(' ').map(Number));
const [v1, v2] = input[1 + e].split(' ').map(Number);
console.log(solution(n, info, v1, v2));
