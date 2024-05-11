// 링크: https://www.acmicpc.net/problem/1197
//const stdin = require('fs').readFileSync(0, 'utf-8').trim().split('\n');
//prettier-ignore
const stdin = `
3 3
1 2 1
2 3 2
1 3 3
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

const [V, E] = input();
const parents = Array.from({ length: V + 1 }, (_, i) => i);
const edges = Array.from({ length: E }, () => input());
const union = (a, b) => {
  const pa = find(a);
  const pb = find(b);
  parents[pb] = pa;
};
const find = (a) => {
  if (parents[a] !== a) {
    parents[a] = find(parents[a]);
  }
  return parents[a];
};
let result = 0;

edges
  .sort((a, b) => a[2] - b[2])
  .forEach(([a, b, w]) => {
    if (find(a) !== find(b)) {
      union(a, b);
      result += w;
    }
  });

console.log(result);
