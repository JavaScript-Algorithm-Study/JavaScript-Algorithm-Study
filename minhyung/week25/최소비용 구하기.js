//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
5
8
1 2 2
1 3 3
1 4 1
1 5 10
2 4 2
3 4 1
3 5 1
4 5 3
1 5
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

class PQ {
  constructor(cmp) {
    this.cmp = (a, b) => cmp(this.arr[a], this.arr[b]);
    this.arr = [];
  }
  push(data) {
    this.arr.push(data);

    let now = this.#lastIdx();

    while (now > 0) {
      const parent = this.#parent(now);

      if (this.cmp(now, parent) < 0) {
        this.#swap(now, parent);
        now = parent;
      } else {
        break;
      }
    }
  }
  pop() {
    this.#swap(0, this.#lastIdx());
    const result = this.arr.pop();

    let now = 0;
    let left = 1;
    let right = 2;

    while (this.arr[left] !== undefined) {
      let nextChild = left;

      if (this.arr[right] !== undefined && this.cmp(right, left) < 0) {
        nextChild = right;
      }

      if (this.cmp(nextChild, now) < 0) {
        this.#swap(nextChild, now);
        now = nextChild;
        left = this.#left(now);
        right = this.#right(now);
      } else {
        break;
      }
    }

    return result;
  }
  #swap(a, b) {
    [this.arr[a], this.arr[b]] = [this.arr[b], this.arr[a]];
  }
  isEmpty() {
    return this.arr.length === 0;
  }
  #lastIdx() {
    return this.arr.length - 1;
  }
  #parent = (idx) => Math.floor((idx - 1) / 2);
  #left = (idx) => idx * 2 + 1;
  #right = (idx) => idx * 2 + 2;
}

function solution(S, E, N, edges) {
  const pq = new PQ((a, b) => a[1] - b[1]);
  const dists = Array.from({ length: N + 1 }, () => Array(N + 1).fill(Infinity));
  const graph = {};

  edges.forEach(([from, to, cost]) => {
    if (graph[from]) {
      graph[from].push([to, cost]);
    } else {
      graph[from] = [[to, cost]];
    }
  });

  dists[S][S] = 0;
  pq.push([S, 0]);

  while (!pq.isEmpty()) {
    const [now, dist] = pq.pop();

    if (now === E) {
      return dist;
    }

    graph[now]?.forEach(([next, cost]) => {
      if (dist + cost < dists[now][next]) {
        dists[now][next] = dist + cost;
        pq.push([next, dist + cost]);
      }
    });
  }
}

const N = +input();
const M = +input();
const edges = Array.from({ length: M }, () => input());
const [S, E] = input();

console.log(solution(S, E, N, edges));
