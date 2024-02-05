function solution(n, paths, gates, summits) {
  const graph = createGraph(n, paths);

  const summitSets = new Set(summits);
  const minPairs = calcMinPairs(graph, gates, summitSets).filter(([node]) =>
    summitSets.has(node)
  );

  const SUMMIT = 0;
  const MIN_INTENSITY = 1;
  minPairs.sort(
    (a, b) => a[MIN_INTENSITY] - b[MIN_INTENSITY] || a[SUMMIT] - b[SUMMIT]
  );

  return minPairs[0];
}

function calcMinPairs(graph, gates, summits) {
  const n = graph.length;
  const queue = new Queue();

  const MIN_INTENSITY = 1;
  const minIntensities = Array(n).fill(Infinity);

  gates.forEach((gate) => {
    minIntensities[gate] = 0;
    queue.push([gate, 0]);
  });

  while (!queue.isEmpty()) {
    const [node, minIntensity] = queue.pop();
    if (minIntensities[node] !== minIntensity) {
      continue;
    }

    graph[node]
      .map(([next, weight]) => [next, Math.max(weight, minIntensity)])
      .filter(
        ([next, nextMinIntensity]) => nextMinIntensity < minIntensities[next]
      )
      .forEach(([next, nextMinIntensity]) => {
        minIntensities[next] = nextMinIntensity;
        if (!summits.has(next)) {
          queue.push([next, nextMinIntensity]);
        }
      });
  }

  return minIntensities.map((minIntensity, node) => [node, minIntensity]);
}

function createGraph(n, paths) {
  const PADDING = 1;
  const result = Array.from(Array(n + PADDING), () => []);
  paths.forEach(([nodeA, nodeB, weight]) => {
    result[nodeA].push([nodeB, weight]);
    result[nodeB].push([nodeA, weight]);
  });
  return result;
}

class Queue {
  #queue = [];
  #head = 0;

  push(value) {
    this.#queue.push(value);
  }

  pop() {
    return this.isEmpty() ? null : this.#queue[this.#head++];
  }

  isEmpty() {
    return this.#queue.length === this.#head;
  }
}
