/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/42628?language=javascript
난이도 : Level3
*/

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

  enqueue(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  dequeue() {
    if (this.size() <= 1) return this.heap.pop();

    const value = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.heapifyDown();
    return value;
  }

  pop() {
    this.heap.sort((a, b) => a - b);
    const value = this.heap.pop();
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

function solution(operations) {
  var answer = [];
  const minHeap = new Heap((a, b) => a - b);

  operations.forEach((operation) => {
    const [opt, num] = operation.split(' ');

    switch (opt) {
      case 'I':
        minHeap.enqueue(Number(num));
        break;
      case 'D':
        if (minHeap.isEmpty()) break;
        if (num === '1') {
          minHeap.pop();
        } else if (num === '-1') {
          minHeap.dequeue();
        }
        break;
    }
    console.log(minHeap.heap);
  });

  if (minHeap.isEmpty()) {
    answer = [0, 0];
  } else {
    answer.push(minHeap.pop());
    answer.push(minHeap.dequeue());
  }

  return answer;
}
