//https://www.acmicpc.net/problem/10775
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
5
4
1
2
3
3
`.trim().split('\n');
//prettier-ignore
const input = (() => { let l = 0; return () => Number(stdin[l++])})();
function useUnionFind(length) {
  const p = Array.from({ length }, (_, idx) => idx);

  function union(a, b) {
    const x = find(a);
    const y = find(b);

    if (x !== y) p[x] = y;
  }

  function find(a) {
    if (p[a] !== a) {
      p[a] = find(p[a]);
    }
    return p[a];
  }
  return { union, find, p };
}
function solution(gate, airplanes) {
  const { union, find, p } = useUnionFind(gate + 1);
  let result = 0;

  for (const gate of airplanes) {
    const next = find(gate);

    if (next === 0) break;

    union(gate, next - 1);
    result++;
  }

  return result;
}

const G = input(); // 게이트
const P = input(); // 비행기 대수
const airplanes = Array.from({ length: P }, () => input());
console.log(solution(G, airplanes));

// 처음에 틀린 이유: 비행기를 더이상 못대면 break해야 하는데 하지 않음
// 두번째 틀린 이유: find(gate) !== find(gate - 1) 일 때 비행기를 대도록 했는데
//               이러면 비행기가 두대까지는 같은곳에 들어가는데 그 다음 비행기부터는 들어가지 않음
//               gate, gate-1이 항상 같을것 이기 때문
//               그래서 gate와 find(gate)-1의 값을 가지고 union함
