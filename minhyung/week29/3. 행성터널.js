//https://www.acmicpc.net/problem/2887
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
5
11 -15 -15
14 -5 -15
-1 -1 -5
10 -4 -1
19 -4 19
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function getEdgeCostBetweenNode(from, to) {
  return Math.min(Math.abs(from[0] - to[0]), Math.abs(from[1] - to[1]), Math.abs(from[2] - to[2]));
}

function useUnionFind(n) {
  const parents = Array.from({ length: n }, (_, idx) => idx);

  function union(a, b) {
    const parentA = find(a);
    const parentB = find(b);

    if (parentA < parentB) parents[parentB] = parentA;
    else parents[parentA] = parentB;
  }

  function find(n) {
    if (parents[n] !== n) {
      parents[n] = find(parents[n]);
    }
    return parents[n];
  }

  return { union, find };
}

function solution(n, nodes) {
  const sortedX = [...nodes].sort((a, b) => b[0] - a[0]);
  const sortedY = [...nodes].sort((a, b) => b[1] - a[1]);
  const sortedZ = [...nodes].sort((a, b) => b[2] - a[2]);
  const { union, find } = useUnionFind(n);

  // 행성 좌표에 해당하는 index
  const planetIndex = new Map();
  // [from, to, dist]
  const edges = [];
  let result = 0;

  // 행성이 어떤 노드번호에 해당하는지 기록해둠
  nodes.forEach((node, nodeIdx) => {
    planetIndex.set(node.toString(), nodeIdx);
  });

  // 크루스칼을 사용하기 위해 edge를 만들어줌
  for (let nodeNum = 1; nodeNum < n; nodeNum++) {
    [sortedX, sortedY, sortedZ].forEach((node) => {
      const [fromX, toX] = [node[nodeNum - 1], node[nodeNum]];
      const cost = getEdgeCostBetweenNode(fromX, toX);

      const from = planetIndex.get(fromX.toString());
      const to = planetIndex.get(toX.toString());

      edges.push({ from, to, cost });
    });
  }
  edges.sort((a, b) => a.cost - b.cost);

  edges.forEach(({ from, to, cost }) => {
    // from과 to가 같지 않으면 연결되지 않음
    if (find(from) !== find(to)) {
      result += cost;
      union(from, to);
    }
  });

  return result;
}

const N = Number(input());
const nodes = Array.from({ length: N }, () => input());
console.log(solution(N, nodes));

// 두 노드사이 비용은 min (|xa-xb|, |ya-yb|, |za-zb|)
// 1. x, y, z 절대값 큰 순으로 정렬함 (pop 해서 제일 작은거 빼기위해)
// 2. x 절대값 제일 작은거 빼봄, memo에 저장함
// 3. 그다음 x, y, z 배열 맨 뒤를 보고 제일 작은걸 뺌
// 4. 만약 memo에 있는거면 3을 반복함
// 5. 배열이 모두 빌 때까지 수행해줌.
// -> 안됨

// 11 -15 -15
// 14 -5 -15
// 10 -4 -1
// 19 -4 19
// -1 -1 -5

// 4

// 10만개의 간선을 구하면: 10만^2이 됨
