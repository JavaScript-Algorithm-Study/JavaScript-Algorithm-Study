// 효율성 10번 통과 실패
function solution(n, path, order) {
  let graph = {};

  for (let i = 0; i < path.length; i++) {
    const [a, b] = path[i];
    graph[a] ? graph[a].push(b) : (graph[a] = [b]);
    graph[b] ? graph[b].push(a) : (graph[b] = [a]);
  }

  let beforeVisit = {};

  for (let i = 0; i < order.length; i++) {
    beforeVisit[order[i][1]] = order[i][0];
  }

  // 초기화되지 않는 방문 여부 배열(선행 작업 확인할 때 사용)
  let finalVisited = new Array(n).fill(0);
  finalVisited[0] = 1;

  function bfs(start) {
    let stack = [];
    stack.push(start);
    isVisited.add(0);

    while (stack.length) {
      const node = stack.pop();

      for (const targetNode of graph[node]) {
        // 이미 방문한 노드라면
        if (isVisited.has(targetNode)) {
          continue;
        }

        // 먼저 방문 해야하는 노드가 있는데 방문하지 않았다면
        if (beforeVisit[targetNode] && !finalVisited[beforeVisit[targetNode]]) {
          continue;
        }

        isVisited.add(targetNode);
        finalVisited[targetNode] = 1;
        stack.push(targetNode);
      }
    }
  }

  let isVisited = new Set();

  let beforeVisitedLength = 0;

  // 0번 전에 방문해야하는 것이 있다면 불가능함
  if (beforeVisit[0]) {
    return false;
  }

  while (1) {
    bfs(0);

    if (beforeVisitedLength === isVisited.size) {
      break;
    }

    beforeVisitedLength = isVisited.size;

    isVisited = new Set();
  }

  return n === beforeVisitedLength;
}
