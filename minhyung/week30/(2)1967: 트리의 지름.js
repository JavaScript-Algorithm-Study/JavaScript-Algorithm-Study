//https://www.acmicpc.net/problem/1967
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
1
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function solution(n, edges) {
  const graph = {};

  edges.forEach(([from, to, cost]) => {
    graph?.[from] ? graph[from].push([to, cost]) : (graph[from] = [[to, cost]]);
    graph?.[to] ? graph[to].push([from, cost]) : (graph[to] = [[from, cost]]);
  });

  function dfs(start) {
    const visited = Array(n + 1).fill(false);
    let maxDist = -1;
    let maxDistNodeNum = -1;

    visited[start] = true;

    function travel(now, dist) {
      if (dist > maxDist) {
        maxDist = dist;
        maxDistNodeNum = now;
      }

      graph[now]?.forEach(([to, cost]) => {
        if (visited[to]) return;
        visited[to] = true;

        travel(to, dist + cost);
      });
    }
    travel(start, 0);
    return { maxDist, maxDistNodeNum };
  }

  const { maxDistNodeNum } = dfs(1);
  const { maxDist } = dfs(maxDistNodeNum);

  return maxDist;
}

const n = Number(input());
const edges = Array.from({ length: n - 1 }, () => input());
console.log(solution(n, edges));
