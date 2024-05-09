//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
3
1 2 3
1 3 2
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function solution(n, inorder, postorder) {
  const index = {};
  let result = "";

  inorder.forEach((node, idx) => {
    index[node] = idx;
  });

  function preorder(inStart, inEnd, postStart, postEnd) {
    if (inStart > inEnd || postStart > postEnd) {
      return;
    }

    const root = index[postorder[postEnd]];
    const left = root - inStart;
    const right = inEnd - root;

    result += `${inorder[root]} `;

    //왼쪽
    preorder(inStart, root - 1, postStart, postStart + left - 1);
    //오른쪽
    preorder(root + 1, inEnd, postEnd - right, postEnd - 1);
  }

  preorder(0, n - 1, 0, n - 1);

  return result;
}

const n = +input();
const inorder = input(); // 중위순회 왼쪽 - 부모 - 오른쪽
const postorder = input(); // 후위순회 오른쪽 - 왼쪽 - 부모
console.log(solution(n, inorder, postorder)); // 전위순회 구하기

//     1
//  2    3
// 4 5  6 7

// 4 2 5 1 6 3 7 - 중위
// 4 5 2 6 7 3 1 - 후위

// 6 3 2 4 1 5
// 6 3 4 2 5 1
//    1
//  2  5
// 3 4
//6

// 1 3 7 15 31 63
