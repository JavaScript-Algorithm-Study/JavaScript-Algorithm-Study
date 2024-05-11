// 링크: https://www.acmicpc.net/problem/9663
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
8
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => stdin[l++].split(' ').map(Number);})();

function solution(N) {
  let 세로 = 0;
  let 좌대각 = 0;
  let 우대각 = 0;

  const insert = (bit, idx) => bit | (1 << idx);
  const remove = (bit, idx) => bit & ~(1 << idx);
  const find = (bit, idx) => (bit & (1 << idx)) > 0;

  let result = 0;

  const queen = (row) => {
    if (row === N) {
      result++;
      return;
    }
    for (let col = 0; col < N; col++) {
      const 좌대각_좌표 = row + col;
      const 우대각_좌표 = row - col + N - 1;

      if (find(세로, col) || find(좌대각, 좌대각_좌표) || find(우대각, 우대각_좌표)) continue;

      세로 = insert(세로, col);
      좌대각 = insert(좌대각, 좌대각_좌표);
      우대각 = insert(우대각, 우대각_좌표);

      queen(row + 1);

      세로 = remove(세로, col);
      좌대각 = remove(좌대각, 좌대각_좌표);
      우대각 = remove(우대각, 우대각_좌표);
    }
  };

  queen(0);

  return result;
}

console.log(solution(+input()));
// 좌대각: y - x + N
// 우대각: y + x
// 00 01 02 03
// 10 11 12 13
// 20 21 22 23
// 30 31 32 33
