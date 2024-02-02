/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/118669
난이도 : Level3
*/
const n = 7;
const paths = [
  [1, 2, 5],
  [1, 4, 1],
  [2, 3, 1],
  [2, 6, 7],
  [4, 5, 1],
  [5, 6, 1],
  [6, 7, 1],
];
const gates = [3, 7];
const summits = [1, 5];

function solution(n, paths, gates, summits) {
  var answer = [];
  const timeMap = new Map();
  const graph = Array.from({ length: n + 1 }, () => new Array());

  for (let idx = 0; idx < paths.length; idx++) {
    const [i, j, w] = paths[idx];
    timeMap.set(`${i}_${j}`, w);
    graph[i].push([i, j]);
    graph[j].push([j, i]);
  }

  for (let gate_i = 0; gate_i < gates.length; gate_i++) {
    const visited = new Array(n + 1).fill(false);
    const nodeMaxIntensity = new Array(n + 1).fill(0);

    const gate = gates[gate_i];
    let linkNodes = graph[gate];
    visited[gate] = true;
    console.log('gate', gate, linkNodes);
    while (linkNodes.length > 0) {
      const [start, end] = linkNodes.shift();
      const time =
        start <= end
          ? timeMap.get(`${start}_${end}`)
          : timeMap.get(`${end}_${start}`);
      console.log('지금은', start, end);
      const maxIntensity = Math.max(nodeMaxIntensity[start], time);
      if (gates.includes(end)) continue;

      if (visited[end])
        nodeMaxIntensity[end] = Math.min(nodeMaxIntensity[end], maxIntensity);
      else {
        visited[end] = true;
        nodeMaxIntensity[end] = maxIntensity;
        if (!summits.includes(end)) linkNodes = [...linkNodes, ...graph[end]];
      }
      console.log(nodeMaxIntensity);
    }

    for (let i = 0; i < summits.length; i++) {
      const summit = summits[i];
      if (answer.length === 0) answer = [summit, nodeMaxIntensity[summit]];
      else if (nodeMaxIntensity[summit] < answer[1]) {
        answer = [summit, nodeMaxIntensity[summit]];
      }
    }
  }

  return answer;
}

console.log(solution(n, paths, gates, summits));
