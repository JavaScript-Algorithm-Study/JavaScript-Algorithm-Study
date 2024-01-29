// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/72416
// 시작날짜: 2024.01.27
// 시작시간: 20:12
// 종료시간: 24:19
// 소요시간: 04:07

const makeGraph = (links) =>
  links.reduce((G, [from, to]) => {
    G[from - 1] ? G[from - 1].push(to - 1) : (G[from - 1] = [to - 1]);
    return G;
  }, {});

const sumChilds = (childs, DP) =>
  childs.reduce((sum, child) => {
    return (sum += Math.min(DP[child][0], DP[child][1]));
  }, 0);

const minMemberCost = (childs, DP) =>
  childs?.reduce((min, child) => {
    const sub = DP[child][1] - DP[child][0];
    return sub < min ? sub : min;
  }, Infinity) || 0;

const dfs = (now, G, DP, sales) => {
  let childSum = 0;

  G?.[now]?.forEach((next) => {
    dfs(next);
  });
  childSum = G[now] ? sumChilds(G?.[now], DP) : 0;

  // 팀장이 참가한 경우 자신 매출 + 자식 DP들의 최솟값을 더해줌
  DP[now][1] = sales[now] + childSum;

  // 팀장이 참가하지 않고, 팀원중 한명이라도 참석한다면
  if (G?.[now]?.some((child) => DP[child][0] > DP[child][1])) {
    DP[now][0] = childSum;
  }
  // 팀장이 참가하지 않고, 팀원중 한명도 참석하지 않았다면
  // 강제로 가장 값이 적은 팀원을 참가시킴
  else {
    DP[now][0] = childSum + minMemberCost(G?.[now], DP);
  }
};

function solution(sales, links) {
  const G = makeGraph(links);
  const DP = Array.from({ length: sales.length }, () => [0, 0]);

  dfs(0, G, DP, sales);

  return Math.min(...DP[0]);
}
