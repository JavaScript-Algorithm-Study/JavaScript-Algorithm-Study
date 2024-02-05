function solution(n, t, m, timetable) {
  const 시 = 60;
  const START = 9 * 시;
  const shuttles = Array.from(Array(n), (_, offset) => [
    START + t * offset,
    [],
  ]);

  const minutes = timetable.map((time) => {
    const [hour, min] = time.split(":").map(Number);
    return hour * 시 + min;
  });

  minutes.sort((a, b) => a - b);

  let crew = 0;
  const nCrew = minutes.length;
  shuttles.forEach(([shuttleMinute, members]) => {
    while (crew < nCrew && members.length < m) {
      const crewMinute = minutes[crew];
      if (crewMinute > shuttleMinute) {
        break;
      }

      members.push(crewMinute);
      crew += 1;
    }
  });

  const [shuttleMinute, members] = shuttles.pop();
  const con = members.length !== m ? shuttleMinute : members.at(-1) - 1;

  return [Math.floor(con / 시), con % 시]
    .map((num) => num.toString().padStart(2, "0"))
    .join(":");
}
