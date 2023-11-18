// 재활용 상자
// 가장 먼 곳에서부터 왔다 갔다 하자

function solution(cap, n, deliveries, pickups) {
  let count = 0;

  while (deliveries.length || pickups.length) {
    // 마지막 주소에 배달할 물건이 없다면
    while (deliveries[deliveries.length - 1] === 0) {
      deliveries.pop();
    }

    // 마지막 주소에 픽업할 물건이 없다면
    while (pickups[pickups.length - 1] === 0) {
      pickups.pop();
    }

    count += Math.max(deliveries.length, pickups.length) * 2;

    let maxD = cap;
    for (let i = deliveries.length - 1; i >= 0; i--) {
      if (maxD <= 0) {
        break;
      }

      // 배달해야하는 물건이 더 많으면
      if (deliveries[i] > maxD) {
        deliveries[i] -= maxD;
        break;
      } else {
        maxD -= deliveries[i];
        deliveries.pop();
      }
    }

    let maxP = cap;
    for (let i = pickups.length - 1; i >= 0; i--) {
      if (maxP <= 0) {
        break;
      }

      // 픽업해야하는 물건이 더 많으면
      if (pickups[i] > maxP) {
        pickups[i] -= maxP;
        break;
      } else {
        maxP -= pickups[i];
        pickups.pop();
      }
    }
  }

  return count;
}
