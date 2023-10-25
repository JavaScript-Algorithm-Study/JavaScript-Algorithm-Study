/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/42885
난이도 : Level2

1. 문제
구명보트는 최대 2명, 무게 제한도 있다.
구명보트를 최대한 적게 사용해서 모든 사람 구출

사람들의 몸무게를 담은 배열 people, 무게 제한 limit, 모든 사람들을 구출하기 위해 필요한 구명보트 개수의 최소값 구하기

제한
무인도 갇힌 사람은 1명이상 50000명 이하
각 사람의 몸무게는 40kg이상 240kg 이하
무게제한은 40kg 이상 240kg 이하
무게제한은 항상 사람들의 몸무게 중 최댓값보다 크게 주어지므로, 사람들을 구출할 수 없는 경우는 없다.

people	              limit	        return
[70, 50, 80, 50]	    100	          3
[70, 80, 50]	        100	          3
[40,50,150,160]       200           2
[100,500,500,900,950] 1000          3


[ 100, 500, 500, 900, 950 ]
left = 0; right = length - 1;


2. 풀이
오름차순으로 정렬하고, pop 하면서 남은 무게가 다음 사람의 무게보다 작은 경우 새로운 구명보트로 갱신 -> 실패

아나 최대 2명ㅋㅋㅋㅋㅋㅋ

*/

const people = [30, 40, 50, 60];
const limit = 100;

function solution(people, limit) {
  var answer = 0;

  const peoples = [...people].sort((a, b) => a - b);

  let left = 0;
  let right = people.length - 1;

  while (left <= right) {
    const leftPerson = peoples[left];
    const rightPerson = peoples[right];

    if (leftPerson + rightPerson <= limit) {
      left += 1;
      right -= 1;
    } else if (rightPerson <= limit) {
      right -= 1;
    } else if (currLimit >= peoples[left]) {
      left += 1;
    }
    answer += 1;
  }

  return answer;
}

console.log(solution(people, limit));
