//dfs

const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(N, Q, usado, quest) {
  const graph = Array.from({ length: N + 1 }, () => []);
  for (let [p, q, r] of usado) {
    graph[p].push([q, r]);
    graph[q].push([p, r]);
  }

  function dfs(result, graph, v, visited, usado, k) {
    if (usado < k) return result;
    visited[v] = true;
    result.push(v);
    for (const [i, u] of graph[v]) {
      const nextUsado = Math.min(usado, u);
      if (nextUsado >= k && !visited[i]) {
        dfs(result, graph, i, visited, nextUsado, k);
      }
    }
    return result;
  }

  for (const [k, v] of quest) {
    const visited = new Array(N + 1).fill(false);
    const answer = dfs([], graph, v, visited, Infinity, k);

    console.log(answer.length - 1);
  }
}

const [N, Q] = input[0].trim().split(' ').map(Number);
const usado = input.slice(1, N).map((row) => row.trim().split(' ').map(Number));
const quest = input
  .slice(N, N + Q)
  .map((row) => row.trim().split(' ').map(Number));

solution(N, Q, usado, quest);
