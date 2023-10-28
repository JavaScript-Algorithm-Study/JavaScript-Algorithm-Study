// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/92341
// 시작날짜: 2023.10.14
// 시작시간: 11:31
// 종료시간: 12:30
// 소요시간: 01:01

// 입차, 출차 기록이 있을 때 차량별로 주차요금 계산하기.
// 누적시간 <= 기본시간 then 기본요금
// 누적시간 > 기본시간 then 기본요금 + 초과시간에 대해 단위시간마다 단위요금 청구
//   -> 나누어 떨어지지 않으면 올림

// 시*60 + 분

//fees[0]: 기본시간
//fees[1]: 기본요금
//fees[2]: 단위시간
//fees[3]: 단위요금

// action == IN 일경우 주차장에 입차 carID: time
// action == OUT 일경우 주차장에 출차
//   timeSpent에 CarID: time - parkingLot[carID]
//   delete parkingLot[CarID]

// 그러고서 parkingLot에 남은 차들을 23:59 출차로 처리

// 반례: 같은 차가 여러번 입차, 출차 할 때 처리를 해주지 않았음.

function solution(fees, records) {
  const [기본시간, 기본요금, 단위시간, 단위요금] = fees;
  const parkingLot = new Map();
  const timeSpents = new Map();
  const result = [];

  records.forEach((record) => {
    const [timeString, carID, action] = record.split(" ");
    const time = getTime(timeString);

    if (action === "IN") {
      parkingLot.set(carID, time);
    }
    if (action === "OUT") {
      const inTime = parkingLot.get(carID);
      const beforSpentTime = timeSpents.get(carID) || 0; // 여기랑
      timeSpents.set(carID, beforSpentTime + time - inTime); // 여기 처리 후 반례 처리완료
      parkingLot.delete(carID);
    }
  });

  parkingLot.forEach((inTime, carID) => {
    const outTime = 23 * 60 + 59;
    const beforSpentTime = timeSpents.get(carID) || 0;
    timeSpents.set(carID, beforSpentTime + outTime - inTime);
  });

  timeSpents.forEach((누적시간, carID) => {
    let fee = 기본요금;

    console.log(누적시간, carID);
    if (누적시간 > 기본시간) {
      const 초과시간 = 누적시간 - 기본시간;
      const 초과요금 = Math.ceil(초과시간 / 단위시간) * 단위요금;
      fee += 초과요금;
    }

    result.push([carID, fee]);
  });

  return result.sort((a, b) => a[0] - b[0]).map(([id, fee]) => fee);
}

function getTime(timeString) {
  const [h, m] = timeString.split(":").map(Number);
  return h * 60 + m;
}

const fees = [180, 5000, 10, 1000];
const records = ["05:59 0000 IN", "05:59 1111 IN"];
console.log(solution(fees, records));
