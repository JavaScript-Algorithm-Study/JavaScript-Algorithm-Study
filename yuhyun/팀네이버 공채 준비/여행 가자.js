const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(N, M, graph, plan) {
  const PAD = 1;
  const CONNECTED = 1;
  const { find, union } = unionFind(N);

  for (let row = 0; row < N; row += 1) {
    for (let col = row + 1; col < N; col += 1) {
      if (graph[row][col] === CONNECTED) {
        union(row, col);
      }
    }
  }

  return new Set(plan.map((city) => find(city - PAD))).size === 1 ? 'YES' : 'NO';

  function unionFind(N) {
    const parents = Array.from(Array(N), (_, index) => index);

    function find(child) {
      return parents[child] === child ? child : (parents[child] = find(parents[child]));
    }

    function union(childA, childB) {
      parents[find(childB)] = find(childA);
    }

    return { find, union };
  }
}

const N = Number(input.shift());
const M = Number(input.shift());
const graph = input.map((line) => line.split(' ').map(Number));
const plan = graph.pop();
console.log(solution(N, M, graph, plan));
