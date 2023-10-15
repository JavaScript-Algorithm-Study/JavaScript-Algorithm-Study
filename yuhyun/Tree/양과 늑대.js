function solution(info, edges) {
  const ROOT = 0;
  const SHEEP = 0;

  let maxSheep = 0;
  const tree = (() => {
    const tree = Array.from(Array(edges.length + 1), () => []);
    edges.forEach(([parent, child]) => tree[parent].push(child));
    return tree;
  })();

  const isSheep = (node) => info[node] === SHEEP;

  const traverse = (root, reachableList, sheep, wolf) => {
    const nextSheep = sheep + (isSheep(root) ? 1 : 0);
    const nextWolf = wolf + (isSheep(root) ? 0 : 1);

    if (nextSheep <= nextWolf) {
      return;
    }

    maxSheep = Math.max(maxSheep, nextSheep);

    const children = tree[root];
    children.forEach((child) => {
      reachableList[child] = true;
    });

    reachableList.forEach((reachable, next) => {
      if (!reachable) {
        return;
      }

      reachableList[next] = false;
      traverse(next, reachableList, nextSheep, nextWolf);
      reachableList[next] = true;
    });

    children.forEach((child) => {
      reachableList[child] = false;
    });
  };

  traverse(ROOT, Array(info.length).fill(false), 0, 0);

  return maxSheep;
}
