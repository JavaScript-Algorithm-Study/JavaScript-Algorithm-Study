// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/72412
// 시작날짜: 2023.11.02
// 시작시간: 15:49
// 종료시간: 16:43
// 소요시간: 01:06

// 50000 * 15 = 75만
// 그 후 dict에서 해당 값의 배열을 찾아서 이진탐색으로
// 해당 값 '이상'인 값을 찾음
// 그러면 lower bound를 적용하면될듯
// queries.forEach에서 해당 쿼리의 배열 길이가 0일 경우 예외처리 안해서 런타임 에러 떴음
// !searchTarget 으로 예외처리 해서 풀게됨

function solution(infos, queries) {
  const dict = new Map();
  const result = [];

  infos.forEach((info) => insert(dict, info));
  dict.forEach((valueArr) => valueArr.sort((a, b) => a - b));

  queries.forEach((query) => {
    const [lang, category, career, food, score] = query
      .replaceAll("and ", "")
      .split(" ");
    const key = `${lang}${category}${career}${food}`;
    const searchTarget = dict.get(key);

    if (!searchTarget) {
      result.push(0);
      return;
    }
    const pos = binarySearch(searchTarget, +score);
    result.push(searchTarget.length - pos);
  });

  return result;
}
function insert(dict, info) {
  const [lang, category, career, food, score] = info.split(" ");
  const arr = [lang, category, career, food];

  // 처음에 모든것에 대한 조합
  setDict(dict, arr, score);

  const combi = (now, arr) => {
    for (let i = now; i < 4; i++) {
      const before = [...arr];
      arr[i] = "-";
      // 해당 조합에 대해 추가로
      setDict(dict, arr, score);

      combi(i + 1, arr);
      arr = before;
    }
  };

  combi(0, arr);
}
function setDict(dict, arr, value) {
  const key = arr.reduce((sum, now) => sum + now, "");
  if (dict.has(key)) dict.get(key).push(+value);
  else dict.set(key, [+value]);
}
function binarySearch(arr, findNum) {
  let left = 0;
  let right = arr.length;

  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] < findNum) left = mid + 1;
    else right = mid;
  }
  return left;
}
