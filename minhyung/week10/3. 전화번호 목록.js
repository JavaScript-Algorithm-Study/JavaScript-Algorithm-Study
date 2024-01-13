// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/150367
// 시작날짜: 2024.01.13
// 시작시간: 18:02
// 종료시간: 18:23
// 소요시간: 00:21

// n^2으로 풀면 시간초과가 발생함
// hash를 사용해 모든 번호를 저장해두고
// 각 번호의 접두어가 hash에 존재하는지 확인함

function solution(phone_book) {
  const hash = {};
  phone_book.forEach((num) => (hash[num] = true));

  for (const num of phone_book) {
    for (let i = 1; i < num.length; i++) {
      const sliced = num.slice(0, i);
      if (hash[sliced]) {
        return false;
      }
    }
  }
  return true;
}
