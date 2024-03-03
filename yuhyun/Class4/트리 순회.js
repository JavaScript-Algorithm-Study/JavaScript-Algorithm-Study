const fs = require('fs');
const path = process.platform === 'linux' ? '/dev/stdin' : '예제.txt';
const input = fs.readFileSync(path).toString().trim().split('\n');

function solution(N, nodeInfos) {
  const ROOT = 'A';
  const EMPTY = '.';

  const tree = new Map(nodeInfos.map(([root, left, right]) => [root, [left, right]]));
  return [전위순회(ROOT, tree), 중위순회(ROOT, tree), 후위순회(ROOT, tree)].join('\n');

  function 전위순회(root, tree) {
    if (root === EMPTY) {
      return '';
    }
    const [left, right] = tree.get(root);
    return root + 전위순회(left, tree) + 전위순회(right, tree);
  }
  function 중위순회(root, tree) {
    if (root === EMPTY) {
      return '';
    }
    const [left, right] = tree.get(root);
    return 중위순회(left, tree) + root + 중위순회(right, tree);
  }
  function 후위순회(root, tree) {
    if (root === EMPTY) {
      return '';
    }
    const [left, right] = tree.get(root);
    return 후위순회(left, tree) + 후위순회(right, tree) + root;
  }
}

const N = Number(input.shift());
const nodeInfos = input.map((line) => line.split(' '));
console.log(solution(N, nodeInfos));
