function solution(edges, target) {
  const PADDING = 1;
  const ROOT = 1;

  const nNode = edges.length + 1;
  const max = target.reduce((acc, cur) => acc + cur, 0);

  const ascendingChild = ([_, childA], [__, childB]) => childA - childB;
  edges.sort(ascendingChild);

  const tree = createTree(edges);

  const leafNodeList = Array.from(Array(max), () => drop(ROOT - PADDING, tree));

  let numAcc = 0;
  const result = [];
  const resultMap = new Map();
  const nodeNumAcc = Array(nNode).fill(0);

  for (let curIndex = 0; curIndex < leafNodeList.length; curIndex++) {
    const leafNode = leafNodeList[curIndex];
    if (numAcc === max) {
      break;
    }

    const curNodeNumAcc = nodeNumAcc[leafNode];
    const targetNodeNum = target[leafNode];
    if (targetNodeNum === 0) {
      break;
    }

    const diffNum = Math.min(targetNodeNum - curNodeNumAcc, 3);
    if (diffNum > 0) {
      const numList = resultMap.get(leafNode) || [];
      numList.push(diffNum);
      resultMap.set(leafNode, numList);

      numAcc += diffNum;
      nodeNumAcc[leafNode] += diffNum;
      continue;
    }

    const numList = resultMap.get(leafNode);
    const prev = numList.findIndex((num) => num > 1);
    if (prev < 0) {
      break;
    }

    numList[prev] -= 1;
    numList.push(1);
  }

  if (numAcc !== max) {
    return [-1];
  }

  resultMap.forEach((numList) => numList.sort((a, b) => b - a));

  for (const leafNode of leafNodeList) {
    if (!resultMap.has(leafNode)) {
      break;
    }

    const numList = resultMap.get(leafNode);
    if (numList.length === 0) {
      break;
    }

    result.push(numList.pop());
  }

  return result;
}

function createTree(edges) {
  const PADDING = 1;
  const nNode = edges.length + 1;

  const result = Array.from(Array(nNode), () => ({
    children: [],
    roadIndex: -1,
  }));

  edges.forEach(([parent, child]) => {
    const parentInfo = result[parent - PADDING];
    if (parentInfo.roadIndex < 0) {
      parentInfo.roadIndex = 0;
    }
    parentInfo.children.push(child - PADDING);
  });

  return result;
}

function drop(root, tree) {
  let cur = root;
  while (tree[cur].roadIndex >= 0) {
    const { children, roadIndex } = tree[cur];
    const next = children[roadIndex];

    changeRoad(tree[cur]);

    cur = next;
  }
  return cur;
}

function changeRoad(node) {
  const { children } = node;
  node.roadIndex = (node.roadIndex + 1) % children.length;
}
