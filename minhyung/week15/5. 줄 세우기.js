// 링크: https://www.acmicpc.net/problem/2252
//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
4 2
4 2
3 1
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

class Queue {
  l = 0;
  r = 0;
  d = {};
  push(data) {
    this.d[this.r++] = data;
  }
  pop() {
    if (this.isEmpty()) return undefined;
    return this.d[this.l++];
  }
  isEmpty() {
    return this.l === this.r;
  }
}
const [N, M] = input();
const graph = {};
const inDegree = Array(N).fill(0);
const q = new Queue();
const result = [];

for (let i = 0; i < M; i++) {
  let [from, to] = input();
  from--, to--;
  graph[from] ? graph[from].push(to) : (graph[from] = [to]);
  inDegree[to]++;
}

inDegree.forEach((num, i) => num === 0 && q.push(i));

while (!q.isEmpty()) {
  const now = q.pop();

  result.push(now + 1);

  graph[now]?.forEach((next) => {
    inDegree[next]--;
    if (inDegree[next] === 0) {
      q.push(next);
    }
  });
}

console.log(result.join(" "));
