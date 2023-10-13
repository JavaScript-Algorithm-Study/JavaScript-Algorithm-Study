function solution(fees, records) {
  const IN = "IN";
  const OUT = "OUT";
  const MAX_TIME_STRING = "23:59";

  const [baseMinute, baseFee, unitMinute, unitFee] = fees;

  const timeMap = new Map();
  const parkingMap = new Map();

  const toMinute = (stringTime) => {
    const MIN_TO_HOUR = 60;
    const [hour, minute] = stringTime
      .split(":")
      .map((string) => parseInt(string, 10));
    return hour * MIN_TO_HOUR + minute;
  };

  const calcFee = (minute) => {
    const overMinute = Math.max(0, minute - baseMinute);
    return baseFee + Math.ceil(overMinute / unitMinute) * unitFee;
  };

  records.forEach((record) => {
    const [stringTime, car, type] = record.split(" ");
    const minute = toMinute(stringTime);

    if (type === IN) {
      parkingMap.set(car, minute);
      return;
    }

    const inMinute = parkingMap.get(car);

    const accTime = timeMap.get(car) ?? 0;
    timeMap.set(car, accTime + minute - inMinute);
    parkingMap.delete(car);
  });

  const maxMinute = toMinute(MAX_TIME_STRING);
  for (const [car, inMinute] of parkingMap) {
    const accTime = timeMap.get(car) ?? 0;
    timeMap.set(car, accTime + maxMinute - inMinute);
    parkingMap.delete(car);
  }

  const timeList = [...timeMap];
  timeList.sort(([carA], [carB]) => (carA < carB ? -1 : 1));
  return timeList.map(([_, accTime]) => calcFee(accTime));
}
