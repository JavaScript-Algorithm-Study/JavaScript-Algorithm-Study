const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(nVideo, nQuery, edges, queries) {
  const graph = createGraph(nVideo, edges);
  const memoizedCalcMinWeights = memo(calcMinWeights);

  return queries
    .map(([lowerBound, video]) => {
      const minWeights = memoizedCalcMinWeights(video, nVideo, graph);
      return minWeights.filter((minWeight) => minWeight && minWeight >= lowerBound).length;
    })
    .join('\n');

  function memo(fn) {
    const cache = new Map();

    return (start, nNode, graph) => {
      if (cache.has(start)) {
        return cache.get(start);
      }

      const result = fn(start, nNode, graph);
      cache.set(start, result);
      return result;
    };
  }

  function calcMinWeights(start, nNode, graph) {
    const NO_CONNECTION = null;
    const result = Array(nNode + 1).fill(NO_CONNECTION);
    result[start] = 0;

    const queue = createQueue();
    graph[start].forEach(([next, weight]) => {
      result[next] = weight;
      queue.push(next);
    });

    while (!queue.isEmpty()) {
      const cur = queue.pop();

      graph[cur]
        .filter(([next]) => result[next] === NO_CONNECTION)
        .forEach(([next, minWeight]) => {
          result[next] = Math.min(minWeight, result[cur]);
          queue.push(next);
        });
    }

    return result;
  }

  function createGraph(nNode, edges) {
    const result = Array.from(Array(nNode + 1), () => []);
    edges.forEach(([nodeA, nodeB, weight]) => {
      result[nodeA].push([nodeB, weight]);
      result[nodeB].push([nodeA, weight]);
    });
    return result;
  }

  function createQueue() {
    let head = 0;
    const queue = [];

    const isEmpty = () => queue.length === head;
    const push = (value) => queue.push(value);
    const pop = () => (isEmpty() ? null : queue[head++]);

    return { isEmpty, push, pop };
  }
}

const [N, Q] = input.shift().split(' ').map(Number);
const edges = input.splice(0, N - 1).map((line) => line.split(' ').map(Number));
const queries = input.map((line) => line.split(' ').map(Number));
console.log(solution(N, Q, edges, queries));
