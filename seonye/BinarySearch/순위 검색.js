/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/72412
난이도 : Level 2
유형 : 이진탐색(lowerBound)

1. 문제 설명
지원자는 4가지 항목을 반드시 선택해야한다.
개발 언어 : cpp, java, python, -
직군 : backend, frontend, -
경력 : junior, senior, -
소울 푸드 : chicken, pizza, -

문의 사항 : 코딩테스트에 java로 참여했으며, backend 직군을 선택했고, junior 경력이면서, 소울푸드로 pizza를 선택한 사람 중 코딩테스트 점수를 50점 이상 받은 지원자는 몇 명인가?

info : 지원자의 정보와 코테점수를 하나의 문자열로 구성한 값의 배열
query : 개발팀이 궁금해하는 문의 조건이 문자열 형태로 담긴 배열

return : 각 문의 조건에 해당하는 사람들의 숫자를 순서대로 배열에 담은 값

입력 특이사항
코테 점수가 최대 10만, 지원자수가 최대 50000
query 배열의 크기는 최대 10만, 형식은 cpp and - and senior and pizza 500
- : 고려하지 않음

2. 풀이
query를 for문으로 돌면서 조건에 맞는 점수의 배열에서 이진탐색(lowerBound)으로 점수 조건을 만족하는 지원자를 찾는다.

조건에 맞는 지원자의 점수 배열을 한번에 찾기 위해 미리 사전을 만들어 놓는다.
- 일 때도 만족할 수 있게 모든 경우의 수를 사전에 기록한다.

2,3,4,7,13,16 실패
info_dict에 존재하지 않는 조건인 경우 예외처리
*/

function solution(info, query) {
  var answer = [];
  const info_dict = {};
  for (let i = 0; i < info.length; i++) {
    const person = info[i].split(' ');
    for (lang of [person[0], '-']) {
      for (part of [person[1], '-']) {
        for (career of [person[2], '-']) {
          for (food of [person[3], '-']) {
            let key = [lang, part, career, food].join(' and ');
            if (info_dict[key]) info_dict[key].push(Number(person[4]));
            else info_dict[key] = [Number(person[4])];
          }
        }
      }
    }
  }
  for (key in info_dict) {
    info_dict[key].sort((a, b) => a - b);
  }

  for (let i = 0; i < query.length; i++) {
    const cmd = query[i].split(' ');
    const cmd_key = cmd.slice(0, 7).join(' ');
    const cmd_score = Number(cmd[7]);

    if (!info_dict[cmd_key]) {
      answer.push(0);
      continue;
    }

    const applier = info_dict[cmd_key];
    let start = 0;
    let end = applier.length;

    while (start < end) {
      let mid = parseInt((start + end) / 2);
      if (applier[mid] >= cmd_score) end = mid;
      else start = mid + 1;
    }

    answer.push(applier.length - end);
  }

  return answer;
}
