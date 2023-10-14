function solution(info, edges) {
  let answer = 0;

  function DFS(idx, sheep, wolf, nodes) {
    if (info[idx] === 0) {
      sheep += 1;
    } else {
      wolf += 1;
    }

    if (sheep <= wolf) {
      return;
    }

    answer = Math.max(answer, sheep);

    nodes = nodes.filter((node) => node !== idx);

    for (let i = 0; i < edges.length; i++) {
      if (edges[i][0] === idx) {
        nodes.push(edges[i][1]);
      }
    }

    for (let i = 0; i < nodes.length; i++) {
      DFS(nodes[i], sheep, wolf, nodes);
    }
  }

  DFS(0, 0, 0, [0]);

  return answer;
}
