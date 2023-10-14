// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/42892
// 시작날짜: 2023.10.07
// 시작시간: 18:18
// 종료시간: 20:44(테케만 통과)
// 소요시간: 02:22분 (더 추가)

// 더 가까운 곳에 해야함

class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

function solution(nodeinfo) {
  const sortedNodes = nodeinfo
    .map(([x, y], idx) => ({ x, y, idx: idx + 1 }))
    .sort((a, b) => b.y - a.y || a.x - b.x);

  const tree = buildTree(sortedNodes);
  const preorder = travelTree(tree, true);
  const postorder = travelTree(tree, false);

  return [preorder, postorder];
}

function buildTree(sortedNodes) {
  const y = new Map();
  const root = new Node(sortedNodes[0]);
  let beforeRoots = [root];

  // 같은 y레벨에 노드들을 넣어줌 (순서대로 순회하기 위해 Map 사용)
  sortedNodes.slice(1).forEach((node) => {
    if (y.has(node.y)) y.get(node.y).push(node);
    else y.set(node.y, [node]);
  });

  // 모든 y레벨을 돌음
  y.forEach((nowLevels) => {
    let beforeRootIdx = 0;
    let parent = beforeRoots[beforeRootIdx];
    const newNodes = [];

    // 같은 y레벨을 돌면서 상위의 부모에 넣어줌
    nowLevels.forEach((nowLevel, idx, arr) => {
      let nextParent = beforeRoots[beforeRootIdx + 1];
      const changedChildren = changeChildrenAndReturnBool(
        parent,
        nowLevel,
        newNodes,
        nextParent
      );
      // 만약 현재 부모의 자식이 변경되지 않았으면 다음 부모를 확인해 봐야함
      if (!changedChildren) {
        parent = beforeRoots[++beforeRootIdx];
        nextParent = beforeRoots[beforeRootIdx + 1];
        changeChildrenAndReturnBool(parent, nowLevel, newNodes, nextParent);
      }
    });
    beforeRoots = newNodes;
  });

  return root;
}
function changeChildrenAndReturnBool(parent, nowNode, newNodes, nextParent) {
  if (parent.left === null && nowNode.x < parent.data.x) {
    parent.left = new Node(nowNode);
    newNodes.push(parent.left);
  } else if (parent.right === null && nowNode.x > parent.data.x) {
    // 여기서 만약 nextParent 있고, 다음 부모의 x 좌표차가 현재부모보다 적다면 return false;
    const parentX = parent.data.x;
    const nowXDiff = Math.abs(parent.data.x - nowNode.x);
    const nextXDiff = Math.abs(nextParent?.data.x - nowNode.x);
    if (nextParent && nowXDiff > nextXDiff) {
      return false;
    }

    parent.right = new Node(nowNode);
    newNodes.push(parent.right);
  } else {
    return false;
  }

  return true;
}
function travelTree(tree, isPreorder, result = []) {
  if (isPreorder) {
    result.push(tree.data.idx);
  }
  if (tree.left) {
    travelTree(tree.left, isPreorder, result);
  }
  if (tree.right) {
    travelTree(tree.right, isPreorder, result);
  }
  if (!isPreorder) {
    result.push(tree.data.idx);
  }
  return result;
}
