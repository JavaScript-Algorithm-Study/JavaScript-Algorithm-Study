function solution(n, computers) {
  const createQueue = () => {
    let head = 0;
    const array = [];

    const push = (value) => {
      array.push(value);
    };

    const pop = () => {
      const result = array[head];
      head += 1;
      return result;
    };

    const isEmpty = () => {
      return array.length - head === 0;
    };

    return { push, pop, isEmpty };
  };

  const bfs = (start, visited, graph) => {
    const queue = createQueue();

    visited[start] = true;
    queue.push(start);

    while (!queue.isEmpty()) {
      const cur = queue.pop();
      const connectedFromCur = graph[cur];

      connectedFromCur.forEach((connected, node) => {
        if (visited[node]) {
          return;
        }

        if (cur === node) {
          return;
        }

        if (!connected) {
          return;
        }

        queue.push(node);
        visited[node] = true;
      });
    }
  };

  let result = 0;
  const visited = Array(n).fill(false);
  for (let start = 0; start < n; start += 1) {
    if (visited[start]) {
      continue;
    }

    result += 1;
    bfs(start, visited, computers);
  }

  return result;
}
