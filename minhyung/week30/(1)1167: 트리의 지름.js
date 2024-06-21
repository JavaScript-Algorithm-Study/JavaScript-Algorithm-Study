//https://www.acmicpc.net/problem/1167
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
6
1 3 2 6 20 -1
2 4 100 -1
3 1 2 4 3 -1
4 2 100 3 3 5 100 -1
5 4 100 -1
6 1 20-1
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function solution(v, graph) {
  let max = 0;
  const visited = Array(v + 1).fill(false);
  visited[1] = true;

  // 올라올 때 cost를 더해줌
  function travel(now, nowCost) {
    const childs = [];

    graph?.[now].forEach(({ to, cost: nextCost }) => {
      if (visited[to]) return;
      visited[to] = true;

      const child = travel(to, nextCost);
      childs.push(child);
    });

    childs.sort((a, b) => b - a);

    // 다음에 연결된 노드가 없을 때
    // 현재 노드에 올 때 cost를 리턴함
    if (childs.length === 0) {
      return nowCost;
    }
    // 자식이 여러개 있다면 계산함
    else {
      // 자식 노드끼리 가장 긴 거리를 갱신함
      const sumWithChilds = childs.slice(0, 2).reduce((sum, now) => sum + now, 0);
      max = Math.max(max, sumWithChilds);
      // 부모를 포함 헀을 때 거리 리턴함
      return childs[0] + nowCost;
    }
  }

  const result = travel(1, 0);
  return Math.max(max, result);
}

function makeEdge(edgeInfos) {
  const edges = [];
  const from = edgeInfos[0];

  for (let i = 1; i < edgeInfos.length - 2; i += 2) {
    edges.push({ to: edgeInfos[i], cost: edgeInfos[i + 1] });
  }

  return { from, edges };
}
const V = Number(input());
const graph = {};
for (let i = 0; i < V; i++) {
  const { from, edges } = makeEdge(input());
  graph[from] = edges;
}
console.log(solution(V, graph));

// 트리에서 임의의 두 점 사이의 거리중 가장 긴 것
// 가장 긴 거리를 찾으려면 1번노드를 무조건 거쳐야함
// 1 -(2)- 3 -(3)- 4 -(4)- 2
//                 |
//                (6)
//                 |
//                 5
// 풀이
// 1. 리프노드라면:
//  - 내려 올 때의 cost 리턴
// 2. 리프노드가 아니라면:
//  - 자식 node들의 거리만 더해서 최대값을 구함
//  - 내려올 떄 cost + 올라올 떄 거리를 리턴
// 3. 모든 노드를 방문 할 때까지 1~2 반복
// 근데 더 쉬운 방법으로 임의의 정점 x에서 y를 구하고
// y에서 z를 구한 후 거리를 구하면 이게 트리의 지름이됨
