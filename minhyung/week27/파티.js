//https://www.acmicpc.net/problem/1238
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
4 8 2
1 2 4
1 3 2
1 4 7
2 1 1
2 3 5
3 1 2
3 4 4
4 2 3
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
    if (this.isEmpty()) return undefined;

    this.swap(0, this.lastIdx());
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
        this.swap(nextChild, now);
        now = nextChild;
        left = this.left(now);
        right = this.right(now);
      } else {
        break;
      }
    }

    return result;
  }
  swap(a, b) {
    [this.arr[a], this.arr[b]] = [this.arr[b], this.arr[a]];
  }
  isEmpty() {
    return this.arr.length === 0;
  }
  parent(idx) {
    return Math.floor((idx - 1) / 2);
  }
  left(idx) {
    return idx * 2 + 1;
  }
  right(idx) {
    return idx * 2 + 2;
  }
  lastIdx() {
    return this.arr.length - 1;
  }
}
// 1. 모든 정점 -> X로 가는 최소거리 구함
// 2. 간선 뒤집어서 모든정점 -> X로 가는 최소거리 구함
// 3. for문 돌면서 i -> X -> i
function calcDists(N, X, graph) {
  let dists = Array.from({ length: N + 1 }, () => Infinity);
  const pq = new PQ((a, b) => a[1] - b[1]);

  dists[X] = 0;
  pq.push([X, 0]);

  while (!pq.isEmpty()) {
    const [now, dist] = pq.pop();

    graph?.[now].forEach(([next, cost]) => {
      if (dists[next] > dist + cost) {
        dists[next] = dist + cost;
        pq.push([next, dist + cost]);
      }
    });
  }

  return dists;
}
function solution(N, X, edges) {
  const graph = {};
  const reverseGraph = {};

  // 그래프 초기화
  edges.forEach(([from, to, cost]) => {
    graph[from] ? graph[from].push([to, cost]) : (graph[from] = [[to, cost]]);
    reverseGraph[to] ? reverseGraph[to].push([from, cost]) : (reverseGraph[to] = [[from, cost]]);
  });

  const forwardDists = calcDists(N, X, graph);
  const reverseDists = calcDists(N, X, reverseGraph);
  const distsSum = forwardDists.map((dist, idx) => dist + reverseDists[idx]);

  return Math.max(...distsSum.slice(1));
}

const [N, M, X] = input();
const edges = Array.from({ length: M }, () => input());
console.log(solution(N, X, edges));
