const inputText = require("fs").readFileSync("input.txt").toString();

const input = inputText.split(",").map((num) => Number(num));

const min = Math.min(...input);

const max = Math.max(...input);

const totals = [];

const totalsInc = [];

const getMovesInc = (distance) => {
  let count = 0;

  for (let i = 1; i < distance + 1; i++) {
    count += i;
  }

  return count;
};

for (let i = min; i < max; i++) {
  const moves = input.reduce((acc, cur) => acc + Math.abs(i - cur), 0);

  totals.push(moves);

  const movesInc = input.reduce(
    (acc, cur) => acc + getMovesInc(Math.abs(i - cur)),
    0
  );

  totalsInc.push(movesInc);
}

console.log(Math.min(...totals), Math.min(...totalsInc));
