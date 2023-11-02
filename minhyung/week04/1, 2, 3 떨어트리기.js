// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/150364
// 시작날짜: 2023.10.28
// 시작시간: 14:10
// 종료시간: 17:20(다른 문제 먼저 풀기)
// 소요시간: 엄청나게 오래걸림ㅋㅋ

function solution(edges, target) {
  const stackedOrder = Array.from(
    { length: target.length + 1 },
    () => new Array()
  );
  const paths = Array(target.length + 1).fill(0);
  const G = new Map();

  // index 1부터 시작하기 위한 더미 데이터 삽입
  target.unshift(0);

  // 그래프 생성
  edges.forEach(([p, c]) => {
    if (G.has(p)) G.get(p).push(c);
    else G.set(p, [c]);
  });

  // 그래프 안의 하위 노드들을 오름차순으로 정렬
  G.forEach((value, key) => {
    const sortedNodes = value.sort((a, b) => a - b);
    G.set(key, sortedNodes);
  });

  const findNowLeaf = (now = 1) => {
    // 리프노드 도달 했다면
    if (!G.get(now)) {
      return now;
    }
    const nextPath = getNextPath(paths, G, now);
    const nextNode = G.get(now)[nextPath];

    return findNowLeaf(nextNode);
  };

  // 만약 stackedOrder의 모든 배열이 target num을 만들 수 없지만
  // 숫자가 추가될 경우 만들 수 있으면 while문을 돌음.
  let nowOrder = 1;
  while (!canMakeTree(stackedOrder, target)) {
    const nowLeaf = findNowLeaf();
    stackedOrder[nowLeaf].push(nowOrder++);

    // 만약 모든 조건이 만족하지도 않는데 target보다 숫자가 커지면
    // 1을 target만큼 써도 쌓는게 불가능하므로 return [-1]을 해줌
    const neverCanMakeTree = stackedOrder[nowLeaf].length > target[nowLeaf];
    if (neverCanMakeTree) {
      return [-1];
    }
  }

  // 여기까지 무사히 오면 결과를 만들 수 있는 경우가 만들어짐.(최단으로)
  // length를 가지고 3부터 시작해서 2, 1 숫자를 줄이며 target으로 만들어버림
  const stackedNum = getStackedNum(stackedOrder, target);
  const result = [];

  stackedOrder.forEach((nowNode, i) => {
    nowNode.forEach((nowOrder, j) => {
      result[nowOrder] = stackedNum[i][j];
    });
  });

  return result.slice(1);
}

function getNextPath(paths, graph, now) {
  const max = graph.get(now).length;
  if (paths[now] + 1 > max) {
    paths[now] = 1;
    return 0;
  }
  return paths[now]++;
}

function canMakeTree(stackedOrder, target) {
  return stackedOrder.every(
    (nowStack, idx) => target[idx] <= nowStack.length * 3
  );
}
function getStackedNum(stackedOrder, target) {
  return stackedOrder.map((nowNode, idx) => {
    const stackedNumCnt = nowNode.length;
    const sumedList = Array(nowNode.length).fill(1);
    let sum = stackedNumCnt;

    for (let i = stackedNumCnt - 1; i >= 0; i--) {
      for (let j = 2; j > 0; j--) {
        if (sum + j <= target[idx]) {
          sumedList[i] += j;
          sum += j;
          break;
        }
      }
    }
    return sumedList;
  });
}
