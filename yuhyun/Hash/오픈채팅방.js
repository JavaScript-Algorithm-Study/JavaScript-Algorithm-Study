function solution(record) {
  const ENTER = "Enter";
  const LEAVE = "Leave";
  const CHANGE = "Change";

  const history = [];
  const usernameMap = new Map();

  const log = {
    Enter: (id) => `${usernameMap.get(id)}님이 들어왔습니다.`,
    Leave: (id) => `${usernameMap.get(id)}님이 나갔습니다.`,
  };

  record.forEach((recordString) => {
    const [type, id, username] = recordString.split(" ");

    switch (type) {
      case ENTER:
        usernameMap.set(id, username);
        history.push([id, type]);
        break;
      case LEAVE:
        history.push([id, type]);
        break;
      case CHANGE:
        usernameMap.set(id, username);
        break;
    }
  });

  return history.map(([id, type]) => log[type](id));
}
