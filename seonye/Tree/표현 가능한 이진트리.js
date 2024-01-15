/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/150367
난이도 : Level 3
*/

function solution(numbers) {
  var answer = [];

  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    let binaryString = number.toString(2);

    while (!Number.isInteger(Math.log2(binaryString.length + 1))) {
      binaryString = '0' + binaryString;
    }

    const height = Math.log2(binaryString.length + 1) - 1;
    const isBinaryTree = dfs(binaryString, 0);

    answer.push(isBinaryTree ? 1 : 0);

    function dfs(tree, depth) {
      const rootIndex = Math.floor(tree.length / 2);

      if (tree[rootIndex] === '0' && depth === 0) return false;

      const width = Math.floor(binaryString.length / Math.pow(2, depth + 1));
      const leftTree = tree.slice(rootIndex - width, rootIndex);
      const rightTree = tree.slice(rootIndex + 1, rootIndex + width + 1);
      const leftTreeRootIndex = Math.floor(leftTree.length / 2);
      const rightTreeRootIndex = Math.floor(rightTree.length / 2);

      if (tree[rootIndex] === '0' && (leftTree[leftTreeRootIndex] === '1' || rightTree[rightTreeRootIndex] === '1'))
        return false;

      if (depth < height) {
        const leftResult = dfs(leftTree, depth + 1, height);
        const rightResult = dfs(rightTree, depth + 1, height);
        return leftResult && rightResult;
      }

      return true;
    }
  }

  return answer;
}
