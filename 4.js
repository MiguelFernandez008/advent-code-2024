/*
--- Day 4: Ceres Search ---

"Looks like the Chief's not here. Next!" One of The Historians pulls out a device and pushes the only button on it. After a brief flash, you recognize the interior of the Ceres monitoring station!

As the search for the Chief continues, a small Elf who lives on the station tugs on your shirt; she'd like to know if you could help her with her word search (your puzzle input). She only has to find one word: XMAS.

This word search allows words to be horizontal, vertical, diagonal, written backwards, or even overlapping other words. It's a little unusual, though, as you don't merely need to find one instance of XMAS - you need to find all of them. Here are a few ways XMAS might appear, where irrelevant characters have been replaced with .:

..X...
.SAMX.
.A..A.
XMAS.S
.X....

The actual word search will be full of letters instead. For example:

MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX

In this word search, XMAS occurs a total of 18 times; here's the same word search again, but where letters not involved in any XMAS have been replaced with .:

....XXMAS.
.SAMXMS...
...S..A...
..A.A.MS.X
XMASAMX.MM
X.....XA.A
S.S.S.S.SS
.A.A.A.A.A
..M.M.M.MM
.X.X.XMASX

Take a look at the little Elf's word search. How many times does XMAS appear?

--- Part Two ---

The Elf looks quizzically at you. Did you misunderstand the assignment?

Looking for the instructions, you flip over the word search to find that this isn't actually an XMAS puzzle; it's an X-MAS puzzle in which you're supposed to find two MAS in the shape of an X. One way to achieve that is like this:

M.S
.A.
M.S

Irrelevant characters have again been replaced with . in the above diagram. Within the X, each MAS can be written forwards or backwards.

Here's the same example from before, but this time all of the X-MASes have been kept instead:

.M.S......
..A..MSMS.
.M.S.MAA..
..A.ASMSM.
.M.S.M....
..........
S.S.S.S.S.
.A.A.A.A..
M.M.M.M.M.
..........

In this example, an X-MAS appears 9 times.

Flip the word search from the instructions back over to the word search side and try again. How many times does an X-MAS appear?
*/
var fs = require("fs");
const data = fs.readFileSync("./data/4.txt", "utf-8");

const partOne = () => {
  //console.time('console.log performance test')
  let total = 0;
  let totalLines = 0;
  let lineLength = 0;
  const lines = [];
  data.split(/\r?\n/).forEach((line) => {
    if (line.trim() !== "") {
      const lineWithPadding = line + "Z";
      lineLength = lineWithPadding.length;
      totalLines += 1;
      lines.push(lineWithPadding);
    }
  });
  const verticalDistance = lineLength - 1;
  const diagonalRightDistance = lineLength - 2;
  const diagonalLeftDistance = lineLength;
  const flattedLine = lines.join().replace(/\,/g, "");
  const verticalRegexp = new RegExp(
    `(?=[X][A-Z]{${verticalDistance}}[M][A-Z]{${verticalDistance}}[A][A-Z]{${verticalDistance}}[S])`,
    "g"
  );
  const verticalBackwardsRegexp = new RegExp(
    `(?=[S][A-Z]{${verticalDistance}}[A][A-Z]{${verticalDistance}}[M][A-Z]{${verticalDistance}}[X])`,
    "g"
  );
  const diagonalLeftTopRegexp = new RegExp(
    `(?=[S][A-Z]{${diagonalLeftDistance}}[A][A-Z]{${diagonalLeftDistance}}[M][A-Z]{${diagonalLeftDistance}}[X])`,
    "g"
  );
  const diagonalLeftBottomRegexp = new RegExp(
    `(?=[X][A-Z]{${diagonalRightDistance}}[M][A-Z]{${diagonalRightDistance}}[A][A-Z]{${diagonalRightDistance}}[S])`,
    "g"
  );
  const diagonalRightTopRegexp = new RegExp(
    `(?=[S][A-Z]{${diagonalRightDistance}}[A][A-Z]{${diagonalRightDistance}}[M][A-Z]{${diagonalRightDistance}}[X])`,
    "g"
  );
  const diagonalRightBottomRegexp = new RegExp(
    `(?=[X][A-Z]{${diagonalLeftDistance}}[M][A-Z]{${diagonalLeftDistance}}[A][A-Z]{${diagonalLeftDistance}}[S])`,
    "g"
  );
  const horizontal = [...flattedLine.matchAll(/(?=XMAS)/g)];
  const horizontalBackwards = [...flattedLine.matchAll(/(?=SAMX)/g)];
  const vertical = [...flattedLine.matchAll(verticalRegexp)];
  const verticalBackwards = [...flattedLine.matchAll(verticalBackwardsRegexp)];
  const diagonalLeftBottom = [
    ...flattedLine.matchAll(diagonalLeftBottomRegexp),
  ];
  const diagonalRightTop = [...flattedLine.matchAll(diagonalRightTopRegexp)];
  const diagonalRightBottom = [
    ...flattedLine.matchAll(diagonalRightBottomRegexp),
  ];
  const diagonalLefttop = [...flattedLine.matchAll(diagonalLeftTopRegexp)];
  total =
    horizontal.length +
    horizontalBackwards.length +
    vertical.length +
    verticalBackwards.length +
    diagonalLeftBottom.length +
    diagonalRightTop.length +
    diagonalRightBottom.length +
    diagonalLefttop.length;
  console.table([
    {
      lineLength: lineLength,
      totalLines: totalLines,
      horizontal: horizontal.length,
      horizontalBackwards: horizontalBackwards.length,
      vertical: vertical.length,
      verticalBackwards: verticalBackwards.length,
      diagonalLeftBottom: diagonalLeftBottom.length,
      diagonalRightTop: diagonalRightTop.length,
      diagonalRightBottom: diagonalRightBottom.length,
      diagonalLefttop: diagonalLefttop.length,
      total: total,
    },
  ]);
  //console.timeEnd('console.log performance test')
};

const partTwo = () => {
  let total = 0;
  let totalLines = 0;
  let lineLength = 0;
  const lines = [];
  data.split(/\r?\n/).forEach((line) => {
    if (line.trim() !== "") {
      const lineWithPadding = line + "Z";
      lineLength = lineWithPadding.length;
      totalLines += 1;
      lines.push(lineWithPadding);
    }
  });
  const spacing = lineLength - 2;
  const flattedLine = lines.join().replace(/\,/g, "");
  const horizontalRegex = new RegExp(
    `(?=M[A-Z]{1}S[A-Z]{${spacing}}A[A-Z]{${spacing}}M[A-Z]{1}S)|(?=M[A-Z]{1}M[A-Z]{${spacing}}A[A-Z]{${spacing}}S[A-Z]{1}S)|(?=S[A-Z]{1}S[A-Z]{${spacing}}A[A-Z]{${spacing}}M[A-Z]{1}M)|(?=S[A-Z]{1}M[A-Z]{${spacing}}A[A-Z]{${spacing}}S[A-Z]{1}M)`,
    "g"
  );
  const horizontal = [...flattedLine.matchAll(horizontalRegex)];
  total = horizontal.length;
  console.table([
    {
      total: total,
    },
  ]);
};

partOne();
partTwo();
fs.close(2);
