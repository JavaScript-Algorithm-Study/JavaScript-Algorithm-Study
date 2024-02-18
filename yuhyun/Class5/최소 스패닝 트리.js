const fs = require("fs");
const path = process.platform === "linux" ? "/dev/stdin" : "예제.txt";
const input = fs.readFileSync(path).toString().trim().split("\n");

function solution(V, E, edges) {
  const WEIGHT = 2;

  const ascendingEdges = [...edges];
  ascendingEdges.sort((edgeA, edgeB) => edgeA[WEIGHT] - edgeB[WEIGHT]);

  const { find, union } = unionFind(V + 1);

  let result = 0;
  ascendingEdges.forEach(([nodeA, nodeB, weight]) => {
    if (find(nodeA) === find(nodeB)) {
      return;
    }

    result += weight;
    union(nodeA, nodeB);
  });
  return result;
}

function unionFind(n) {
  const parent = Array.from(Array(n), (_, i) => i);

  const find = (index) => {
    return parent[index] === index ? index : (parent[index] = find(parent[index]));
  };

  const union = (indexA, indexB) => {
    parent[find(indexA)] = find(indexB);
  };

  return { find, union };
}

const [V, E] = input.shift(0, 1).split(" ").map(Number);
console.log(
  solution(
    V,
    E,
    input.map((line) => line.split(" ").map(Number))
  )
);
