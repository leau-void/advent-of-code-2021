const inputText = require("fs").readFileSync("input.txt").toString();

let inputs = inputText.split("\n")[0].split(",");

let boards = inputText
  .split("\n")
  .slice(1)
  .reduce((acc, cur) => {
    if (cur === "") {
      acc.push([]);
      return acc;
    }

    acc[acc.length - 1].push(cur.split(" ").filter((l) => l != ""));
    return acc;
  }, []);

let curInput;
let last;

const findWinner = (board, picks) =>
  board.some((row) => row.every((cell) => picks.includes(cell))) ||
  board.some((row, i) => board.every((row) => picks.includes(row[i])));

inputs.forEach((input, i) => {
  if (!boards.length) return;
  if (boards.length == 1) {
    last = boards[0];
  }

  curInput = inputs.slice(0, i + i);
  boards = boards.filter((board) => !findWinner(board, curInput));
});

const result =
  last
    .reduce((acc, cur) => [...acc, ...cur], [])
    .filter((num) => !curInput.includes(num))
    .reduce((acc, cur) => acc + Number(cur), 0) * Number(curInput.slice(-1)[0]);

console.log(result);
