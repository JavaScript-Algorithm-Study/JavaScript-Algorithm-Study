const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(nNode, nEdges, nFreeEdge, edges) {
  const START = 1;
  const TRAGET = nNode;

  const graph = createGraph(nNode, edges);
  const costs = edges.map(([_, __, cost]) => cost);
  costs.push(0);
  costs.sort((a, b) => a - b);

  return costs[parametricSearch(costs, canInstall)] ?? -1;

  function canInstall(cost) {
    const queue = createQueue();
    queue.push(START);

    const nEdgesOverCost = Array(nNode + 1).fill(null);
    nEdgesOverCost[START] = 0;

    while (!queue.isEmpty()) {
      const cur = queue.pop();

      graph[cur].forEach(([next, weight]) => {
        const nextNEdgesOverCost = nEdgesOverCost[cur] + (weight <= cost ? 0 : 1);
        if (
          nextNEdgesOverCost > nFreeEdge ||
          nextNEdgesOverCost >= (nEdgesOverCost[next] ?? Infinity)
        ) {
          return;
        }

        nEdgesOverCost[next] = nextNEdgesOverCost;
        queue.push(next);
      });
    }

    return nEdgesOverCost[TRAGET] !== null && nEdgesOverCost[TRAGET] <= nFreeEdge;
  }

  function parametricSearch(array, solve) {
    let left = -1;
    let right = array.length;
    while (left + 1 < right) {
      const mid = Math.floor((left + right) / 2);
      if (solve(array[mid])) {
        right = mid;
        continue;
      }
      left = mid;
    }
    return right;
  }

  function createGraph(nNode, edges) {
    const result = Array.from(Array(nNode + 1), () => []);
    edges.forEach(([from, to, weight]) => {
      result[from].push([to, weight]);
      result[to].push([from, weight]);
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

const [N, P, K] = input.shift().split(' ').map(Number);
const edges = input.map((line) => line.split(' ').map(Number));
console.log(solution(N, P, K, edges));
