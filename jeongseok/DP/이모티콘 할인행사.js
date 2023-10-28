// 목표 1. 플러스 가입자 최대 늘리기
// 목표 2. 이모티콘 판매액 최대 늘리기

// n명에게 m개의 이모티콘 할인
// 이모티콘마다 할인률 다를 수 있음 -> 10, 20, 30, 40중 하나

// 사용자는 일정 비율 이상 할인하는 이모티콘 전부 구매
// 구매 비용이 일정 가격이상이라면 구매 취소후 플러스 서비스 가입

// 할인률을 가장 높게 시작
// 30퍼 할인했을 떄 구입 금액은 40퍼 구입 금액 -
// 목표 1. 플러스 가입자 최대 늘리기
// 목표 2. 이모티콘 판매액 최대 늘리기

// n명에게 m개의 이모티콘 할인
// 이모티콘마다 할인률 다를 수 있음 -> 10, 20, 30, 40중 하나

// 사용자는 일정 비율 이상 할인하는 이모티콘 전부 구매
// 구매 비용이 일정 가격이상이라면 구매 취소후 플러스 서비스 가입

// 할인률을 가장 높게 시작
// 30퍼 할인했을 떄 구입 금액은 40퍼 구입 금액 -

let discountPercent = [10, 20, 30, 40];

function solution(users, emoticons) {
  let maxJoin = 0;
  let maxMoney = 0;

  let discountArr = new Array(emoticons.length).fill(0);
  let isVisited = new Array(emoticons.length).fill(0);

  backtracking(0, emoticons.length);

  function backtracking(cur, depth) {
    if (cur === depth) {
      let join = 0;
      let money = 0;
      let userTmpMoney = new Array(users.length).fill(0);

      for (let i = 0; i < users.length; i++) {
        userTmpMoney[i] = emoticons.reduce((prev, cur, index) => {
          if (users[i][0] <= discountArr[index]) {
            return prev + ((100 - discountArr[index]) / 100) * cur;
          } else {
            return prev;
          }
        }, 0);

        if (userTmpMoney[i] >= users[i][1]) {
          join += 1;
        } else {
          money += userTmpMoney[i];
        }
      }

      if (join > maxJoin) {
        maxJoin = join;
        maxMoney = money;
      } else if (join === maxJoin) {
        maxMoney = Math.max(maxMoney, money);
      }

      return;
    }

    for (let i = cur; i < emoticons.length; i++) {
      for (let j = 0; j < 4; j++) {
        if (isVisited[i] === 0) {
          console.log(isVisited);
          isVisited[i] = 1;
          discountArr[i] = discountPercent[j];
          backtracking(cur + 1, depth);
          isVisited[i] = 0;
        }
      }
    }
  }

  return [maxJoin, maxMoney];
}

solution(
  [
    [40, 2900],
    [23, 10000],
    [11, 5200],
    [5, 5900],
    [40, 3100],
    [27, 9200],
    [32, 6900],
  ],
  [1300, 1500, 1600, 4900]
);
