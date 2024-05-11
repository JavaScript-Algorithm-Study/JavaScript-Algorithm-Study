//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
7 12
1 2 3
1 3 2
3 2 1
2 5 2
3 4 4
7 3 6
5 1 5
1 6 2
6 4 1
6 5 3
4 5 3
6 7 4
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function solution(N, roads) {
  const parents = Array.from({ length: N + 1 }, (_, i) => i);
  const coasts = Array(N + 1).fill(Infinity);
  let result = 0;
  let last = 0;

  roads.sort((a, b) => a[2] - b[2]);

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

  roads.forEach(([a, b, w]) => {
    if (find(a) !== find(b)) {
      union(a, b);
      result += w;
      last = w;
    }
  });

  return result - last;
}

const [N, M] = input();
const roads = Array.from({ length: M }, () => input());
console.log(solution(N, roads));
