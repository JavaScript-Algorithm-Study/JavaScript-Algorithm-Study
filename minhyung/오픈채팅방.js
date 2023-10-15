// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/42888
// 시작날짜: 2023.10.14
// 시작시간: 11:10
// 종료시간: 11:30
// 소요시간: 00:20

// Enter uid nickname
// Leave uid
// Change uid nickname

// log = [action, uid] action: Enter or Leave

// record 돌면서
// 1. Enter일 경우 log에 기록, nicknames에 uid, nickname 기록
// 2. Leave일 경우 log에 기록, nicknames에 uid, nickname 기록
// 3. Change일 경우 nicknames에 uid, nickname 기록
// 4. log 돌면서 출력

function solution(records) {
  const actionWord = {
    Enter: "들어왔습니다.",
    Leave: "나갔습니다.",
  };
  const log = [];
  const db = {};

  records.forEach((record) => {
    const [action, uid, nickname] = record.split(" ");
    const canPushLogo = action === "Enter" || action === "Leave";
    const canChangeDB = action === "Enter" || action === "Change";

    if (canPushLogo) log.push({ action, uid });
    if (canChangeDB) db[uid] = nickname;
  });

  return log.map(({ action, uid }) => `${db[uid]}님이 ${actionWord[action]}`);
}
