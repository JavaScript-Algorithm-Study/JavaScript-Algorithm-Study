// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/42842
// 시작날짜: 2024.01.20
// 시작시간: 21:01
// 종료시간: 21:20
// 소요시간: 00:19

function solution(brown, yellow) {
  let height = 1;
  let width = (brown - 2) / 2;

  for (let i = 0; i < brown + yellow; i++) {
    if ((width - 2) * height === yellow) {
      return [width, height + 2];
    }

    height += 1;
    width -= 1;
  }
}
