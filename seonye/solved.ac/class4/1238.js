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

function solution(n, m, x, info) {
  const graph = Array.from({ length: n + 1 }, () => []);
  const graphR = Array.from({ length: n + 1 }, () => []);

  info.forEach((i) => {
    const [start, end, time] = i;
    graph[start].push([end, time]);
    graphR[end].push([start, time]);
  });

  function dijkstra(graph) {
    let pq = new Heap((a, b) => a[0] - b[0]);
    let distance = new Array(n + 1).fill(Infinity);

    pq.push([x, 0]);
    distance[x] = 0;

    while (pq.size() !== 0) {
      let [now, dist] = pq.pop();
      if (distance[now] < dist) continue;

      for (let next of graph[now]) {
        const [nxNode, nxCost] = next;
        let cost = dist + nxCost;
        if (cost < distance[nxNode]) {
          distance[nxNode] = cost;
          pq.push([nxNode, cost]);
        }
      }
    }

    return distance;
  }

  const goDistance = dijkstra(graph);
  const backDistance = dijkstra(graphR);

  let answer = -1;

  for (let i = 1; i < n + 1; i++) {
    answer = Math.max(goDistance[i] + backDistance[i], answer);
  }

  return answer;
}

const [n, m, x] = input[0].split(' ').map(Number);
const info = input.slice(1, 1 + m).map((row) => row.split(' ').map(Number));

console.log(solution(n, m, x, info));
