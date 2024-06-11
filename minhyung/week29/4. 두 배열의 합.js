//https://www.acmicpc.net/problem/2143
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
0
4
-1 -1 1 1
3
1 1
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

// num 이상이 되는 처음 위치
function lower(array, num) {
  let left = 0;
  let right = array.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (array[mid] >= num) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return left;
}
// num 초과되는 처음 위치
function upper(array, num) {
  let left = 0;
  let right = array.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);

    if (array[mid] > num) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }

  return right;
}

function solution(t, arrN, arrM) {
  const arrayBNumsArray = [];
  let result = 0;

  for (let i = 1; i < arrN.length; i++) {
    arrN[i] += arrN[i - 1];
  }
  for (let i = 1; i < arrM.length; i++) {
    arrM[i] += arrM[i - 1];
  }

  // B배열에서 가능한 수들
  for (let left = 0; left < arrM.length; left++) {
    for (let right = left; right < arrM.length; right++) {
      const sum = arrM[right] - (arrM?.[left - 1] ?? 0);

      arrayBNumsArray.push(sum);
    }
  }
  arrayBNumsArray.sort((a, b) => a - b);

  // A배열의 경우를 순환하면서 더한게 t 미만인경우 B와 조합이 가능한 경우가 있는지 찾아봄
  for (let left = 0; left < arrN.length; left++) {
    for (let right = left; right < arrN.length; right++) {
      const sumA = arrN[right] - (arrN[left - 1] ?? 0);

      const low = lower(arrayBNumsArray, t - sumA);
      const up = upper(arrayBNumsArray, t - sumA);
      const sameNumCount = up - low;

      result += sameNumCount;
    }
  }

  return result;
}

const T = Number(input());
const n = Number(input());
const arrN = input();
const m = Number(input());
const arrM = input();
console.log(solution(T, arrN, arrM));

// n^4 하면 시간초과
// 1,000,000 100만 * log100만 = 100만 * 20 = 2천만
// 한개만 찾는개 아니라 여러개가 가능할수도 있음
// 이상 ~ 이하 위치를 찾아야함
// B배열에서 가능한 수들을 조건을 따지며 추가해줘서 계속 틀림...
// 조건 없이 모든 경우의 수를 넣어주니 통과
