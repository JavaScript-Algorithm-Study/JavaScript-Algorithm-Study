function solution(user_id, banned_id) {
  let set = new Set();

  let isUsed = new Array(user_id.length).fill(0);

  // 현재 선택 갯수, 선택해야할 갯수
  function backtracking(cur, depth) {
    // banned의 갯수만큼 선택했다면
    if (cur === depth) {
      let answer = [];

      for (let i = 0; i < isUsed.length; i++) {
        if (isUsed[i]) {
          answer.push(user_id[i]);
        }
      }
      set.add(answer.sort().join(""));
      return;
    }

    for (let i = 0; i < user_id.length; i++) {
      // 밴 대상과 길이가 다르면
      if (banned_id[cur].length !== user_id[i].length) {
        continue;
      }

      if (isUsed[i]) {
        continue;
      }

      let canAnswer = true;

      // *이 아닌데 다르면 후보가 아님
      for (let j = 0; j < user_id[i].length; j++) {
        if (banned_id[cur][j] !== "*" && banned_id[cur][j] !== user_id[i][j]) {
          canAnswer = false;
        }
      }

      if (canAnswer) {
        isUsed[i] = 1;
        backtracking(cur + 1, depth);
        isUsed[i] = 0;
      }
    }
  }

  backtracking(0, banned_id.length);

  return set.size;
}
