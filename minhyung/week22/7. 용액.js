//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
4
-100 -2 -1 103
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function getAndUpdateMinValues(minValues, minAbs, arr, left, right) {
  const absBetween = Math.abs(arr[left] + arr[right]);
  const minAbs = Math.abs(minValues[0] + minValues[1]);

  if (absBetween < minAbs) {
    minValues = [arr[left], arr[right]];
  }

  return minValues;
}

function solution(N, arr) {
  let left = 0;
  let right = N - 1;
  let minValues = [arr[left], arr[right]];

  while (left < right) {
    minValues = getAndUpdateMinValues(minValues, arr, left, right);

    const plusLeftAbs = Math.abs(arr[left + 1] + arr[right]);
    const minusRightAbs = Math.abs(arr[left] + arr[right - 1]);

    if (plusLeftAbs < minusRightAbs) {
      left++;
    } else {
      right--;
    }
  }

  return minValues.join(" ");
}

const N = Number(input());
const arr = input();
console.log(solution(N, arr));

// 산성 = 1 ~ 1,000,000,000
// 알칼리 = -1 ~ -1,000,000,000
// 두 용액 혼합해 0에 가까운 용액 만듬
// 투포인터?
// 왼쪽을 +1, 오른쪽을 +1 했을 때 현재보다 절대값이 작은쪽으로 이동함
