//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
3
1.0 1.0
2.0 2.0
2.0 4.0
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

// node간 edge 거리 계산
function getEdges(nodes) {
  const edges = []; //new Map();

  nodes.forEach(([x1, y1]) => {
    const from = `${x1},${y1}`;

    nodes.forEach(([x2, y2]) => {
      const to = `${x2},${y2}`;

      // const nodeName = `${from}>${to}`;

      if (from === to) return;

      const dist = Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
      // edges.set(nodeName, dist);
      edges.push([from, to, dist]);
    });
  });

  return edges;
}
function solution(positions) {
  const parents = Array.from({ length: positions.length }, (_, i) => i);
  const nodeIndexOfParent = {}; // 해당 노드의 부모 인덱스가 들어있는 객체
  const edgesArray = Array.from(getEdges(positions));
  const orderedEdges = edgesArray.sort((a, b) => a[2] - b[2]);

  positions.forEach((position, idx) => {
    nodeIndexOfParent[position] = idx;
  });

  const union = (a, b) => {
    const rootA = find(a);
    const rootB = find(b);

    if (rootA < rootB) parents[rootA] = parents[rootB];
    else parents[rootB] = parents[rootA];
  };

  const find = (n) => {
    if (n !== parents[n]) {
      parents[n] = find(parents[n]);
    }
    return parents[n];
  };

  let result = 0;

  orderedEdges.forEach(([from, to, dist]) => {
    const fromIdx = nodeIndexOfParent[from];
    const toIdx = nodeIndexOfParent[to];

    if (find(fromIdx) === find(toIdx)) {
      return;
    } else {
      union(fromIdx, toIdx);
      result += dist;
    }
  });

  return result.toFixed(2);
}

const n = +input();
const positions = Array.from({ length: n }, () => input());
console.log(solution(positions));

// 노드이름: x,y : 1000을 넘지 않는 양의 실수
// 노드비용: 두 점 사이 거리
// 두점 사이 거리: sqrt((x2-x1)^2 + (y2-y1)^2)

// 1. 각 노드 사이의 비용을 구한 edge를 구함
// 2. 모든 노드를 잇는 별자리를 구함
// 3. 별자리를 최소 비용으로 만들어야함

// console.log("9,1".localeCompare("10,2", { numeric: true }));
