const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, m, data) {
  const cases = [];
  data = data.sort((a, b) => a - b);

  const permutation = (arr) => {
    if (arr.length === m) {
      cases.push(arr.join(' '));
      return;
    }

    for (let i = 0; i < n; i++) {
      if (!arr.includes(data[i])) permutation([...arr, data[i]]);
    }
  };

  permutation([]);

  return cases.join('\n');
}

const [n, m] = input[0].split(' ').map(Number);
const data = input[1].split(' ').map(Number);
console.log(solution(n, m, data));
