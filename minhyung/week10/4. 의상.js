// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/42578
// 시작날짜: 2024.01.13
// 시작시간: 19:17
// 종료시간: 19:33
// 소요시간: 00:16

// 1. 각 의상의 종류별로 개수를 세어줌
// 2. 각 의상의 종류별 개수를 모두 곱해줌
// 3. 모든 의상을 안입는 경우를 제외하기 위해 1을 빼줌

// 모든 조합 수 = (각 의상의 종류별 개수 + 1)의 곱 - 1
// 만약 headgear의 개수가 3개라면 1개 입을때, 2개 입을때, 3개 입을때, 0개 입을때가 경우의 수가됨
// 이를 모두 곱해주면 모든 조합의 수가 나옴
// 하지만 모든 의상을 안입는 경우는 제외해야하므로 1을 빼줌

const counting = (acc, [_, type]) => acc.set(type, (acc.get(type) ?? 0) + 1);
const makeClothingTypeSumsMap = (clothes) => clothes.reduce(counting, new Map());
const multiplyCases = (acc, cur) => (acc *= cur + 1);

function solution(clothes = []) {
  return Array.from(makeClothingTypeSumsMap(clothes).values()).reduce(multiplyCases, 1) - 1;
}
