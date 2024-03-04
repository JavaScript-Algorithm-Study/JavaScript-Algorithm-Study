const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(nBuilding, nRules, target, buildTimes, rules) {
  const graph = createGraph(nBuilding, rules);
  const indegrees = calcIndegrees(nBuilding, rules);

  const queue = createQueue();
  const completeTimes = Array(nBuilding + 1).fill(0);
  indegrees.forEach((indegree, node) => {
    if (indegree !== 0) {
      return;
    }
    queue.push(node);
    completeTimes[node] = buildTimes[node - 1];
  });

  while (!queue.isEmpty()) {
    const cur = queue.pop();

    graph[cur].forEach((next) => {
      indegrees[next] -= 1;
      completeTimes[next] = Math.max(
        completeTimes[next],
        completeTimes[cur] + buildTimes[next - 1]
      );

      if (indegrees[next] === 0) {
        queue.push(next);
      }
    });
  }

  return completeTimes[target];

  function createQueue() {
    let head = 0;
    const queue = [];

    const isEmpty = () => queue.length === head;
    const push = (value) => queue.push(value);
    const pop = () => (isEmpty() ? null : queue[head++]);
    return { isEmpty, push, pop };
  }

  function calcIndegrees(nNode, edges) {
    const result = Array(nNode + 1).fill(0);
    edges.forEach(([_, to]) => (result[to] += 1));
    return result;
  }

  function createGraph(nNode, edges) {
    const result = Array.from(Array(nNode + 1), () => []);
    edges.forEach(([from, to]) => result[from].push(to));
    return result;
  }
}

let line = 0;
const T = Number(input[line++]);
const result = [];
for (let t = 0; t < T; t += 1) {
  const [N, K] = input[line++].split(' ').map(Number);
  const buildTimes = input[line++].split(' ').map(Number);
  const rules = [];
  for (let k = 0; k < K; k += 1) {
    rules.push(input[line++].split(' ').map(Number));
  }
  const W = Number(input[line++]);
  result.push(solution(N, K, W, buildTimes, rules));
}
console.log(result.join('\n'));
