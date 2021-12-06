const inputText = require("fs").readFileSync("input.txt").toString();

const input = inputText.split(",").map((num) => Number(num));

const getFishGrowth = (startVal, days) => {
  let fishes = startVal.reduce((acc, cur) => {
    acc[cur] += 1;
    return acc;
  }, new Array(9).fill(0));

  for (let i = 0; i < days; i++) {
    let newFishes = 0;
    let oldFishes = 0;
    fishes = fishes.map((fish, i) => {
      if (i === 0) {
        newFishes = fish;
        oldFishes = fish;
      }
      if (i === 8) {
        return newFishes;
      }
      if (i === 6) {
        return fishes[i + 1] + oldFishes;
      }
      return fishes[i + 1];
    });
  }

  return fishes.reduce((acc, cur) => acc + cur, 0);
};

const result1 = getFishGrowth(input, 80);

const result2 = getFishGrowth(input, 256);

console.log(result1, result2);
