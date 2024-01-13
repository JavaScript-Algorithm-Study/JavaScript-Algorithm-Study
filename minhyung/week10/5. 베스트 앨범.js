// 문제링크: https://school.programmers.co.kr/learn/courses/30/lessons/42579
// 시작날짜: 2024.01.13
// 시작시간: 19:56
// 종료시간: 20:31
// 소요시간: 00:35

// 1. genres, plays를 동시에 순회하면서 hash에 저장함
//    저장할 때 장르별 재생수와 장르별 곡들을 저장함
// 2. hash를 재생수가 높은 순으로 정렬함
// 3. 재생수가 높은 순으로 장르별 곡들을 정렬함
// 4. 장르별 곡들을 2개씩 뽑아서 결과에 넣어줌

function solution(genres, plays) {
  const hash = {};
  for (let i = 0; i < genres.length; i++) {
    const [name, time] = [genres[i], plays[i]];
    hash[name] = {
      time: (hash[name]?.time ?? 0) + time,
      list: [...(hash[name]?.list ?? []), { name, time, idx: i }],
    };
  }

  return Object.entries(hash)
    .sort((a, b) => b[1].time - a[1].time)
    .flatMap(([_, genre]) =>
      genre.list
        .sort((a, b) => b.time - a.time || a.idx - b.idx)
        .map((list) => list.idx)
        .slice(0, 2)
    );
}
