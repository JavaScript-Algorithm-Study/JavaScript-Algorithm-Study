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

const path = require('path');
const fs = require('fs');
const input = fs
  .readFileSync(path.join(__dirname, 'dev', 'stdin'))
  .toString()
  .trim()
  .split('\n')
  .map((i) => i.trim());

const graph = new Heap((a, b) => a[2] - b[2]);

const [V, E] = input[0].split(' ').map(Number);

for (let i = 1; i < E + 1; i++) {
  const [A, B, C] = input[i].split(' ').map(Number);
  graph.push([A, B, C]);
}

function getParent(parent, x) {
  if (parent[x] === x) return x;
  return (parent[x] = getParent(parent, parent[x]));
}

function unionParent(parent, a, b) {
  let a_parent = getParent(parent, a);
  let b_parent = getParent(parent, b);
  if (a_parent < b_parent) parent[b_parent] = a_parent;
  else parent[a_parent] = b_parent;
}

function findParent(parent, a, b) {
  let a_parent = getParent(parent, a);
  let b_parent = getParent(parent, b);
  if (a_parent == b_parent) return true;
  return false;
}

let parent = new Array(V + 1).fill(0);
parent.forEach((v, i) => {
  parent[i] = i;
});

let answer = 0;

while (graph.size() > 0) {
  const [start, end, cost] = graph.pop();
  if (!findParent(parent, start, end)) {
    unionParent(parent, start, end);
    answer += cost;
  }
}

console.log(answer);
