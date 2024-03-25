//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
10
0000000000
1100000011
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++]))();

function isSameArray(arr1, arr2) {
  return arr1.every((el, idx) => el === arr2[idx]);
}

function pushButton(idx, arr) {
  for (let i = -1; i <= 1; i++) {
    if (arr?.[idx + i] !== undefined) {
      arr[idx + i] ^= 1;
    }
  }
}

function pushButtons(nowState, goalState, firstCount, n) {
  let nowButtonPushCount = firstCount;

  for (let i = 1; i < n; i++) {
    if (nowState[i - 1] !== goalState[i - 1]) {
      pushButton(i, nowState);
      nowButtonPushCount++;
    }
  }

  return isSameArray(nowState, goalState) ? nowButtonPushCount : Infinity;
}

function solution(n, firstState, goalState) {
  const nonPushedState = [...firstState];
  const pushedState = [...firstState];
  pushButton(0, pushedState);

  // prettier-ignore
  const result = Math.min(
    pushButtons(nonPushedState, goalState, 0, n), 
    pushButtons(pushedState, goalState, 1, n)
  );

  return result === Infinity ? -1 : result;
}

const N = Number(input());
const firstState = input().split("").map(Number);
const goalState = input().split("").map(Number);
console.log(solution(N, firstState, goalState));
