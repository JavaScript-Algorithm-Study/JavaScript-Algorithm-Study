//https://www.acmicpc.net/problem/16953
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
100 40021
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

class Queue {
  l = 0;
  r = 0;
  d = {};
  push(data) {
    this.d[this.r++] = data;
  }
  pop() {
    if (this.isEmpty()) return undefined;
    const result = this.d[this.l];
    delete this.d[this.l++];
    return result;
  }
  isEmpty() {
    return this.l === this.r;
  }
}

function addStringOneToEndOfNum(num) {
  const stringNum = String(num);
  const addedOne = stringNum + "1";

  return Number(addedOne);
}
function solution(A, B) {
  const queue = new Queue();

  queue.push([A, 0]);

  while (!queue.isEmpty()) {
    const [num, operationCount] = queue.pop();

    if (num === B) return operationCount + 1;

    if (num * 2 <= B) {
      queue.push([num * 2, operationCount + 1]);
    }

    const numWithOneAdded = addStringOneToEndOfNum(num);

    if (numWithOneAdded <= B) {
      queue.push([numWithOneAdded, operationCount + 1]);
    }
  }

  return -1;
}

const [A, B] = input();
console.log(solution(A, B));

// A를 B로 바꿈
// 2를 곱하거나 1을 가장 오른쪽에 추가함
// A -> B로 바꾸는데 필요한 연산 최솟값에 1 더합값 출력
// 못만들면 -1 출력
