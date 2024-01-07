function solution(priorities, location) {
  var answer = 0;
  let queue = [];
  let cnt = 0;
  let idx = priorities.map((v, idx) => idx);

  while (priorities.length) {
    let max = Math.max(...priorities);

    if (priorities[0] < max) {
      priorities.push(...priorities.splice(0, 1));
      idx.push(...idx.splice(0, 1));
    } else {
      if (idx[0] === location) {
        return cnt + 1;
      }
      idx.shift();
      priorities.shift();
      cnt++;
    }
  }

  return answer;
}
