function solution(board, skill) {
  let attackMap = new Map();

  for (let i = 0; i < skill.length; i++) {
    const [type, r1, c1, r2, c2, degree] = skill[i];

    let condition = String(r1) + "a" + String(c1) + "a" + String(r2) + "a" + String(c2);

    let attackCondition = type === 1 ? -degree : degree;

    if (attackMap.has(condition)) {
      attackMap.set(condition, attackMap.get(condition) + attackCondition);
    } else {
      attackMap.set(condition, attackCondition);
    }
  }

  for (let [key, value] of attackMap) {
    const [r1, c1, r2, c2] = key.split("a").map(Number);

    for (let i = r1; i < r2 + 1; i++) {
      for (let j = c1; j < c2 + 1; j++) {
        board[i][j] += value;
      }
    }
  }

  let answer = 0;

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (board[i][j] > 0) {
        answer += 1;
      }
    }
  }

  return answer;
}
