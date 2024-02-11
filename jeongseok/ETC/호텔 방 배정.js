function solution(k, room_number) {
  const hotel = new Map();

  room_number.forEach((room) => {
    let cur = room;
    let visitedArr = [];

    while (1) {
      visitedArr.push(cur);

      if (!hotel.has(cur)) {
        hotel.set(cur, cur + 1);

        visitedArr.forEach((ele) => {
          hotel.set(ele, cur + 1);
        });
        break;
      }
      cur = hotel.get(cur);
    }
  });

  return Array.from(hotel.keys());
}
