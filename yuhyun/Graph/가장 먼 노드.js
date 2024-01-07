function solution(n, edge) {
  const start = 0;
  const graph = createGraph(n, edge);
  const distance = bfs(start, n, graph);

  const maxDistance = Math.max(...distance);

  return distance.filter((value) => value === maxDistance).length;
}

function createGraph(n, edge) {
  const graph = Array.from(Array(n), () => []);
  edge.forEach(([nodeA, nodeB]) => {
    graph[nodeA - 1].push(nodeB - 1);
    graph[nodeB - 1].push(nodeA - 1);
  });
  return graph;
}

function createQueue() {
  let head = 0;
  const queue = [];

  return {
    enqueue: (value) => queue.push(value),
    dequeue: () => {
      const value = queue[head];
      head += 1;
      return value;
    },
    isEmpty: () => queue.length === head,
  };
}

function bfs(start, n, graph) {
  const distance = Array(n).fill(Infinity);

  const queue = createQueue();
  queue.enqueue(start);

  distance[start] = 0;

  while (!queue.isEmpty()) {
    const curNode = queue.dequeue();
    const neighborhood = graph[curNode];
    const nextDistance = distance[curNode] + 1;

    neighborhood.forEach((nextNode) => {
      if (distance[nextNode] <= nextDistance) {
        return;
      }

      distance[nextNode] = nextDistance;
      queue.enqueue(nextNode);
    });
  }

  return distance;
}
