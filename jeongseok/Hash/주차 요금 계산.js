function calculateFee(fees, time) {
  let money = fees[1];
  time -= fees[0];

  while (time > 0) {
    time -= fees[2];
    money += fees[3];
  }

  return money;
}

function solution(fees, records) {
  const carMap = new Map();

  for (let i = 0; i < records.length; i++) {
    const [time, carNum, status] = records[i].split(" ");
    const [h, m] = time.split(":");
    const curTime = Number(h) * 60 + Number(m);

    if (status === "IN" && !carMap.get(carNum)) {
      carMap.set(carNum, { status: "IN", money: 0, time: 0, lastIn: curTime });
    }

    if (status === "IN" && carMap.get(carNum)) {
      const isExistCar = carMap.get(carNum);
      carMap.set(carNum, { status: "IN", money: 0, time: isExistCar.time, lastIn: curTime });
    }

    if (status === "OUT") {
      const car = carMap.get(carNum);
      let calTime = curTime - car.lastIn;
      carMap.set(carNum, { status: "OUT", money: 0, time: car.time + calTime, lastIn: 0 });
    }
  }

  const carMoney = [];

  for (let [key, value] of carMap) {
    let occurTime = value.time;

    if (value.status === "IN") {
      occurTime += 23 * 60 + 59 - value.lastIn;
    }

    let money = calculateFee(fees, occurTime);

    carMoney.push({ key, money });
  }
  carMoney.sort((a, b) => a.key - b.key);

  let answer = [];

  carMoney.forEach((ele) => answer.push(ele.money));

  return answer;
}
