// 다익스트라 + 이진탐색

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
  isEmpty = () => this.heap.length === 0;

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

  top = () => this.heap[0];

  heapifyUp = () => {
    let cur = this.size() - 1;
    while (
      this.hasParent(cur) &&
      this.compareFn(this.heap[cur], this.heap[this.getParentIndex(cur)]) < 0
    ) {
      const next = this.getParentIndex(cur);
      this.swap(cur, next);
      cur = next;
    }
  };

  heapifyDown = () => {
    let cur = 0;
    while (this.hasLeftChild(cur)) {
      let smallerChildIndex = this.getLeftChildIndex(cur);
      if (
        this.hasRightChild(cur) &&
        this.compareFn(
          this.heap[this.getRightChildIndex(cur)],
          this.heap[smallerChildIndex]
        ) < 0
      ) {
        smallerChildIndex = this.getRightChildIndex(cur);
      }

      if (this.compareFn(this.heap[cur], this.heap[smallerChildIndex]) <= 0)
        break;

      this.swap(cur, smallerChildIndex);
      cur = smallerChildIndex;
    }
  };
}

function Dijkstra(costBudget, nodes, n) {
  const distances = new Array(n + 1).fill(Infinity);
  distances[1] = 0;
  const pq = new Heap((a, b) => a[0] - b[0]);

  pq.push([0, 1]);

  while (pq.size() > 0) {
    const [curCost, curNode] = pq.pop();

    if (distances[curNode] < curCost) continue;

    for (const [nextNode, nextCost] of nodes[curNode]) {
      if (costBudget < nextCost) {
        if (distances[nextNode] > curCost + 1) {
          distances[nextNode] = curCost + 1;
          pq.push([curCost + 1, nextNode]);
        }
      } else {
        if (distances[nextNode] > curCost) {
          distances[nextNode] = curCost;
          pq.push([curCost, nextNode]);
        }
      }
    }
  }

  return distances[n];
}

function solution(n, k, info) {
  let maxCost = 0;
  const graph = Array.from({ length: n + 1 }, () => []);
  info.forEach(([c1, c2, c]) => {
    graph[c1].push([c2, c]);
    graph[c2].push([c1, c]);
    maxCost = Math.max(maxCost, c);
  });

  let left = 0;
  let right = maxCost;
  let answer = Infinity;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (Dijkstra(mid, graph, n) <= k) {
      right = mid - 1;
      answer = mid;
    } else left = mid + 1;
  }

  if (answer === Infinity) return -1;
  else return answer;
}

const [n, p, k] = input[0].split(' ').map(Number);
const info = input.slice(1, 1 + p).map((i) => i.split(' ').map(Number));
console.log(solution(n, k, info));
