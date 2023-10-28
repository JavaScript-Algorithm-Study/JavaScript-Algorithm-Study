function solution(scoville, K) {
  let count = 0;
  const minHeap = new Heap((a, b) => a - b);

  scoville.forEach((degree) => minHeap.push(degree));

  while (minHeap.top() < K) {
    if (minHeap.size() === 1) {
      return -1;
    }

    const first = minHeap.pop();
    const second = minHeap.pop();
    const mixed = first + second * 2;

    minHeap.push(mixed);

    count += 1;
  }

  return count;
}

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
    if (this.heap.length <= 1) {
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
    let cur = this.heap.length - 1;
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

      if (this.compareFn(this.heap[cur], this.heap[next]) < 0) {
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
