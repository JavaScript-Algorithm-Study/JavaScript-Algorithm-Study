class MinHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  push({ L, P }) {
    this.heap.push({ L, P });

    let curIdx = this.size() - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);

    while (curIdx > 0 && this.heap[curIdx].L <= this.heap[parIdx].L) {
      if (this.heap[curIdx].L === this.heap[parIdx].L) {
        if (this.heap[curIdx].P < this.heap[parIdx].P) {
          [this.heap[curIdx], this.heap[parIdx]] = [this.heap[parIdx], this.heap[curIdx]];
        }
        curIdx = parIdx;
        parIdx = Math.floor((curIdx - 1) / 2);
      } else {
        [this.heap[curIdx], this.heap[parIdx]] = [this.heap[parIdx], this.heap[curIdx]];
        curIdx = parIdx;
        parIdx = Math.floor((curIdx - 1) / 2);
      }
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
      }
      // 왼쪽 난이도가 더 낮다면
      else if (this.heap[leftIdx].L < this.heap[rightIdx].L) {
        changeIdx = leftIdx;
      }
      // 난이도가 같으면
      else if (this.heap[leftIdx].L === this.heap[rightIdx].L) {
        // 문제번호가 왼쪽이 더 작으면
        if (this.heap[leftIdx].P < this.heap[rightIdx].P) {
          changeIdx = leftIdx;
        } else {
          changeIdx = rightIdx;
        }
      } else {
        changeIdx = rightIdx;
      }

      // 부모의 난이도가 더 크면
      if (this.heap[curIdx].L > this.heap[changeIdx].L) {
        [this.heap[curIdx], this.heap[changeIdx]] = [this.heap[changeIdx], this.heap[curIdx]];
        curIdx = changeIdx;
      }
      // 난이도는 같으면 부모의 번호가 더 크면
      else if (this.heap[curIdx].L === this.heap[changeIdx].L) {
        if (this.heap[curIdx].P > this.heap[changeIdx].P) {
          [this.heap[curIdx], this.heap[changeIdx]] = [this.heap[changeIdx], this.heap[curIdx]];
          curIdx = changeIdx;
        } else {
          break;
        }
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

class MaxHeap {
  constructor() {
    this.heap = [];
  }

  size() {
    return this.heap.length;
  }

  push({ L, P }) {
    this.heap.push({ L, P });

    let curIdx = this.size() - 1;
    let parIdx = Math.floor((curIdx - 1) / 2);

    while (curIdx > 0 && this.heap[curIdx].L >= this.heap[parIdx].L) {
      if (this.heap[curIdx].L === this.heap[parIdx].L) {
        if (this.heap[curIdx].P > this.heap[parIdx].P) {
          [this.heap[curIdx], this.heap[parIdx]] = [this.heap[parIdx], this.heap[curIdx]];
        }
        curIdx = parIdx;
        parIdx = Math.floor((curIdx - 1) / 2);
      } else {
        [this.heap[curIdx], this.heap[parIdx]] = [this.heap[parIdx], this.heap[curIdx]];
        curIdx = parIdx;
        parIdx = Math.floor((curIdx - 1) / 2);
      }
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
      }

      // 왼쪽 난이도가 더 높다면
      else if (this.heap[leftIdx].L > this.heap[rightIdx].L) {
        changeIdx = leftIdx;
      }
      // 난이도가 같으면
      else if (this.heap[leftIdx].L === this.heap[rightIdx].L) {
        // 문제번호가 왼쪽이 더 높으면
        if (this.heap[leftIdx].P > this.heap[rightIdx].P) {
          changeIdx = leftIdx;
        } else {
          changeIdx = rightIdx;
        }
      } else {
        changeIdx = rightIdx;
      }

      // 부모의 난이도가 더 크면
      if (this.heap[curIdx].L < this.heap[changeIdx].L) {
        [this.heap[curIdx], this.heap[changeIdx]] = [this.heap[changeIdx], this.heap[curIdx]];
        curIdx = changeIdx;
      }
      // 난이도는 같으면 부모의 번호가 더 크면
      else if (this.heap[curIdx].L === this.heap[changeIdx].L) {
        if (this.heap[curIdx].P < this.heap[changeIdx].P) {
          [this.heap[curIdx], this.heap[changeIdx]] = [this.heap[changeIdx], this.heap[curIdx]];
          curIdx = changeIdx;
        } else {
          break;
        }
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
const input = require("fs").readFileSync("input.txt").toString().trim().split("\n");

const N = +input[0];

const minHeap = new MinHeap();
const maxHeap = new MaxHeap();

const answer = [];

let solvedMap = new Map();

for (let i = 0; i < N; i++) {
  const [P, L] = input[i + 1].split(" ").map(Number);
  minHeap.push({ L, P });
  maxHeap.push({ L, P });
  solvedMap.set(P, L);
}

const M = +input[N + 1];

for (let i = 1; i < M + 1; i++) {
  const [command, ...args] = input[N + 1 + i].split(" ");

  if (command === "add") {
    minHeap.push({ P: +args[0], L: +args[1] });
    maxHeap.push({ P: +args[0], L: +args[1] });
    solvedMap.set(+args[0], +args[1]);
  }
  if (command === "recommend") {
    if (+args[0] === 1) {
      while (solvedMap.get(maxHeap.peek().P)) {
        // 푼적 있다면
        if (solvedMap.get(maxHeap.peek().P) !== maxHeap.peek().L) {
          maxHeap.pop();
        } else {
          break;
        }
      }
      const max = maxHeap.peek();
      answer.push(max.P);
    }

    if (+args[0] === -1) {
      while (solvedMap.get(minHeap.peek().P)) {
        // 푼적 있다면
        if (solvedMap.get(minHeap.peek().P) !== minHeap.peek().L) {
          minHeap.pop();
        } else {
          break;
        }
      }
      const min = minHeap.peek();
      answer.push(min.P);
    }
  }

  if (command === "solved") {
    solvedMap.set(+args[0], solvedMap.get(+args[0]) + 1);
  }
}
console.log(answer.join("\n"));
