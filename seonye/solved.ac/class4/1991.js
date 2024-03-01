const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(N, info) {
  const tree = Array.from({ length: N }, () => []);

  for (let i = 0; i < tree.length; i++) {
    const [parent, leftChild, rightChild] = info[i].map((i) => i.charCodeAt() - 65);
    if (leftChild) tree[parent].push(leftChild);
    if (rightChild) tree[parent].push(rightChild);
  }

  const preOrderResult = [];
  function preOrder(x, result) {
    if (x !== undefined && x !== -19) {
      result.push(String.fromCharCode(x + 65));
      tree[x].forEach((child) => {
        preOrder(child, result);
      });
    }
    return result.join('');
  }

  const inOrderResult = [];
  function inOrder(x, result) {
    if (x !== undefined && x !== -19) {
      inOrder(tree[x][0], result);
      result.push(String.fromCharCode(x + 65));
      inOrder(tree[x][1], result);
    }
    return result.join('');
  }

  const postOrderResult = [];
  function postOrder(x, result) {
    if (x !== undefined && x !== -19) {
      tree[x].forEach((child) => {
        postOrder(child, result);
      });
      result.push(String.fromCharCode(x + 65));
    }
    return result.join('');
  }

  console.log(preOrder(0, preOrderResult));
  console.log(inOrder(0, inOrderResult));
  console.log(postOrder(0, postOrderResult));
}

const N = Number(input[0]);
const info = input.slice(1, 1 + N).map((row) => row.trim().split(' '));

solution(N, info);
