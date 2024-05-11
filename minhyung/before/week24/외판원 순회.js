//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
4
0 10 15 20
5 0 9 10
6 13 0 12
8 8 9 0
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function solution(n, graph) {
  const memo = Array.from(Array(n), () => Array(1 << n).fill(-1));

  const tsp = (now, visited) => {
    const isVisitedEveryNode = visited === (1 << n) - 1;

    if (isVisitedEveryNode) {
      return graph[now][0] || Infinity;
    }

    const isVisitedBefore = memo[now][visited] !== -1;

    if (isVisitedBefore) {
      return memo[now][visited];
    }

    memo[now][visited] = Infinity;

    for (let i = 0; i < n; i++) {
      if (graph[now][i] === 0 || visited & (1 << i)) {
        continue;
      }

      const next = visited | (1 << i); // i번 방문까지 포함
      memo[now][visited] = Math.min(memo[now][visited], tsp(i, next) + graph[now][i]);
    }

    return memo[now][visited];
  };

  return tsp(0, 1);
}

const N = +input();
const graph = Array.from({ length: N }, () => input());
console.log(solution(N, graph));

// 순열? 무조건 시간초과
