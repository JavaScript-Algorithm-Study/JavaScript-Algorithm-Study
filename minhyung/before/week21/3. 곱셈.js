//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
5 2 12
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(BigInt)))();

function solution(a, b, c) {
  if (b === 1n) return a % c;

  const half = solution(a, b / 2n, c) % c;

  if (b % 2n === 0n) return (half * half) % c;
  else return (half * half * a) % c;
}

const [A, B, C] = input();
console.log(Number(solution(A, B, C)));
