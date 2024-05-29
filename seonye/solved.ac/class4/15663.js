const path = require('path');
const fs = require('fs');
const inputPath = path.join(__dirname, 'dev', 'stdin');
const input = fs.readFileSync(inputPath).toString().trim().split('\n');

function solution(n, m, numbers) {
  const getPermutation = (arr, length) => {
    if (length === 1) return arr.map((v) => [v]);

    const permutations = [];
    arr.forEach((v, index) => {
      getPermutation(
        [...arr.slice(0, index), ...arr.slice(index + 1)],
        length - 1
      ).forEach((rest) => permutations.push([v, ...rest]));
    });

    return permutations;
  };
  
  numbers.sort((a, b) => a - b);
  const resultSet = new Set();
  getPermutation(numbers, m).forEach((i) => {
    console.log(i);
    resultSet.add(i.join(' '));
  });

  return Array.from(resultSet).join('\n');
}

const [n, m] = input[0].split(' ').map(Number);
const numbers = input[1].split(' ').map(Number);
console.log(solution(n, m, numbers));
