//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
4 1
1 2
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

class PQ {
  constructor(cmp) {
    this.arr = [];
    this.cmp = (a, b) => cmp(this.arr[a], this.arr[b]);
  }
  push(data) {
    this.arr.push(data);
    let now = this.lastIdx();

    while (now > 0) {
      const parent = this.parent(now);
      if (this.cmp(now, parent) < 0) {
        this.swap(now, parent);
        now = parent;
      } else {
        break;
      }
    }
  }
  pop() {
    this.swap(0, this.lastIdx());
    const result = this.arr.pop();

    let now = 0;

    while (this.arr[this.left(now)] !== undefined) {
      let next = this.left(now);
      const right = this.right(now);

      if (this.arr[right] !== undefined && this.cmp(right, next) < 0) {
        next = right;
      }
      if (this.cmp(next, now) < 0) {
        this.swap(next, now);
        now = next;
      } else {
        break;
      }
    }
    return result;
  }
  swap = (a, b) => {
    [this.arr[a], this.arr[b]] = [this.arr[b], this.arr[a]];
  };
  isEmpty = () => this.arr.length === 0;
  lastIdx = () => this.arr.length - 1;
  parent = (idx) => Math.floor((idx - 1) / 2);
  left = (idx) => idx * 2 + 1;
  right = (idx) => idx * 2 + 2;
}
function solution(N, questions) {
  const pq = new PQ((a, b) => a - b);
  const inDegrees = Array(N + 1).fill(0);
  const graph = new Map();
  let result = "";

  questions.forEach(([from, to]) => {
    if (graph.has(from)) {
      graph.get(from).push(to);
    } else {
      graph.set(from, [to]);
    }

    inDegrees[to]++;
  });

  for (let i = 1; i < inDegrees.length; i++) {
    if (inDegrees[i] === 0) {
      pq.push(i);
    }
  }

  while (!pq.isEmpty()) {
    const now = pq.pop();

    result += `${now} `;

    for (const next of graph.get(now) ?? []) {
      if (--inDegrees[next] === 0) {
        pq.push(next);
      }
    }
  }

  return result;
}
const [N, M] = input();
const questions = Array.from({ length: M }, () => input());
console.log(solution(N, questions));

// 1 ~ N번 문제, 문제는 난이도 순서
// 먼저 푸는것이 좋은문제
// N개는 모두 품, 먼저 푸는게 좋으면 먼저품, 가능하면 쉬운 문제부터 품
// 위상정렬인데 낮은 숫자가 먼저 앞으로 오도록 해야함
// 이를위해 우선순위큐로 낮은 숫자가 앞으로 오도록 해야할듯
