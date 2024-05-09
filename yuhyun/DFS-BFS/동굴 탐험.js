function solution(n, path, order) {
  const ENTER = 0;

  const graph = Array.from(Array(n), () => []);
  path.forEach(([a, b]) => {
    graph[a].push(b);
    graph[b].push(a);
  });

  const indegree = Array(n).fill(0);
  const outNodes = Array.from(Array(n), () => []);
  order.forEach(([before, after]) => {
    indegree[after] += 1;
    outNodes[before].push(after);
  });

  return indegree[ENTER] !== 0
    ? false
    : traverse(ENTER, graph, indegree, outNodes).every((v) => v);
}

function traverse(start, graph, indegree, outNodes) {
  const visited = Array(indegree.length).fill(false);
  const stack = [start];
  const reachable = new Set();

  while (stack.length) {
    const cur = stack.pop();
    visited[cur] = true;

    outNodes[cur].forEach((after) => {
      indegree[after] -= 1;
      if (indegree[after] === 0 && reachable.has(after)) {
        reachable.delete(after);
        stack.push(after);
      }
    });

    graph[cur].forEach((next) => {
      if (visited[next]) return;
      if (indegree[next] !== 0) {
        reachable.add(next);
        return;
      }
      stack.push(next);
    });
  }
  return visited;
}
