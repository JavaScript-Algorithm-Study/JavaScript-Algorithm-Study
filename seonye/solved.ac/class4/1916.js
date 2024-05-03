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

function solution(n, m, info, start, end) {
  const cost = Array.from({ length: n + 1 }, () => []);

  for (let [n1, n2, c] of info) {
    cost[n1].push([n2, c]);
  }

  const distance = new Array(n + 1).fill(Infinity);

  function dijkstra(start) {
    let pq = new Heap((a, b) => a[0] - b[0]);
    pq.push([0, start]);
    distance[start] = 0;

    while (pq.size() !== 0) {
      let [dist, now] = pq.pop();
      if (distance[now] < dist) continue;

      for (let [next, nc] of cost[now]) {
        let cost = dist + nc;
        if (cost < distance[next]) {
          distance[next] = cost;
          pq.push([cost, next]);
        }
      }
    }
  }
  dijkstra(start);

  return distance[end];
}

const n = Number(input[0]);
const m = Number(input[1]);
const info = input.slice(2, m + 2).map((row) => row.trim().split(' ').map(Number));
const [start, end] = input[m + 2].split(' ').map(Number);

console.log(solution(n, m, info, start, end));
