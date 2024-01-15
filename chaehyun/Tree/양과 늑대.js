function solution(info, edges) {
  var answer = 0;
  let tree = Array.from({ length: info.length }, () => []);
  edges.forEach(([parent, child]) => {
    tree[parent].push(child);
  });

  function dfs(currentNode, wolf, sheep, possibleNodes) {
    answer = Math.max(sheep, answer);

    if (wolf >= sheep) {
      return;
    }
    possibleNodes = [...possibleNodes, ...tree[currentNode]];
    possibleNodes.splice(possibleNodes.indexOf(currentNode), 1);

    for (const nextNode of possibleNodes) {
      if (info[nextNode]) {
        dfs(nextNode, wolf + 1, sheep, possibleNodes);
      } else {
        dfs(nextNode, wolf, sheep + 1, possibleNodes);
      }
    }
  }
  dfs(0, 0, 1, [0]);
  return answer;
}
