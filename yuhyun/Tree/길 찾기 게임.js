function solution(nodeinfo) {
  const [X, Y] = [0, 1];
  const [POSITION, NODE] = [0, 1];
  const [LEFT, RIGHT] = [0, 1];

  const ascendingY = (nodeAInfo, nodeBInfo) =>
    nodeAInfo[POSITION][Y] - nodeBInfo[POSITION][Y];

  const sortedNodeList = (() => {
    const nodeList = nodeinfo.map((position, node) => [position, node]);
    nodeList.sort(ascendingY);
    return nodeList;
  })();

  const createTree = (root) => {
    const tree = Array.from({ length: nodeinfo.length }, () => [null, null]);

    const divide = (root, children) => {
      const [rootX] = nodeinfo[root];
      const left = [];
      const right = [];

      children.forEach((childInfo) => {
        const childX = childInfo[POSITION][X];
        const target = childX < rootX ? left : right;
        target.push(childInfo);
      });

      return [left, right];
    };

    const drawEdge = (root, children) => {
      const [leftChildren, rightChildren] = divide(root, children);
      if (leftChildren.length) {
        const [_, left] = leftChildren.pop();
        tree[root][LEFT] = left;
        drawEdge(left, leftChildren);
      }

      if (rightChildren.length) {
        const [_, right] = rightChildren.pop();
        tree[root][RIGHT] = right;
        drawEdge(right, rightChildren);
      }
    };

    drawEdge(root, sortedNodeList.slice(0, -1));

    return tree;
  };

  const traverseTree = (root, tree) => {
    const [PREORDER, POSTORDER] = [0, 1];

    const result = [[], []];

    const dfs = (root) => {
      result[PREORDER].push(root + 1);
      tree[root].filter((child) => child !== null).forEach(dfs);
      result[POSTORDER].push(root + 1);
    };

    dfs(root);

    return result;
  };

  const root = sortedNodeList.at(-1)[NODE];
  const tree = createTree(root);
  return traverseTree(root, tree);
}
