// 사람 순열 구하기
// 모든 벽 구하기
// 반복

let answer = 999999;
function solution(n, weak, dist) {
  dist.sort((a, b) => b - a);

  for (let i = 1; i < dist.length + 1; i++) {
    const isVisited = new Array(dist.length).fill(0);
    const moveCase = backtracking(i, 0, [], dist, isVisited, weak, n);
  }

  return answer === 999999 ? -1 : answer;
}

// dist 순열
function backtracking(maxDepth, curDepth, arr, dist, isVisited, weak, n) {
  if (maxDepth === curDepth) {
    checkWall(arr, weak, n);
    return arr;
  }

  for (let i = 0; i < dist.length; i++) {
    if (!isVisited[i]) {
      isVisited[i] = 1;
      const newArr = [...arr];
      newArr.push(dist[i]);
      backtracking(maxDepth, curDepth + 1, newArr, dist, isVisited, weak, n);
      isVisited[i] = 0;
    }
  }
}

function checkWall(arr, weak, n) {
  for (let i = 0; i < weak.length; i++) {
    let newWeakArr = weak.slice(i).concat(weak.slice(0, i));

    for (let i = 1; i < newWeakArr.length; i++) {
      if (newWeakArr[i - 1] > newWeakArr[i]) {
        newWeakArr[i] += n;
      }
    }

    let newArr = [...arr];

    while (1) {
      // 전부 탐색했다면
      if (newWeakArr.length === 0) {
        answer = Math.min(answer, arr.length);
        break;
      }

      // 인원 다 썼다면
      if (newArr.length === 0) {
        break;
      }
      // 더 탐색할 수 있다면
      else {
        let start = newWeakArr.shift();
        let end = start + newArr.shift();
        newWeakArr = newWeakArr.filter((ele) => ele > end);
      }
    }
  }
}
