//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
5
14
1 2 2
1 3 3
1 4 1
1 5 10
2 4 2
3 4 1
3 5 1
4 5 3
3 5 10
3 1 8
1 4 2
5 1 7
3 4 2
5 2 4
`.trim().split('\n');

const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function solution(n, edges) {
  const dists = Array.from({ length: n }, () => Array(n).fill(Infinity));

  edges.forEach(([from, to, cost]) => {
    dists[from - 1][to - 1] = Math.min(dists[from - 1][to - 1], cost);
  });

  for (let i = 0; i < n; i++) {
    dists[i][i] = 0;
  }

  for (let mid = 0; mid < n; mid++) {
    for (let start = 0; start < n; start++) {
      for (let end = 0; end < n; end++) {
        const transitCost = dists[start][mid] + dists[mid][end];
        dists[start][end] = Math.min(dists[start][end], transitCost);
      }
    }
  }

  return dists.map((row) => row.join(" ")).join("\n");
}

const n = Number(input());
const m = Number(input());
const edges = Array.from({ length: m }, () => input());

console.log(solution(n, edges));
