//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
12
1 2
1 3
2 4
3 5
3 6
4 7
4 8
5 9
5 10
6 11
6 12
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function solution(edgeNum, edges) {
  const graph = {};
  const parents = Array(edgeNum + 1).fill(-1);
  const visited = Array(edgeNum + 1).fill(false);

  edges.forEach(([from, to]) => {
    graph[from] ? graph[from].push(to) : (graph[from] = [to]);
    graph[to] ? graph[to].push(from) : (graph[to] = [from]);
  });

  const dfs = (now) => {
    if (visited[now]) return;
    visited[now] = true;

    graph?.[now]?.forEach((next) => {
      if (!visited[next]) {
        parents[next] = now;
        dfs(next);
      }
    });
  };

  dfs(1);

  return parents.slice(2).join("\n");
}

const N = Number(input());
const edges = Array.from({ length: N - 1 }, () => input());
console.log(solution(N, edges));
