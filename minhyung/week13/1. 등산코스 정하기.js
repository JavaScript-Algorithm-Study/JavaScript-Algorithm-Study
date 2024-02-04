// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/118669
// 시작날짜: 2024.02.04

// 방향이 한쪽으로만 있는줄 알고 풀어서 거기서 처음에 문제 생김
// 그리고 summits를 저장해서 도달하면 나가려 했는데 그럴 필요 없이
// summits에서 다음 노드로 향하는 간선을 모두 제거해줌
// 그 후 모든 그래프를 돌고나서 summits들에 대해 조건에 따라 정렬후 return함

class PQ {
  constructor(cmp) {
    this.cmp = (a, b) => cmp(this.arr[a], this.arr[b]);
    this.arr = [];
  }
  push(data) {
    this.arr.push(data);
    let now = this.getLastIdx();
    while (now > 0) {
      const parent = this.getParentIdx(now);
      if (this.cmp(now, parent) < 0) {
        this.swap(now, parent);
        now = parent;
      } else {
        break;
      }
    }
  }
  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.swap(0, this.getLastIdx());
    const result = this.arr.pop();
    let now = 0;
    let left = 1;
    let right = 2;
    while (this.arr[left] !== undefined) {
      let next = left;
      if (this.arr[right] < this.arr[left] && this.cmp(right, left) < 0) {
        next = right;
      }
      if (this.cmp(next, now) < 0) {
        this.swap(next, now);
        now = next;
        left = this.getLeftIdx(now);
        right = this.getRightIdx(now);
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
  getLastIdx() {
    return this.arr.length - 1;
  }
  getParentIdx(idx) {
    return Math.floor((idx - 1) / 2);
  }
  getLeftIdx(idx) {
    return idx * 2 + 1;
  }
  getRightIdx(idx) {
    return idx * 2 + 2;
  }
}
const makeGraph = (g, from, to, weight) => {
  g[from] ? g[from].push([to, weight]) : (g[from] = [[to, weight]]);
  g[to] ? g[to].push([from, weight]) : (g[to] = [[from, weight]]);
};

function solution(n, paths, gates, summits) {
  const graph = paths.reduce((g, [i, j, w]) => (makeGraph(g, i, j, w), g), {});
  const dist = Array(n + 1).fill(Infinity);
  const pq = new PQ((a, b) => a[1] - b[1]);

  gates.forEach((node) => (pq.push([node, 0]), (dist[node] = 0)));
  summits.forEach((node) => (graph[node] = []));

  while (!pq.isEmpty()) {
    const [now, weight] = pq.pop();

    graph[now]?.forEach(([next, cost]) => {
      // 현재 노드 가중치, 다음 노드와의 가중치중 더 큰값을 저장시킴
      const max = Math.max(cost, weight);
      if (max < dist[next]) {
        dist[next] = max;
        pq.push([next, max]);
      }
    });
  }

  return summits.map((summit) => [summit, dist[summit]]).sort((a, b) => a[1] - b[1] || a[0] - b[0])[0];
}
