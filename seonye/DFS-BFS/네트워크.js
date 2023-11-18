/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/43162
난이도 : Level 3

1. 문제설명
컴퓨터 개수 n, 연결에 대한 정보가 담긴 2차원 배열 computers가 매개변수로 주어질 때
네트워크의 개수를 return

2. 풀이
전체 컴퓨터를 돌면서 dfs를 몇번 호출해서 모두를 방문하는지 세면 된다.
*/

function solution(n, computers) {
  let answer = 0;
  let network = Array.from({ length: n }, () => []);

  for (let i = 0; i < computers.length; i++) {
    for (let j = 0; j < computers.length; j++) {
      if (i !== j && computers[i][j] === 1) network[i].push(j);
    }
  }
  let visited = new Array(n).fill(false);

  const dfs = (x) => {
    visited[x] = true;
    for (y of network[x]) {
      if (!visited[y]) dfs(y);
    }
  };

  for (let i = 0; i < computers.length; i++) {
    if (visited[i]) continue;
    dfs(i);
    answer += 1;
  }

  return answer;
}
