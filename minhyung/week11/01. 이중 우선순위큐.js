// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/42628
// 시작날짜: 2024.01.18
// 시작시간: 15:53
// 종료시간: 17:03
// 소요시간: 01:10

// 풀고서 보니까 배열로도 풀린다길래 정렬 하니까 되긴함
class pq {
  queue = [];
  constructor(cmp) {
    this.cmp = (a, b) => cmp(this.queue[a], this.queue[b]);
  }
  push(data) {
    // 맨 뒤에 넣고 위로 올라오면서 cmp = true면 swqp
    this.queue.push(data);

    let now = this.queue.length - 1;
    while (now > 0) {
      const parent = Math.floor((now - 1) / 2);

      if (this.cmp(now, parent) < 0) {
        this.swap(parent, now);
        now = parent;
      } else {
        break;
      }
    }
  }
  pop() {
    if (this.isEmpty()) return undefined;

    this.swap(0, this.queue.length - 1);
    const result = this.queue.pop();

    let now = 0;
    let left = 1;
    let right = 2;
    while (this.queue[left] !== undefined) {
      let next = left;

      if (this.queue[right] !== undefined && this.cmp(right, left) < 0) {
        next = right;
      }
      if (this.cmp(next, now) < 0) {
        this.swap(now, next);
        now = next;
        left = now * 2 + 1;
        right = now * 2 + 2;
      } else {
        break;
      }
    }
    return result;
  }
  isEmpty() {
    return this.queue.length === 0;
  }
  front() {
    return this.queue[0];
  }
  swap(a, b) {
    [this.queue[a], this.queue[b]] = [this.queue[b], this.queue[a]];
  }
}
const isInsert = (str) => str.match(/I (.*)/)?.[1];
const isDeleteMin = (str) => /D -1/.test(str);
const isDeleteMax = (str) => /D 1/.test(str);

function push(num, map, minHeap, maxHeap) {
  map.set(num, (map.get(num) ?? 0) + 1);
  minHeap.push(num);
  maxHeap.push(num);
}
function getNowNum(map, heap) {
  let num = heap.pop();
  while (!map.has(num) && !heap.isEmpty()) {
    num = heap.pop();
  }
  return num;
}
function operation(str, map, minHeap, maxHeap) {
  if (isInsert(str)) {
    push(isInsert(str), map, minHeap, maxHeap);
    return;
  }

  let num = "no";

  if (isDeleteMin(str)) {
    num = getNowNum(map, minHeap);
  } else if (isDeleteMax(str)) {
    num = getNowNum(map, maxHeap);
  } else {
    return;
  }

  if (!map.has(num)) return;

  map.set(num, map.get(num) - 1);

  if (map.get(num) <= 0) map.delete(num);
}

function getMinMax(map) {
  if (map.size === 0) return [0, 0];

  let min = Infinity;
  let max = -Infinity;

  map.forEach((_, k) => {
    min = min > +k ? +k : min;
    max = max < +k ? +k : max;
  });
  return [max, min];
}
function solution(operations) {
  const nums = new Map();
  const minHeap = new pq((a, b) => a - b);
  const maxHeap = new pq((a, b) => b - a);

  operations.forEach((cmd) => {
    operation(cmd, nums, minHeap, maxHeap);
  });

  return getMinMax(nums);
}

// 다 풀고 다른사람 풀이 보니까 shift를 쓰고 정렬을 써도 풀림...
// 테케가 빈약해서 그런듯
// const isInsert = (str) => str.match(/I (.*)/)?.[1];
// const isDeleteMin = (str) => /D -1/.test(str);
// const isDeleteMax = (str) => /D 1/.test(str);

// function solution(operations) {
//   const arr = operations.reduce((acc, now) => {
//     if (isInsert(now)) {
//       acc.push(Number(isInsert(now)));
//       acc.sort((a, b) => a - b);
//     }
//     if (isDeleteMin(now)) acc.shift();
//     if (isDeleteMax(now)) acc.pop();

//     return acc;
//   }, []);
//   if (arr.length === 0) return [0, 0];
//   else return [Math.max(...arr), Math.min(...arr)];
// }
