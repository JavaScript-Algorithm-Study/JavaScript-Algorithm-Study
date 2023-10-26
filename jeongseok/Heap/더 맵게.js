class Heap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  push(value) {
    this.heap.push(value);

    // 마지막 index부터 탐색
    let curIdx = this.size() - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);

    // 자식이 부모보다 작으면
    while (curIdx > 0 && this.heap[curIdx] < this.heap[parIdx]) {
      [this.heap[curIdx], this.heap[parIdx]] = [this.heap[parIdx], this.heap[curIdx]];
      curIdx = parIdx;
      parIdx = Math.floor((curIdx - 1) / 2);
    }
  }

  pop() {
    if (this.size() === 1) {
      return this.heap.pop();
    }

    [this.heap[0], this.heap[this.size() - 1]] = [this.heap[this.size() - 1], this.heap[0]];
    const popValue = this.heap.pop();

    let curIdx = 0;

    while (1) {
      let leftIdx = curIdx * 2 + 1;
      let rightIdx = curIdx * 2 + 2;

      if (!this.heap[leftIdx]) {
        break;
      }

      let changeIdx;

      if (!this.heap[rightIdx]) {
        changeIdx = leftIdx;
      } else if (this.heap[leftIdx] < this.heap[rightIdx]) {
        changeIdx = leftIdx;
      } else {
        changeIdx = rightIdx;
      }

      if (this.heap[curIdx] > this.heap[changeIdx]) {
        [this.heap[curIdx], this.heap[changeIdx]] = [this.heap[changeIdx], this.heap[curIdx]];
        curIdx = changeIdx;
      } else {
        break;
      }
    }

    return popValue;
  }

  peek() {
    return this.heap[0];
  }
}

function solution(scoville, K) {
  const minHeap = new Heap();

  for (let i = 0; i < scoville.length; i++) {
    minHeap.push(scoville[i]);
  }

  let count = 0;

  while (minHeap.size() >= 2 && minHeap.peek() < K) {
    const f = minHeap.pop();
    const s = minHeap.pop();
    const scov = f + s * 2;
    minHeap.push(scov);
    count++;
  }

  return minHeap.peek() < K ? -1 : count;
}
