function solution(users, emoticons) {
  const N_PLUS = 0;
  const SALES = 1;
  const DISCOUNT_RATE = [0.4, 0.3, 0.2, 0.1];

  let result = [0, 0];
  const emoticonsLength = emoticons.length;
  const discountLength = DISCOUNT_RATE.length;
  const totalDiscountCase = emoticonsLength ** discountLength;

  const calcDiscountedPrice = (price, discountRate) => {
    return price * (1 - discountRate);
  };

  for (let discountCase = 0; discountCase < totalDiscountCase; discountCase++) {
    const curResult = [0, 0];
    const discountCaseString = discountCase
      .toString(discountLength)
      .padStart(emoticonsLength, "0");

    const discountedEmoticons = emoticons.map((price, index) => {
      const discountRateIndex = parseInt(discountCaseString[index], 10);
      const discountRate = DISCOUNT_RATE[discountRateIndex];
      return [discountRate * 100, calcDiscountedPrice(price, discountRate)];
    });

    users.forEach(([minDiscountPercent, maxSales]) => {
      const userSales = discountedEmoticons.reduce(
        (acc, [discountPercent, discountedPrice]) => {
          return discountPercent >= minDiscountPercent
            ? acc + discountedPrice
            : acc;
        },
        0
      );

      if (userSales >= maxSales) {
        curResult[N_PLUS] += 1;
        return;
      }

      curResult[SALES] += userSales;
    });

    if (result[N_PLUS] > curResult[N_PLUS]) {
      continue;
    }

    if (result[N_PLUS] < curResult[N_PLUS]) {
      result = curResult;
      continue;
    }

    if (result[SALES] >= curResult[SALES]) {
      continue;
    }

    result = curResult;
  }

  return result;
}
