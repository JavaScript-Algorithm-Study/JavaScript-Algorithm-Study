// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/64065
// 시작날짜: 2024.01.07
// 시작시간: 16:16
// 종료시간: 16:44
// 소요시간: 00:28

// 결과가 500이하인 경우만 입력으로 주어짐 = 500+499+...+2+1 = 대략 12만
function solution(s) {
  const result = new Set();
  const str = s
    .slice(1, s.length - 1)
    .split(`},{`)
    .map((s) => s.replace(/[{}]/g, "").split(","))
    .sort((a, b) => a.length - b.length)
    .map((s) => new Set(s));

  str.forEach((nowSet) => {
    nowSet.forEach((s) => {
      if (result.has(s)) {
        return;
      }
      result.add(s);
    });
  });

  return Array.from(result).map(Number);
}
