function solution(word, pages) {
  const map = {};

  pages.forEach((page, index) => {
    const pageItems = page.split("\n");
    let pageURL = findURL(pageItems);

    map[pageURL] = {
      URL: pageURL,
      externalLinkList: [],
      index,
      matchPoint: 0,
    };
  });

  pages.forEach((page, index) => {
    let baseScore = 0;
    let externalLinkScore = 0;
    const pageItems = page.split("\n");
    let pageURL = findURL(pageItems);

    const bodyIndex = pageItems.findIndex((el) => el.includes("<body>"));
    for (let i = bodyIndex; i < pageItems.length; i++) {
      let externalLink = pageItems[i].match(/a href="([^"]*)/i);
      if (externalLink) {
        externalLink = externalLink[0].split('a href="')[1];

        map[pageURL].externalLinkList.push(externalLink);

        externalLinkScore += 1;
      }
    }
    map[pageURL] = {
      ...map[pageURL],
      baseScore: checkBaseWord(page.toLowerCase(), word.toLowerCase()),
      externalLinkScore,
    };
  });
  console.log(map);

  for (const [key, value] of Object.entries(map)) {
    const linkPoint = value.baseScore / value.externalLinkList.length;

    for (const link of value.externalLinkList) {
      if (Object.keys(map).includes(link)) {
        const origin = map[link];
        const calculatedPoint = origin.matchPoint
          ? origin.matchPoint + linkPoint
          : origin.baseScore + linkPoint;
        map[link] = { ...origin, matchPoint: calculatedPoint };
      }
    }
  }
  const answer = [];

  for (const [key, value] of Object.entries(map)) {
    const { baseScore, index, matchPoint } = value;
    const finalPoint = matchPoint ? matchPoint : baseScore;
    answer.push([index, finalPoint]);
  }

  answer.sort((a, b) => (a[1] === b[1] ? a[0] - b[0] : b[1] - a[1]));

  return answer[0][0];
}

function findURL(page) {
  return /<meta property="og:url" content="(\S+)"/.exec(page)[1].trim();
}

function checkBaseWord(line, word) {
  let wordCount = line
    .toLowerCase()
    .split(/[\d|\W]/)
    .filter((ele) => ele === word.toLowerCase()).length;
  return wordCount;
}
