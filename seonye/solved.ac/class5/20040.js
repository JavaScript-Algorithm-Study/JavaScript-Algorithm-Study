const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, m, turn) {
  let parent = Array.from({ length: n }, (_, i) => i);
  let isCycle = false;

  function findParent(parent, x) {
    if (parent[x] !== x) parent[x] = findParent(parent, parent[x]);

    return parent[x];
  }

  function unionParent(parent, a, b) {
    a = findParent(parent, a);
    b = findParent(parent, b);
    if (a < b) parent[b] = a;
    else parent[a] = b;
  }

  for (let i = 0; i < m; i++) {
    const [a, b] = turn[i];
    if (findParent(parent, a) === findParent(parent, b)) {
      isCycle = true;
      return i + 1;
    } else unionParent(parent, a, b);
  }

  if (!isCycle) return 0;
}

const [n, m] = input[0].split(' ').map(Number);
const turn = input.slice(1).map((t) => t.split(' ').map(Number));
console.log(solution(n, m, turn));
