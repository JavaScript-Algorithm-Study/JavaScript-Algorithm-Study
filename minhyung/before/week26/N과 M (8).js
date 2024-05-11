//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
3 1
4 5 2
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function solution(M, arr) {
  const result = [];

  arr.sort((a, b) => a - b);

  const getOrderedPermutation = (tmpArr = []) => {
    if (tmpArr.length === M) {
      result.push(tmpArr.join(" "));
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (tmpArr.length === 0 || tmpArr.at(-1) <= arr[i]) {
        getOrderedPermutation([...tmpArr, arr[i]]);
      }
    }
  };

  getOrderedPermutation();

  return result.join("\n");
}

const [N, M] = input();
const arr = input();

console.log(solution(M, arr));
