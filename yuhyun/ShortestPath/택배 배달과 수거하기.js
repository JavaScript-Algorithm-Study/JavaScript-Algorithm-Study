function solution(cap, n, deliveries, pickups) {
  const deliveryAll = (deliveries) => {
    let last = n - 1;
    const distance = [];

    while (true) {
      const [start, end, nDeliveried] = delivery(last, cap, deliveries);
      if (nDeliveried === 0) {
        break;
      }

      distance.push(start + 1);
      last = end;
    }

    return distance;
  };

  const delivery = (last, cap, deliveries) => {
    let start = 0;
    let end = last;
    let nBox = 0;
    for (; end >= 0; end -= 1) {
      const curDelivery = deliveries[end];
      if (curDelivery === 0) {
        continue;
      }

      const nDeliveried = Math.min(cap - nBox, curDelivery);
      if (start === 0) {
        start = end;
      }

      deliveries[end] -= nDeliveried;
      nBox += nDeliveried;

      if (nBox === cap) {
        break;
      }
    }
    return [start, end, nBox];
  };

  const deliveryDistance = deliveryAll(deliveries);
  const pickupDistance = deliveryAll(pickups);

  let result = 0;
  const maxLength = Math.max(deliveryDistance.length, pickupDistance.length);
  for (let i = 0; i < maxLength; i += 1) {
    result += Math.max(deliveryDistance[i] || 0, pickupDistance[i] || 0) * 2;
  }
  return result;
}
