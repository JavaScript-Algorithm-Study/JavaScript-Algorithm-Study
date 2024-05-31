//https://www.acmicpc.net/problem/1504
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
4 2
1 2 3
3 4 1
2 3
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();
// 1 - 2
//     !
// 3 - 4
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
      // 위로 움직이는데, 아래가 더 작아야 움직임
      if (this.cmp(now, parent) < -1) {
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
    let left = 1;
    let right = 2;

    while (this.isExist(left)) {
      let nextParent = left;
      if (this.isExist(right) && this.cmp(right, left) < -1) {
        nextParent = right;
      }
      // 위에서 아래로, 아래가 더 작으면
      if (this.cmp(nextParent, now) < -1) {
        this.swap(nextParent, now);
        now = nextParent;
        left = this.left(now);
        right = this.right(now);
      } else {
        break;
      }
    }

    return result;
  }
  isExist(idx) {
    return this.arr[idx] !== undefined;
  }
  isEmpty() {
    return this.arr.length === 0;
  }
  lastIdx() {
    return this.arr.length - 1;
  }
  swap(a, b) {
    [this.arr[a], this.arr[b]] = [this.arr[b], this.arr[a]];
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
}
function findShortestPaths(graph, maxNode, start, ends) {
  const costs = Array(maxNode + 1).fill(Infinity);
  const pq = new PQ((a, b) => a.dist - b.dist);
  const result = ends.reduce((obj, nodeNum) => {
    obj[nodeNum] = Infinity;
    return obj;
  }, {});

  pq.push({ now: start, dist: 0 });

  while (!pq.isEmpty()) {
    const { now, dist } = pq.pop();

    if (result?.[now] > dist) {
      result[now] = dist;
    }

    graph[now]?.forEach(({ to, cost: toCost }) => {
      const moveCost = dist + toCost;
      if (moveCost < costs[to]) {
        costs[to] = moveCost;
        pq.push({ now: to, dist: moveCost });
      }
    });
  }

  return result;
}

function solution(end, A, B, edges) {
  const graph = {};

  edges.forEach(([from, to, cost]) => {
    if (graph[from]) graph[from].push({ to, cost });
    else graph[from] = [{ to, cost }];

    if (graph[to]) graph[to].push({ to: from, cost });
    else graph[to] = [{ to: from, cost }];
  });

  // 1-> 모든정점, a->모든정점, b->모든정점 세번만 구하면됨
  const fromStart = findShortestPaths(graph, end, 1, [A, B]);
  const fromA = findShortestPaths(graph, end, A, [B, end]);
  const fromB = findShortestPaths(graph, end, B, [A, end]);

  const path1 = fromStart[A] + fromA[B] + fromB[end];
  const path2 = fromStart[B] + fromB[A] + fromA[end];

  if (path1 === Infinity && path2 === Infinity) return -1;
  else return Math.min(path1, path2);
}

const [N, E] = input();
const edges = Array.from({ length: E }, () => input());
const [A, B] = input();
console.log(solution(N, A, B, edges));

// 1-> N으로 최단거리 이동해야함
// 주어진 두 정점을 반드시 통과 해야함
// 정점, 간선은 여러번 통과할 수 있음
// 하지만 반드시 최단경로로 이동해야함

// 1 -> A -> B -> N으로 가야함

// 1. 1 -> A, 1 -> B, 1 -> N으로 가는 경로가 있는지 파악함

// 1 -> a + a -> b + b -> n
// 1 -> b + b -> a + a -> n
// 위 두개중에 더 숫자가 작은게 정답일듯
// 위로 구하면
// 1-> 모든정점, a->모든정점, b->모든정점 세번만 구하면됨
// ElogV 200000log800
