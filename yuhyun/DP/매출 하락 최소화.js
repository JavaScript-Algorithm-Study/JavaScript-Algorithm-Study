function solution(sales, links) {
  const CEO = 0;
  const tree = createTree(links);
  return Math.min(...dfs(CEO, tree, sales));
}

function dfs(root, tree, sales) {
  const children = tree[root];
  const sale = sales[root];

  const leafNode = children.length === 0;
  if (leafNode) {
    return [0, sale];
  }

  const subtreeDp = [];
  children.forEach((child) => subtreeDp.push(dfs(child, tree, sales)));

  const withRoot = [
    sale,
    ...subtreeDp.map((subResults) => Math.min(...subResults)),
  ].reduce((acc, cur) => acc + cur, 0);

  const withoutRoot = subtreeDp.map(([subWithoutRoot, subWithRoot], index) => {
    const min = Math.min(subWithoutRoot, subWithRoot);
    return withRoot - sale - min + subWithRoot;
  });

  return [Math.min(...withoutRoot), withRoot];
}

function createTree(links) {
  const PADDING = 1;

  const nNode = links.length + 1;
  const result = Array.from(Array(nNode), () => []);
  links.forEach(([parent, child]) =>
    result[parent - PADDING].push(child - PADDING)
  );
  return result;
}
