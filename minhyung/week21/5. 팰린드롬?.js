//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
3
1 11 111
1
3 3
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function getPalindromeArray(word) {
  const wordLength = word.length;
  const arr = Array(wordLength).fill(0);

  for (let i = 1; i < wordLength; i++) {
    let left = i - arr[i] - 1;
    let right = i + arr[i] + 1;
    while (left >= 0 && right < wordLength && word[left] === word[right]) {
      arr[i]++;
      left--;
      right++;
    }
  }

  return arr;
}
function solution(words, questions) {
  const word = ["@"];
  words.forEach((str) => {
    word.push(str, "@");
  });

  const palindromeArray = getPalindromeArray(word);
  let result = "";

  questions.forEach(([s, e]) => {
    const start = s * 2 - 1;
    const end = e * 2 - 1;
    const center = start + Math.floor((end - start) / 2);

    let palindromeLength = e - s + 1;

    if (palindromeArray[center] >= palindromeLength) {
      result += "1\n";
    } else {
      result += "0\n";
    }
  });

  return result;
}

const N = +input();
const words = input();
const M = +input();
const questions = Array.from({ length: M }, () => input());
console.log(solution(words, questions));
