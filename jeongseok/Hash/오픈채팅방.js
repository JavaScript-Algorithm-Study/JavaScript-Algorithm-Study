function solution(record) {
  const commandList = [];
  const userMap = new Map();

  for (let i = 0; i < record.length; i++) {
    const [command, uid, name] = record[i].split(" ");

    if (command === "Enter") {
      userMap.set(uid, name);
    }

    if (command === "Change") {
      userMap.set(uid, name);
      continue;
    }

    commandList.push({ command, uid });
  }

  let answer = [];

  for (let i = 0; i < commandList.length; i++) {
    const { command, uid } = commandList[i];

    if (command === "Enter") {
      answer.push(`${userMap.get(uid)}님이 들어왔습니다.`);
    }

    if (command === "Leave") {
      answer.push(`${userMap.get(uid)}님이 나갔습니다.`);
    }
  }

  return answer;
}
