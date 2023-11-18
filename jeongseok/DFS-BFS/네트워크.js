function solution(n, computers) {
  let count = 0;

  let isVisited = new Array(n).fill(0);

  function bfs(pos) {
    for (let i = 0; i < computers[pos].length; i++) {
      if (computers[pos][i] === 1 && isVisited[i] === 0) {
        isVisited[i] = 1;
        bfs(i);
      }
    }
  }

  for (let i = 0; i < n; i++) {
    if (isVisited[i] === 0) {
      count++;
      bfs(i);
    }
  }

  return count;
}
