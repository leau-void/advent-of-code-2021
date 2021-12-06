const inputText = require("fs").readFileSync("input.txt").toString();

let input = inputText.split("\n").map((coord) =>
  coord
    .split(" ")
    .filter((entry) => entry != "->")
    .map((entry) => entry.split(",").map((num) => Number(num)))
);

const getLine = (coords) => {
  const output = [];

  if (coords[0][0] == coords[1][0]) {
    // vertical line

    const bigger = coords[0][1] >= coords[1][1] ? coords[0][1] : coords[1][1];
    const smaller = bigger == coords[0][1] ? coords[1][1] : coords[0][1];

    for (let i = smaller; i <= bigger; i++) {
      output.push(coords[0][0] + "," + i);
    }
  } else if (coords[0][1] == coords[1][1]) {
    // horizontal line

    const bigger = coords[0][0] >= coords[1][0] ? coords[0][0] : coords[1][0];
    const smaller = bigger == coords[0][0] ? coords[1][0] : coords[0][0];

    for (let i = smaller; i <= bigger; i++) {
      output.push(i + "," + coords[0][1]);
    }
  } else {
    // diagonals

    const end = coords[0][0] >= coords[1][0] ? coords[0] : coords[1];
    const start = end == coords[0] ? coords[1] : coords[0];
    const isN = end[0] - start[0] == end[1] - start[1];
    for (let i = 0; i <= end[0] - start[0]; i++) {
      output.push(start[0] + i + "," + (isN ? start[1] + i : start[1] - i));
    }
  }
  return output;
};

const getPoints = (input) =>
  input
    .map((coords) => getLine(coords))
    .reduce((acc, cur, i, arr) => [...acc, ...cur], [])
    .sort();

const getCrosses = (points) => {
  let counted = [];

  return points.reduce((acc, cur, i, arr) => {
    if (cur == arr[i - 1] && !counted.includes(cur)) {
      counted.push(cur);
      return acc + 1;
    }
    return acc;
  }, 0);
};

const result1 = getCrosses(
  getPoints(
    input.filter(
      (coords) => coords[0][0] == coords[1][0] || coords[0][1] == coords[1][1]
    )
  )
);

const result2 = getCrosses(getPoints(input));

console.log(result1, result2);
