//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
3
3
0 1 0
1 0 1
0 0 0
1 2 3
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

function solution(n, m, connectInfo, travels) {
  const parents = Array.from({ length: n }, (_, idx) => idx);
  const find = (n) => {
    if (parents[n] !== n) {
      parents[n] = find(parents[n]);
    }
    return parents[n];
  };
  const union = (a, b) => {
    const rootA = find(a);
    const rootB = find(b);
    if (rootA < rootB) parents[rootB] = parents[rootA];
    else parents[rootA] = parents[rootB];
  };

  connectInfo.forEach((cities, i) => {
    cities.forEach((isConnect, j) => {
      if (isConnect) {
        union(i, j);
      }
    });
  });

  const startRoot = find(travels[0]);
  return travels.every((city) => find(city) === startRoot) ? "YES" : "NO";
}

const N = +input();
const M = +input();
const connectInfo = Array.from({ length: N }, () => input());
const travels = input().map((num) => num - 1);
console.log(solution(N, M, connectInfo, travels));
