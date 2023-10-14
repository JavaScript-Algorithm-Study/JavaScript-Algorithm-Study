/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/42888
난이도 : Level 2

1. 문제 설명
채팅방에 누군가 나가고 들어올 때 메세지 출력
채팅방 닉넴 변경하는 방법 
1. 나간 뒤 새로운 닉넴으로 다시 들어옴
2. 채팅방에서 닉넴 변경, 기존 채팅방에 출력된 닉넴도 모두 변경

중복 닉넴 허용

모든 기록이 처리된 후 최종적으로 방을 개설한 사람이 보게되는 메시지 출력


2. 풀이
명령어는 Enter, Leave, Change 중 하나
user id로 사용자를 구분하기 때문에 user id로 저장해야 하지 않을까?
Map에
{
  uid1234: 'Muzi'
}
이런식으로 저장해서 차례로 아이디에 저장된 닉네임을 최신화 시키고,
[명령어, userId] 만 저장한 후 다시 처리하자.

*/
function solution(record) {
  const recordLength = record.length;
  let answer = [];
  let user = new Map();
  let tempList = [];

  for (let i = 0; i < recordLength; i++) {
    const [order, userId, nickName] = record[i].split(' ');
    switch (order) {
      case 'Enter':
        if (!user.has(userId)) user.set(userId, nickName);
        else user.set(userId, nickName);
        break;
      case 'Leave':
        break;
      case 'Change':
        user.set(userId, nickName);
        break;
    }
    tempList.push([order, userId]);
  }

  for (let j = 0; j < recordLength; j++) {
    const [order, userId] = tempList[j];
    switch (order) {
      case 'Enter':
        answer.push(`${user.get(userId)}님이 들어왔습니다.`);
        break;
      case 'Leave':
        answer.push(`${user.get(userId)}님이 나갔습니다.`);
        break;
      case 'Change':
        break;
    }
  }

  return answer;
}
