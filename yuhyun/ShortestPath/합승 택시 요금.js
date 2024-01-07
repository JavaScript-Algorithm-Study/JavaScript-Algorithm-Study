function solution(n, s, a, b, fares) {
  let min = Infinity;
  const shortestDistance = floydWarshall(n, fares);

  for (let via = 0; via < n; via++) {
    const fare =
      shortestDistance[s - 1][via] +
      shortestDistance[via][a - 1] +
      shortestDistance[via][b - 1];
    min = Math.min(min, fare);
  }

  return min;
}

function floydWarshall(n, fares) {
  const shortestDistance = Array.from(Array(n), () => Array(n).fill(Infinity));
  fares.forEach(([c, d, f]) => {
    shortestDistance[c - 1][d - 1] = shortestDistance[d - 1][c - 1] = f;
  });

  for (let i = 0; i < n; i++) {
    shortestDistance[i][i] = 0;
  }

  for (let via = 0; via < n; via++) {
    for (let start = 0; start < n; start++) {
      for (let end = 0; end < n; end++) {
        if (start === end) {
          continue;
        }

        const curDistance =
          shortestDistance[start][via] + shortestDistance[via][end];
        if (shortestDistance[start][end] <= curDistance) {
          continue;
        }

        shortestDistance[start][end] = curDistance;
      }
    }
  }

  return shortestDistance;
}
