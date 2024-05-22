const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, numbers) {
  function binarySearch(start, end, target) {
    let mid;

    while (start < end) {
      mid = parseInt((start + end) / 2);
      if (lis[mid] < target) start = mid + 1;
      else end = mid;
    }

    return end;
  }

  let records = [];
  records[0] = 0;
  const lis = [];
  lis[0] = numbers[0];
  let j = 0;

  for (let i = 1; i < n; i++) {
    if (lis[j] < numbers[i]) {
      lis[++j] = numbers[i];
      records[i] = j;
    } else {
      let idx = binarySearch(0, j, numbers[i]);
      lis[idx] = numbers[i];
      records[i] = idx;
    }
  }

  let answer = [];
  let max = Math.max(...records);
  const maxIdx = records.indexOf(max);

  for (let i = maxIdx; i >= 0; i--) {
    if (records[i] === max) {
      answer.push(numbers[i]);
      max--;
    }
    if (max < 0) break;
  }

  return [answer.length, answer.reverse().join(' ')].join('\n');
}

const n = Number(input[0]);
const numbers = input[1].split(' ').map(Number);

console.log(solution(n, numbers));
