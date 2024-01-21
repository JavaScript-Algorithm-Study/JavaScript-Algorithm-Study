function solution(genres, plays) {
  const gMap = new Map(); // 장르 Map
  const pMap = new Map(); // 전체 Map

  for (let i = 0; i < genres.length; i++) {
    const genre = genres[i];
    const playTime = plays[i];

    // 장르에 노래 갯수 추가
    gMap.set(genre, gMap.get(genre) + playTime || playTime);

    if (!pMap.get(genre)) {
      pMap.set(genre, [{ playTime, index: i }]);
    } else {
      pMap.get(genre).push({ playTime, index: i });
    }
  }

  let answer = [];

  const gArray = Array.from(gMap).sort((a, b) => b[1] - a[1]);

  for (let i = 0; i < gArray.length; i++) {
    const genreMusic = pMap.get(gArray[i][0]).sort((a, b) => {
      if (a.playTime !== b.playTime) {
        return b.playTime - a.playTime;
      }

      return a.index - b.index;
    });

    answer.push(genreMusic[0].index);
    genreMusic[1] && answer.push(genreMusic[1].index);
  }

  return answer;
}
