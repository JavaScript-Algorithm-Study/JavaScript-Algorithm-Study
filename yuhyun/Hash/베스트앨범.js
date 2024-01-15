function solution(genres, plays) {
  const genreMap = createGenreMaxIndicesMap(genres, plays);
  const genrePlaysMap = createGenrePlaysMap(genres, plays);

  const descendingGenrePlays = (genreA, genreB) =>
    genrePlaysMap.get(genreB) - genrePlaysMap.get(genreA);

  return [...genreMap]
    .sort(([genreA], [genreB]) => descendingGenrePlays(genreA, genreB))
    .flatMap(([_, maxIndices]) => maxIndices);
}

function createGenreMaxIndicesMap(genres, plays) {
  const MAX_SONG = 2;

  const descendingPlays = (indexA, indexB) =>
    plays[indexB] - plays[indexA] || indexA - indexB;

  const result = new Map();

  genres.forEach((genre, index) => {
    const maxIndices = result.get(genre) ?? [];
    maxIndices.push(index);
    maxIndices.sort(descendingPlays);

    result.set(genre, maxIndices.slice(0, MAX_SONG));
  });

  return result;
}

function createGenrePlaysMap(genres, plays) {
  const result = new Map();
  genres.forEach((genre, index) => {
    const nPlay = result.get(genre) ?? 0;
    result.set(genre, nPlay + plays[index]);
  });
  return result;
}
