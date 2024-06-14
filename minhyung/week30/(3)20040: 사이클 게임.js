//https://www.acmicpc.net/problem/20040
//prettier-ignore
const stdin = process.platform === 'linux' ? require('fs').readFileSync(0, 'utf-8').trim().split('\n') : `
6 5
0 1
1 2
1 3
0 3
4 5
`.trim().split('\n');
const input = (() => ((l = 0), () => stdin[l++].split(" ").map(Number)))();

function useUnionFind(n) {
  const parents = Array.from({ length: n }, () => -1);

  function find(x) {
    if (parents[x] < 0) return x;
    else {
      parents[x] = find(parents[x]);
      return parents[x];
    }
  }

  function union(a, b) {
    const x = find(a);
    const y = find(b);

    if (x === y) return;

    // 값이 더 작은 쪽이 높이가 높은 노드
    if (parents[x] < parents[y]) {
      parents[x] += parents[y];
      parents[y] = x;
    } else {
      parents[y] += parents[x];
      parents[x] = y;
    }
  }

  return { union, find };
}
function solution(n, edges) {
  const { union, find, parents } = useUnionFind(n);

  for (let i = 0; i < edges.length; i++) {
    const [from, to] = edges[i];
    // from, to 연결 하기전에 root가 같다면 사이클 발생
    if (find(from) === find(to)) return i + 1;
    // 아니면 사이클 없으니까 합침
    else union(from, to);
  }

  return 0;
}

const [n, m] = input(); //노드 개수, 엣지 갯수
const edges = Array.from({ length: m }, () => input());
console.log(solution(n, edges));

// 점 세개는 절대 일직선 위에 놓이지 않음
// 매 차례 두 점을 선택해 선분을 그음
// 다시 그을수는 없어도, 선분의 교차는 가능함.
// 처음으로 사이클을 완성하면 게임이 종료됨

// 사이클: x에서 시작해 다른 선분을 한번만 지나 다시 x로 돌아옴

// 게임 종료x: 0, 종료: 몇번째에서 사이클 만들어졌는지 출력
