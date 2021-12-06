const inputText = require("fs").readFileSync("input.txt").toString();

const result = inputText
  .split("\n")
  .map((num) => Number(num))
  .reduce(
    (acc, cur, i, arr) => {
      const { count, prev } = acc;
      const curWindow = cur + (arr[i + 1] || 0) + (arr[i + 2] || 0);
      console.log(curWindow);

      return {
        count: curWindow > (prev || curWindow) ? count + 1 : count,
        prev: curWindow,
      };
    },
    { count: 0, prev: null }
  ).count;

console.log(result);
