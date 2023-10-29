// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/150368
// 시작날짜: 2023.10.28
// 시작시간: 21:20
// 종료시간: 10:28
// 소요시간: 01:08

// 1. 이모티콘 플러스 서비스 가입자를 최대한 늘린다.
// 2. 이모티콘 판매액을 최대한 늘린다.
// 1번 목표가 최우선, 2번은 그 다음.
// 즉, 최대한 많은 서비스 가입자를 늘리면서, 판매액도 최대로 늘린다.

// n명의 사용자에게 이모트콘 m개를 할인해 판매한다.
// 각각 이모티콘의 할인율은 10% 20% 30% 40%중 하나로 설정된다.

// 각사용자는 자신의 기준에 따라 일정 비율 이상 할인하는 이모티콘을 모두 구매한다.
// 각사용자는 자신의 기준에 따라 구매 합이 일정가격 이상이 되면, 구매x, 이모티콘 플러스 서비스 가입힌다.

// 1 <= users = m <= 100
// users[0]: 비율 users[1]: 가격
// 비율 이상의 할인을 하면 구매
// 가격 이상을 사용하면 서비스에 가입.
// 비율 1 ~ 40

// 1 <= emoticons 길이 = m <= 7

// 출력: [서비스 가입자수, 구매액]

// 이모티콘 할인율은 10, 20, 30, 40 고정

// 할인 중복순열을 구함 10,10,10,10 ~ 40,40,40,40
// 중복순열의 시간복잡도 -> 4^7 = 16,384
// 구매하고서 유저의 조건에 따라 결과를 구함 -> 16,384 * 100 = 1,638,400
// 그러고서 1. 가입자수, 2.구매액 에 따라 정렬함 -> 10,181,705
// 시간복잡도 아슬아슬하게 될듯

function solution(users, emoticons) {
  const nums = [10, 20, 30, 40];
  const discountRatesPermu = [];
  const result = [];

  const getDuplePermu = (arr) => {
    if (arr.length === emoticons.length) {
      discountRatesPermu.push(arr);
      return;
    }
    for (let i = 0; i < 4; i++) {
      getDuplePermu([...arr, nums[i]]);
    }
  };
  getDuplePermu([]);

  discountRatesPermu.forEach((discountRates) => {
    // 현재 1개의 할인율 조합에 대한 구매액과 가입자
    let 가입자 = 0;
    let 판매액 = 0;

    // 현재 할인율을 적용했을 때 판매액과 가입자를 구함.
    users.forEach(([원하는_비율, 최소_가격]) => {
      let 구매액 = 0;

      discountRates.forEach((할인율, idx) => {
        if (할인율 >= 원하는_비율) {
          구매액 += (emoticons[idx] * (100 - 할인율)) / 100;
        }
      });

      if (구매액 >= 최소_가격) {
        가입자 += 1;
      } else {
        판매액 += 구매액;
      }
    });

    result.push([가입자, 판매액]);
  });

  result.sort((a, b) => b[0] - a[0] || b[1] - a[1]);
  return result[0];
}
