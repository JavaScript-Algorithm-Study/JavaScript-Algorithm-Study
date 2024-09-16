function solution(gems) {
  const total = new Set(gems).size;
  const gemsLength = gems.length;
  const cart = getCart();

  const minRange = [0, gems.length - 1];

  let end = 0;
  for (let start = 0; start < gemsLength; start += 1) {
    while (cart.size() !== total && end < gemsLength) {
      cart.add(gems[end]);
      end += 1;
    }

    if (cart.size() === total && end - start < minRange[1] - minRange[0] + 1) {
      minRange[0] = start;
      minRange[1] = end - 1;
    }

    cart.remove(gems[start]);
  }

  return minRange.map((num) => num + 1);
}

function getCart() {
  const cart = new Map();

  const add = (gem) => {
    const prev = cart.get(gem) ?? 0;
    cart.set(gem, prev + 1);
  };

  const remove = (gem) => {
    if (!cart.has(gem)) {
      return;
    }

    const prev = cart.get(gem);
    if (prev === 1) {
      cart.delete(gem);
      return;
    }
    cart.set(gem, prev - 1);
  };

  const size = () => {
    return cart.size;
  };

  return { add, remove, size };
}
