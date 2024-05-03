const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, inOrder, postOrder) {
  let idx = new Array(n + 1).fill(0);

  for (let i = 0; i < n; i++) {
    idx[inOrder[i]] = i;
  }

  const result = [];

  function find_pre_order(l_in, r_in, l_post, r_post) {
    if (l_in > r_in || l_post > r_post) return;
    let parent = postOrder[r_post];
    result.push(parent);

    let split_idx = idx[parent];
    let left = split_idx - l_in;

    //왼쪽 트리
    find_pre_order(l_in, split_idx - 1, l_post, l_post + left - 1);
    //오른쪽 트리
    find_pre_order(split_idx + 1, r_in, l_post + left, r_post - 1);
  }

  find_pre_order(0, n - 1, 0, n - 1);

  return result.join(' ');
}

const n = Number(input[0]);
const inOrder = input[1].split(' ').map(Number);
const postOrder = input[2].split(' ').map(Number);

console.log(solution(n, inOrder, postOrder));
