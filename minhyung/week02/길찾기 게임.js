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

  const root = new Node(sortedNodes[0]);

  const addNode = (parent, child) => {
    if (child.data.x < parent.data.x) {
      if (parent.left === null) parent.left = child;
      else addNode(parent.left, child);
    }

    if (child.data.x > parent.data.x) {
      if (parent.right === null) parent.right = child;
      else addNode(parent.right, child);
    }
  };

  sortedNodes.slice(1).forEach((node) => {
    addNode(root, new Node(node));
  });

  const travel = (node, isPreorder, result = []) => {
    if (isPreorder) result.push(node.data.idx);
    if (node.left) travel(node.left, isPreorder, result);
    if (node.right) travel(node.right, isPreorder, result);
    if (!isPreorder) result.push(node.data.idx);
    return result;
  };

  return [travel(root, true), travel(root, false)];
}
