// 1. 리프노드의 번호 알기
// 2. 각 리프노드가 몇 번째로 도착하는지 구하기
// 3. 각 리프노드에 떨어진 갯수 * 1 < 해당 target < 떨어진 갯수 * 3이 만족하는지 확인

function solution(edges, target) {
  const tree = {};
  const lastVisited = {};

  // 트리, 마지막 방문 초기화
  for (let i = 0; i < edges.length; i++) {
    if (!tree[edges[i][0]]) {
      tree[edges[i][0]] = [edges[i][1]];
      lastVisited[edges[i][0]] = -1;
    } else {
      tree[edges[i][0]].push(edges[i][1]);
    }
  }

  for (key in tree) {
    tree[key].sort((a, b) => a - b);
  }

  // 각 요소에 방문하는 순서 저장하기위함
  let leafOrder = {};

  for (let i = 0; i < tree[1].length; i++) {
    treeTraverse(tree[1][i]);
  }

  // 리프 노드 찾기
  function treeTraverse(cur) {
    // 리프 라면
    if (!tree[cur]) {
      leafOrder[cur] = [];
      return;
    }

    for (let i = 0; i < tree[cur].length; i++) {
      treeTraverse(tree[cur][i]);
    }
  }

  // 리프 방문 횟수
  let count = 0;

  // 정상 종료인지 확인
  let normalEnd = true;

  while (1) {
    let next = tree[1][lastVisited[1] + 1];
    lastVisited[1]++;

    let canEnd = false;

    for (let key in leafOrder) {
      // 모두가 범위 안에 들면
      if (leafOrder[key].length * 1 <= target[key - 1] && leafOrder[key].length * 3 >= target[key - 1]) {
        canEnd = true;
      }
      // 절대 못함
      else if (leafOrder[key].length * 1 >= target[key - 1]) {
        canEnd = true;
        normalEnd = false;
        break;
      } else {
        canEnd = false;
        break;
      }
    }

    if (canEnd) {
      break;
    }

    if (!next) {
      next = tree[1][0];
      lastVisited[1] = 0;
    }

    while (1) {
      // 리프노드라면
      if (!tree[next]) {
        leafOrder[next].push(count + 1);
        count++;
        break;
      }

      // 올바른 자식을 가리킨다면
      else {
        lastVisited[next] += 1;
        next = tree[next][lastVisited[next] % tree[next].length];
      }
    }
  }

  let realOrder = {};

  if (normalEnd) {
    for (let key in leafOrder) {
      let start = target[key - 1] - leafOrder[key].length;
      let array = new Array(leafOrder[key].length).fill(1);
      let idx = 0;

      while (1) {
        if (start === 0) {
          break;
        }

        if (start >= 2) {
          array[idx] += 2;
          start -= 2;
          idx++;
        } else {
          array[idx] += 1;
          start -= 1;
          idx++;
        }
      }

      realOrder[key] = [...array].sort();
    }

    let answer = [];

    for (let i = 1; i < count + 1; i++) {
      for (let key in leafOrder) {
        if (leafOrder[key].includes(i)) {
          answer.push(realOrder[key].shift());
        }
      }
    }

    return answer;
  } else {
    return [-1];
  }
}
