function solution(k, room_number) {
  const rooms = new Map();

  const findRoom = (num) => {
    if (!rooms.has(num)) {
      rooms.set(num, num + 1);
      return num;
    }
    const nearRoom = findRoom(rooms.get(num));
    rooms.set(num, nearRoom + 1);
    return nearRoom;
  };

  return room_number.map(findRoom);
}
