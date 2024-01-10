// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/17677
// 시작날짜: 2024.01.07
// 시작시간: 15:36
// 종료시간: 16:13
// 소요시간: 00:37

// 자카드 유사드를 사용함
// 교집합 / 합집합을 사용함. A,B 모두 공집합이면 1로 정의

// 다중집함에 대해 확장 가능함
// A는 1을 3개, B는 1을 5개 -> 교: min(3,5) = 3, 합: min(3,5) = 5
// {1, 1, 2, 2, 3}, {1, 2, 2, 4, 5} -> 교: {1,2,2}, 합: {1,1,2,2,3,4,5}
// 교: 한쪽 돌면서 다른쪽에 있는지 확인함. 있으면 빼줌
// 합: 두개의 합집합 - 교집합 = 모든원소 더하면 중복된 원소가 두번 더해짐. -> 교집합만큼 빼줌

// FRANCE, FRENCH {FR, RA, AN, NC, CE} { FR, RE, EN, NC, CH}

// 1. 두글자씩 끊어 다중집항의 원소로 만듬.
// 2. 영문자 글자 쌍만 유효
// 3. 대소문자 구분 없음

function splitStr(str) {
  const arr = [];
  const reg = /[A-Z]/;
  for (let i = 0; i < str.length - 1; i++) {
    const left = reg.test(str[i]);
    const right = reg.test(str[i + 1]);

    if (left && right) {
      arr.push([str[i], str[i + 1]].join(""));
    }
  }
  return arr;
}
const getIntersection = (arr1, arr2) => {
  const result = [];
  for (let i = 0; i < arr1.length; i++) {
    if (arr2.includes(arr1[i])) {
      const idx = arr2.indexOf(arr1[i]);
      result.push(arr2[idx]);
      arr2.splice(idx, 1);
    }
  }
  return result.length;
};

function solution(str1, str2) {
  const arr1 = splitStr(str1.toUpperCase());
  const arr2 = splitStr(str2.toUpperCase());

  let intersection = getIntersection([...arr1], [...arr2]);
  let union = [...arr1, ...arr2].length - intersection;

  const result = Math.floor((intersection / union) * 65536);
  if (result === 0) return 0;
  return result || 65536;
}
