/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/92341
난이도 : Level 2

1. 문제 설명
차량별 주차 요금 계산
요금표
기본 시간 180분, 기본 요금 5000원, 단위 시간 10분, 단위 요금 600원
출차된 기록이 없으면 23:59에 출차된 것으로 간주

기본시간 이하, 기본 요금 청구 
기본 시간 초과 = 5000 + [(주차시간-180)/10] * 600 원
단위 시간으로 나누어 떨어지지 않는 경우 올림 한다.

차량번호가 작은 자동차부터 청구할 주차 요금을 차례대로 정수 배열에 담아서 return


2. 풀이
IN일 경우 입차 시간을 Map에 key: 차량 번호, value: 입차시간으로 기록
OUT일 경우 Map에서 입차 시간을 가져와서 주차 시간을 carsTimeSumObj에 기록하고, Map에서 해당 차량을 삭제

마지막에 Map에 남은 차량은 출차시간이 주어지지 않은 경우이므로, 출차 시간을 23:59로 해서 주차시간을 더해준다.

key: 차량번호, value: 주차시간인 객체를 배열로 변환하고 차량번호를 기준으로 정렬후 주차요금을 계산하여 정답 배열에 넣어준다.
*/

function calculateTime(inTime, outTime) {
  const [inHour, inMin] = inTime.split(':').map(Number);
  const [outHour, outMin] = outTime.split(':').map(Number);

  if (outMin < inMin) return (outHour - inHour - 1) * 60 + (outMin + 60) - inMin;
  else return (outHour - inHour) * 60 + outMin - inMin;
}

function calculateFee(timeSum, fees) {
  const [basicTime, basicFee, unitTime, unitFee] = fees;
  if (timeSum <= basicTime) return basicFee;
  else {
    return basicFee + Math.ceil((timeSum - basicTime) / unitTime) * unitFee;
  }
}

function solution(fees, records) {
  let answer = [];

  const carsTimeSumObj = {};
  const carsTimeMap = new Map();
  let carsRecords = records.map((record) => {
    const [time, carNumber, type] = record.split(' ');
    return [carNumber, time, type];
  });

  function setTimeSum(carNumber, outTime) {
    const inTime = carsTimeMap.get(carNumber);

    if (!carsTimeSumObj[carNumber]) carsTimeSumObj[carNumber] = calculateTime(inTime, outTime);
    else carsTimeSumObj[carNumber] += calculateTime(inTime, outTime);
    carsTimeMap.delete(carNumber);
  }

  for (let i = 0; i < carsRecords.length; i++) {
    const [carsNumber, time, type] = carsRecords[i];
    if (type === 'IN') {
      carsTimeMap.set(carsNumber, time);
    } else if (type === 'OUT') {
      setTimeSum(carsNumber, time);
    }
  }
  if (carsTimeMap.size > 0) {
    Array.from(carsTimeMap.keys()).forEach((key) => {
      setTimeSum(key, '23:59');
    });
  }

  const carsTimeSumArr = Object.entries(carsTimeSumObj).sort((a, b) => a[0] - b[0]);

  for (let j = 0; j < carsTimeSumArr.length; j++) {
    answer.push(calculateFee(carsTimeSumArr[j][1], fees));
  }
  return answer;
}
