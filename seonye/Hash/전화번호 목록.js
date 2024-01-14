/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/42577
난이도 : Level 2
*/
function solution(phone_book) {
  var answer = true;

  phone_book.sort();

  for (let i = 1; i < phone_book.length; i++) {
    if (phone_book[i].startsWith(phone_book[i - 1])) return false;
  }

  return answer;
}
