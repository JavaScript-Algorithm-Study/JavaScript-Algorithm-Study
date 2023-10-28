const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

class Heap {
  constructor(compareFn) {
    this.compareFn = compareFn;
    this.heap = [];
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
    return 0 <= this.getParentIndex(childIndex);
  }

  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  pop() {
    if (this.size() <= 1) {
      return this.heap.pop();
    }

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
      const nextIsRight =
        this.hasRightChild(cur) &&
        this.compareFn(
          this.heap[this.getRightChildIndex(cur)],
          this.heap[this.getLeftChildIndex(cur)]
        ) < 0;

      const next = nextIsRight
        ? this.getRightChildIndex(cur)
        : this.getLeftChildIndex(cur);

      if (this.compareFn(this.heap[cur], this.heap[next]) <= 0) {
        break;
      }

      this.swap(cur, next);
      cur = next;
    }
  }

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }
}

function solution(N, M, problemList, commandList) {
  const P = 0;
  const L = 1;

  const result = [];

  const unsolvedMap = new Map();
  const solvedMap = new Map();

  const minHeap = new Heap((a, b) => a[L] - b[L] || a[P] - b[P]);
  const maxHeap = new Heap((a, b) => b[L] - a[L] || b[P] - a[P]);

  const clearHeap = (heap, solvedMap) => {
    while (true) {
      const [problem, level] = heap.top();
      const solvedSet = solvedMap.get(problem);
      const notSolved = !solvedSet?.has(level);

      if (notSolved) {
        break;
      }

      heap.pop();
    }
  };

  problemList.forEach(([problem, level]) => {
    minHeap.push([problem, level]);
    maxHeap.push([problem, level]);
    unsolvedMap.set(problem, level);
  });

  commandList.forEach(([command, arg1, arg2]) => {
    switch (command) {
      case "add":
        minHeap.push([arg1, arg2]);
        maxHeap.push([arg1, arg2]);
        unsolvedMap.set(arg1, arg2);
        break;
      case "solved":
        const level = unsolvedMap.get(arg1);
        unsolvedMap.delete(arg1);

        const solvedSet = solvedMap.get(arg1) ?? new Set();
        solvedSet.add(level);
        solvedMap.set(arg1, solvedSet);
        break;
      case "recommend":
        const targetHeap = arg1 === 1 ? maxHeap : minHeap;
        clearHeap(targetHeap, solvedMap);
        const [problem] = targetHeap.top();
        result.push(problem);
        break;
    }
  });

  return result.join("\n");
}

const toNumber = (string) => parseInt(string, 10);

const N = toNumber(input.shift());
const problemList = input
  .splice(0, N)
  .map((problemInfo) => problemInfo.split(" ").map(toNumber));
const M = toNumber(input.shift());
const commandList = input
  .splice(0, M)
  .map((commandInfo) => commandInfo.split(" "))
  .map(([command, ...args]) => [command, ...args.map(toNumber)]);

console.log(solution(N, M, problemList, commandList));
