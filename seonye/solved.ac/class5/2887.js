const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, info) {
  const xlist = [];
  const ylist = [];
  const zlist = [];
  let edges = [];

  for (const [x, y, z] of info) {
    xlist.push([x, xlist.length]);
    ylist.push([y, ylist.length]);
    zlist.push([z, zlist.length]);
  }

  xlist.sort((a, b) => a[0] - b[0]);
  ylist.sort((a, b) => a[0] - b[0]);
  zlist.sort((a, b) => a[0] - b[0]);

  for (const curList of [xlist, ylist, zlist]) {
    for (let i = 1; i < n; i++) {
      const [w1, a] = curList[i - 1];
      const [w2, b] = curList[i];
      edges.push([Math.abs(w1 - w2), a, b]);
    }
  }

  edges.sort((a, b) => a[0] - b[0]);

  const parent = Array.from({ length: n }, (_, i) => i);

  let resultCost = 0;

  function findParent(parent, x) {
    if (parent[x] !== x) {
      parent[x] = findParent(parent, parent[x]);
    }
    return parent[x];
  }

  function unionParent(parent, a, b) {
    a = findParent(parent, a);
    b = findParent(parent, b);
    if (a < b) {
      parent[b] = a;
    } else {
      parent[a] = b;
    }
  }

  for (const [cost, a, b] of edges) {
    if (findParent(parent, a) !== findParent(parent, b)) {
      unionParent(parent, a, b);
      resultCost += cost;
    }
  }

  return resultCost;
}

const n = Number(input[0]);
const info = input.slice(1).map((row) => row.split(' ').map(Number));
console.log(solution(n, info));
