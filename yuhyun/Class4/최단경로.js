const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(nVertex, nEdge, start, edges) {
  const NO_CONNECTION = Infinity;
  return getMinDistances(nVertex, start, createSingleEdgeGraph(nVertex, edges))
    .map((v) => (v === NO_CONNECTION ? 'INF' : v))
    .join('\n');

  function getMinDistances(nVertex, start, graph) {
    const DISTANCE = 1;

    const asecendingDistance = (a, b) => a[DISTANCE] - b[DISTANCE];
    const minHeap = new Heap(asecendingDistance);

    const result = Array(nVertex + 1).fill(NO_CONNECTION);
    result[start] = 0;

    graph[start].forEach(([next, weight]) => {
      result[next] = weight;
      minHeap.push([next, weight]);
    });

    while (!minHeap.isEmpty()) {
      const [node, distance] = minHeap.pop();

      if (result[node] !== distance) {
        continue;
      }

      graph[node]
        .filter(([next, weight]) => weight + distance < result[next])
        .forEach(([next, weight]) => {
          const nextDistance = distance + weight;
          result[next] = nextDistance;
          minHeap.push([next, nextDistance]);
        });
    }

    result.shift();
    return result;
  }

  function createSingleEdgeGraph(V, edges) {
    const result = Array.from(Array(V + 1), () => new Map());
    edges.forEach(([nodeFrom, nodeTo, weight]) => {
      const neighborhood = result[nodeFrom];
      const prevWeight = neighborhood.get(nodeTo);
      if (prevWeight !== undefined && weight > prevWeight) {
        return;
      }
      neighborhood.set(nodeTo, weight);
    });
    return result.map((neighborhood) => [...neighborhood]);
  }
}

class Heap {
  constructor(compareFn) {
    this.compareFn = compareFn;
    this.heap = [];
  }

  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  pop() {
    if (this.isEmpty()) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const result = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return result;
  }

  heapifyUp() {
    let cur = this.heap.length - 1;
    while (
      this.hasParent(cur) &&
      this.compareFn(this.heap[cur], this.heap[this.getParentIndex(cur)]) < 0
    ) {
      const parent = this.getParentIndex(cur);
      this.swap(cur, parent);
      cur = parent;
    }
  }

  heapifyDown() {
    let cur = 0;
    while (this.hasLeftChild(cur)) {
      const nextIsRight =
        this.hasRightChild(cur) &&
        this.compareFn(
          this.heap[this.getRightChildIndex(cur)],
          this.heap[this.getLeftChildIndex(cur)]
        ) < 0;

      const next = nextIsRight ? this.getRightChildIndex(cur) : this.getLeftChildIndex(cur);

      if (this.compareFn(this.heap[cur], this.heap[next]) <= 0) {
        break;
      }

      this.swap(cur, next);
      cur = next;
    }
  }

  getLeftChildIndex(parentIndex) {
    return parentIndex * 2 + 1;
  }

  getRightChildIndex(parentIndex) {
    return parentIndex * 2 + 2;
  }

  getParentIndex(childIndex) {
    return Math.floor((childIndex - 1) / 2);
  }

  hasLeftChild(parentIndex) {
    return this.getLeftChildIndex(parentIndex) < this.heap.length;
  }

  hasRightChild(parentIndex) {
    return this.getRightChildIndex(parentIndex) < this.heap.length;
  }

  hasParent(childIndex) {
    return this.getParentIndex(childIndex) >= 0;
  }

  swap(indexA, indexB) {
    [this.heap[indexA], this.heap[indexB]] = [this.heap[indexB], this.heap[indexA]];
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

const [V, E] = input.shift().split(' ').map(Number);
const K = Number(input.shift());
const edges = input.map((line) => line.split(' ').map(Number));
console.log(solution(V, E, K, edges));
