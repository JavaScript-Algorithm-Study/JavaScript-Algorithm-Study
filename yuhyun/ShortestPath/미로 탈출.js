function solution(n, start, end, roads, traps) {
  const shortestPaths = findShortestPaths(
    n,
    start,
    createAllGraph(n, roads, traps),
    new Map(traps.map((trap, index) => [trap, index]))
  );

  return Math.min(...shortestPaths[end]);
}

function findShortestPaths(n, start, graphs, traps) {
  const INIT_STATE = 0;
  const INIT_PATH = 0;

  const nState = 2 ** traps.size;
  const result = Array.from(Array(n + 1), () => Array(nState).fill(Infinity));
  const queue = new Queue();
  result[start][INIT_STATE] = INIT_PATH;
  queue.push([start, INIT_PATH, INIT_STATE]);

  while (!queue.isEmpty()) {
    const [node, path, state] = queue.pop();
    if (result[node][state] !== path) {
      continue;
    }

    graphs[state][node]
      .map(([next, weight]) => [
        next,
        path + weight,
        traps.has(next) ? state ^ (1 << traps.get(next)) : state,
      ])
      .filter(
        ([next, nextPath, nextState]) => nextPath < result[next][nextState]
      )
      .forEach(([next, nextPath, nextState]) => {
        result[next][nextState] = nextPath;
        queue.push([next, nextPath, nextState]);
      });
  }

  return result;
}

function createAllGraph(n, roads, traps) {
  const nTrap = traps.length;
  return Array.from(Array(2 ** nTrap), (_, state) => {
    const curRoads = roads.map((road) => [...road]);
    traps
      .filter((_, index) => state & (1 << index))
      .forEach((trap) => reverseEdges(trap, curRoads));
    return createGraph(n, curRoads);
  });
}

function reverseEdges(node, edges) {
  edges.forEach(([from, to, weight], index) => {
    if (from === node || to === node) {
      edges[index] = [to, from, weight];
    }
  });
}

function createGraph(n, roads) {
  const result = Array.from(Array(n + 1), () => []);
  roads.forEach(([from, to, weight]) => result[from].push([to, weight]));
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
