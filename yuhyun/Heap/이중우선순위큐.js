function solution(operations) {
  const doublyPriorityQueue = new DoublyPriorityQueue(
    (a, b) => a - b,
    (a, b) => b - a
  );

  operations.map(parseOperation).forEach(([op, num]) => {
    if (op === "I") {
      doublyPriorityQueue.push(num);
      return;
    }

    if (num === 1) {
      doublyPriorityQueue.popMax();
      return;
    }

    doublyPriorityQueue.popMin();
  });

  return [doublyPriorityQueue.max() ?? 0, doublyPriorityQueue.min() ?? 0];
}

function parseOperation(operation) {
  const [op, arg] = operation.split(" ");
  return [op, parseInt(arg, 10)];
}

class DoublyPriorityQueue {
  constructor(minCompareFn, maxCompareFn) {
    this.minHeap = new Heap(minCompareFn);
    this.maxHeap = new Heap(maxCompareFn);
    this.values = new Map();
  }

  push(value) {
    this.minHeap.push(value);
    this.maxHeap.push(value);
    this.values.set(value, (this.values.get(value) ?? 0) + 1);
  }

  popMin() {
    this.clear();
    return this.pop(this.minHeap);
  }

  popMax() {
    this.clear();
    return this.pop(this.maxHeap);
  }

  min() {
    this.clear();
    return this.minHeap.top();
  }

  max() {
    this.clear();
    return this.maxHeap.top();
  }

  pop(heap) {
    if (heap.isEmpty()) return null;

    const value = heap.pop();
    const valueCount = this.values.get(value);
    if (valueCount === 1) {
      this.values.delete(value);
    } else {
      this.values.set(value, valueCount - 1);
    }
    return value;
  }

  clear() {
    [this.minHeap, this.maxHeap].forEach((heap) => {
      while (!heap.isEmpty()) {
        const top = heap.top();
        if (this.values.has(top)) {
          break;
        }

        heap.pop();
      }
    });
  }
}

class Heap {
  constructor(compare) {
    this.heap = [];
    this.compare = compare;
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

  swap(a, b) {
    [this.heap[a], this.heap[b]] = [this.heap[b], this.heap[a]];
  }

  push(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  heapifyUp() {
    let cur = this.heap.length - 1;
    while (
      this.hasParent(cur) &&
      this.compare(this.heap[cur], this.heap[this.getParentIndex(cur)]) < 0
    ) {
      const parentIndex = this.getParentIndex(cur);
      this.swap(cur, parentIndex);
      cur = parentIndex;
    }
  }

  pop() {
    if (this.heap.length === 0) return null;
    if (this.heap.length === 1) return this.heap.pop();

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return value;
  }

  top() {
    return this.heap[0] ?? null;
  }

  heapifyDown() {
    let cur = 0;
    while (this.hasLeftChild(cur)) {
      const nextIsRight =
        this.hasRightChild(cur) &&
        this.compare(
          this.heap[this.getRightChildIndex(cur)],
          this.heap[this.getLeftChildIndex(cur)]
        ) < 0;
      const next = nextIsRight
        ? this.getRightChildIndex(cur)
        : this.getLeftChildIndex(cur);

      if (this.compare(this.heap[cur], this.heap[next]) <= 0) break;

      this.swap(cur, next);
      cur = next;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}
