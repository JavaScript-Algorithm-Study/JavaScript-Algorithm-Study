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

  hasLeftChild = (parentIndex) => this.getLeftChildIndex(parentIndex) < this.heap.length;
  hasRightChild = (parentIndex) => this.getRightChildIndex(parentIndex) < this.heap.length;
  hasParent = (childIndex) => this.getParentIndex(childIndex) >= 0;

  size = () => this.heap.length;
  swap = (a, b) => ([this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]]);
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
    while (this.hasParent(cur) && this.compareFn(this.heap[cur], this.heap[this.getParentIndex(cur)]) < 0) {
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
        this.compareFn(this.heap[this.getRightChildIndex(cur)], this.heap[this.getLeftChildIndex(cur)]) < 0
      ) {
        smallerChildIndex = this.getRightChildIndex(cur);
      }
      if (this.compareFn(this.heap[cur], this.heap[smallerChildIndex]) <= 0) break;

      this.swap(cur, smallerChildIndex);
      cur = smallerChildIndex;
    }
  }
}

function solution(V, E, startNode, info) {
  const graph = Array.from({ length: V + 1 }, () => []);

  for (let i = 0; i < info.length; i++) {
    const [u, v, w] = info[i];
    graph[u].push([v, w]);
  }

  const q = new Heap((a, b) => a[2] - b[2] || a[1] - b[1]);
  const distance = new Array(V + 1).fill(Infinity);
  const visited = Array.from({ length: V + 1 }, () => false);

  distance[startNode] = 0;
  q.push([startNode, 0]);

  while (q.size() !== 0) {
    const [curNode, cost] = q.pop();

    if (visited[curNode]) continue;

    visited[curNode] = true;
    for (let [nextNode, nextCost] of graph[curNode]) {
      if (distance[nextNode] > distance[curNode] + nextCost) {
        distance[nextNode] = distance[curNode] + nextCost;
        q.push([nextNode, distance[nextNode]]);
      }
    }
  }

  return distance
    .slice(1, 1 + V)
    .map((dist) => (dist === Infinity ? 'INF' : dist))
    .join('\n');
}

const [V, E] = input[0].split(' ').map(Number);
const startNode = Number(input[1]);
const info = input.slice(2, 2 + E).map((row) => row.split(' ').map(Number));

console.log(solution(V, E, startNode, info));
