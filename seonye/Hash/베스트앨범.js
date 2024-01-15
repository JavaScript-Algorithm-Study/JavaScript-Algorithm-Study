/*
문제 : https://school.programmers.co.kr/learn/courses/30/lessons/42579
난이도 : Level 3

가장 많이 재생된 노래 두 개씩 모아 베스트 앨범 출시

노래는 고유 번호로 구분, 노래 수록 기준
1. 속한 노래가 많이 재생된 장르 먼저 수록
2. 장르 내에 많이 재생된 노래 먼저 수록
3. 장르 내에 재생횟수가 같은 노래 중 고유번호가 낮은 노래 먼저 수록
*/
function solution(genres, plays) {
  var answer = [];
  const songMap = new Map();

  for (let i = 0; i < genres.length; i++) {
    const [genre, playCnt] = [genres[i], plays[i]];

    if (!songMap.has(genre)) songMap.set(genre, [[playCnt, i]]);
    else {
      songMap.get(genre).push([playCnt, i]);
    }
  }

  Array.from(songMap.entries())
    .sort((a, b) => b[1].reduce((prev, cur) => prev + cur[0], 0) - a[1].reduce((prev, cur) => prev + cur[0], 0))
    .forEach((val) => {
      const [genre, songs] = val;
      songs
        .sort((a, b) => b[0] - a[0] || a[1] - b[1])
        .slice(0, 2)
        .forEach((song) => answer.push(song[1]));
    });

  return answer;
}
