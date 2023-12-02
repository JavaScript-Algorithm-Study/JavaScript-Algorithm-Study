/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/67258
난이도 : Level3


어피치 싹쓸이 쟁이
진열대의 특정 범위의 보석을 모두 구매하되 진열된 모든 종류의 보석을
적어도 1개 이상 포함하는 가장 짧은 구간을 찾아서 구매

https://velog.io/@bepyan/JS-%ED%94%84%EB%A1%9C%EA%B7%B8%EB%9E%98%EB%A8%B8%EC%8A%A4-%EB%B3%B4%EC%84%9D-%EC%87%BC%ED%95%91
*/

function solution(gems) {
  const cnt = new Set(gems).size;
  const map = new Map();
  let answer = [1, gems.length];

  gems.forEach((gem, i) => {
    map.delete(gem);
    map.set(gem, i);
    if (map.size === cnt) {
      const tmp = [map.values().next().value + 1, i + 1];
      answer = answer[1] - answer[0] > tmp[1] - tmp[0] ? tmp : answer;
    }
  });
  return answer;
}
