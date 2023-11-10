/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/150368
난이도 : Level2

1. 문제
목표는 1. 플러스 서비스 가입자 최대한 늘리기, 2. 임티 판매액 최대 늘리기

임티 할인 행사
n명의 카카오 사용자들에게 임티 m개를 할인하여 판매
임티 할인율은 다를 수 있고, 10, 20, 30, 40 중 하나

사용자는 다음 기준에 따라 일정 비율 이상 할인하는 임티 모두 구매
- 각 사용자들은 자신의 기준에 따라 일정 비율 이상 할인하는 임티 모두 구매
- 각 사용자들은 자신의 기준에 따라 임티 구매 비용의 합이 일정 가격 이상이 된다면 임티 구매를 모두 취소하고 임티 플러스 서비스에 가입

users = n명의 구매 기준을 담은 2차원 정수 배열
emotions = m개의 정가를 담은 1차원 정수 배열

행사 목적을 최대한으로 달성했을 때, 플러스 서비스 가입 수와 임티 매출액을 1차원 정수배열로 return

2. 풀이
dfs를 사용해서 중복순열로 가능한 할인율을 모두 구한 다음
완전 탐색으로 해를 구한다.
*/
const users = [
  [40, 2900],
  [23, 10000],
  [11, 5200],
  [5, 5900],
  [40, 3100],
  [27, 9200],
  [32, 6900],
];
const emotions = [1300, 1500, 1600, 4900];

function solution(users, emotions) {
  let answers = [];
  const sales = [10, 20, 30, 40];
  const emoticonLength = emotions.length;

  const cases = [];
  const arr = [];
  function saleDFS(depth = 0) {
    if (depth === emoticonLength) {
      cases.push([...arr]);
      return;
    }
    for (let i = 0; i < sales.length; i++) {
      arr[depth] = sales[i];
      saleDFS(depth + 1);
    }
  }
  saleDFS();

  let maxPlusUser = 0;
  let maxSaleAccount = 0;

  for (let i = 0; i < cases.length; i++) {
    const currSales = cases[i];
    let plusUser = 0;
    let saleAccount = 0;
    for (let j = 0; j < users.length; j++) {
      const [saleCut, totalAmount] = users[j];
      let userAmount = 0;
      for (let k = 0; k < emoticonLength; k++) {
        if (currSales[k] < saleCut) continue;
        userAmount += (1 - currSales[k] / 100) * emotions[k];
      }
      if (userAmount >= totalAmount) plusUser += 1;
      else saleAccount += userAmount;
    }
    if (maxPlusUser < plusUser) {
      maxPlusUser = plusUser;
      maxSaleAccount = saleAccount;
    } else if (maxPlusUser === plusUser) {
      maxSaleAccount = Math.max(maxSaleAccount, saleAccount);
    }
  }

  answers = [maxPlusUser, maxSaleAccount];

  return answers;
}

console.log(solution(users, emotions));
