const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split(' ');

function solution(N, M) {
  const data = Array.from({ length: N }, (_, i) => i + 1);
  const cases = [];

  const combinationWithRepeat = (arr, depth) => {
    if (arr.length === M) {
      cases.push(arr.join(' '));
      return;
    }

    for (let i = depth; i < data.length; i++) {
      combinationWithRepeat([...arr, data[i]], i);
    }
  };

  combinationWithRepeat([], 0);

  return cases.join('\n');
}

const [N, M] = input.map(Number);
console.log(solution(N, M));
