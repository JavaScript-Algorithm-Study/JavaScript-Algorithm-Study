// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/92344
// 시작날짜: 2024.01.21
// 시작시간: 17:30
// 종료시간: 18:44 + (01:12 -> 잠깐 멈췄던 시간)
// 소요시간: 02:26

function applyCallbackToArray(si, ei, sj, ej, cb) {
  for (let i = si; i < ei; i++) {
    for (let j = sj; j < ej; j++) {
      cb(i, j);
    }
  }
}
function safeAddToArray(maxY, maxW, y, x, arr, num) {
  if (y < 0 || y >= maxY || x < 0 || x >= maxW) return;
  arr[y][x] += num;
}

function solution(board, skill) {
  const [h, w] = [board.length, board[0].length];
  const action = { 1: (num) => -num, 2: (num) => num };
  const sumBoard = Array.from({ length: h }, () => Array.from({ length: w }, () => 0));

  skill.forEach(([type, r1, c1, r2, c2, degree]) => {
    const num = action[type](degree);
    safeAddToArray(h, w, r1, c1, sumBoard, num);
    safeAddToArray(h, w, r1, c2 + 1, sumBoard, -num);
    safeAddToArray(h, w, r2 + 1, c1, sumBoard, -num);
    safeAddToArray(h, w, r2 + 1, c2 + 1, sumBoard, num);
  });

  applyCallbackToArray(0, h, 1, w, (i, j) => {
    sumBoard[i][j] += sumBoard[i][j - 1];
  });
  applyCallbackToArray(0, w, 1, h, (i, j) => {
    sumBoard[j][i] += sumBoard[j - 1][i];
  });
  applyCallbackToArray(0, h, 0, w, (i, j) => {
    board[i][j] += sumBoard[i][j];
  });

  return board.reduce((acc, row) => (acc += row.filter((col) => col > 0).length), 0);
}

// 그냥 하면 시간복잡도 2500억임 그럼 어떻게?
// type: 1 = 공격 (내구도 낮춤), 2 = 회복 (내구도 높임)
// r1 c1 r2 c2: (r1,c1) = 왼쪽상단, (r2,c2) = 오른쪽하단
// degree: 공격 혹은 회복시 이 수치만큼 높임
// 시간복잡도 초과할것같은데..일단 해봄
// 역시 시간초과
// 각 가로줄: 1000 * 1000 => 1000000
// skills가 100개만 넘어도 시간복잡도 초과해버림
// 스킬이 닿는 범위를 저장해두면?
// 대충 생각해도 2(1000*1000)! -> 시간초과...
// 시작 부분에 끝나는 지점을 저장해둔다 해도 시간초과날듯
// 누적합으로 어떻게 안되려나?
// 1차원 -> 2~4이 -1이라면 5(4+1)에 1을두면 나머지는 0이고 2,3,4만 -1임
// 00-100100
// 2차원 -> 왼->오, 위->아래 두번 더하는거 생각해야할듯.
// [r1][c1] = degree
// [r1][c2+1] = -degree
// [r2+1][c1] = -degree
// [r2+1[c2+1] = degree
