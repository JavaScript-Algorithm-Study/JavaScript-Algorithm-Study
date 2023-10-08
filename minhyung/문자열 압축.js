// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/60057
// 시작날짜: 2023.10.07
// 시작시간: 12:50
// 종료시간: 14:39
// 소요시간: 01:49

function solution(s) {
  const last = s.length;
  let result = Infinity;

  // i = 자를 길이
  for (let i = 1; i < last + 1; i++) {
    let before = "";
    let output = "";

    // j = 현재 위치
    for (let j = 0; j < last; j++) {
      let now = slice(s, j, i + j);
      let diffCnt = 0;

      // 그 다음 문자쪽으로 왔더니 다르면
      // 다른거 찾을때까지 for 돌려서 cnt 찾음
      if (before !== now) {
        diffCnt = findDiffCnt(s, j, i, last, now);
      }

      j += diffCnt * i - 1;
      const numString = diffCnt > 1 ? diffCnt : "";
      output += `${numString}${now}`;
      before = now;
    }
    const outputLen = output.length;
    result = result > outputLen ? outputLen : result;
  }
  return result;
}

function slice(s, start, size) {
  return s.slice(start, size);
}

function findDiffCnt(s, start, size, last, word) {
  let diffCnt = 0;

  for (let i = start; i < last; i += size) {
    const now = slice(s, i, i + size);
    if (now === word) {
      diffCnt++;
    } else {
      break;
    }
  }

  return diffCnt;
}

console.log(solution("xababcdcdababcdcd"));
