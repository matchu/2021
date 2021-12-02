import fs from "node:fs/promises";

export function followSubmarinePathV1(path) {
  let horizontalPosition = 0;
  let depth = 0;
  for (const { direction, amount } of path) {
    if (direction === "forward") {
      horizontalPosition += amount;
    } else if (direction === "down") {
      depth += amount;
    } else if (direction === "up") {
      depth -= amount;
    } else {
      throw new Error(`unexpected direction ${direction}`);
    }
  }
  return { horizontalPosition, depth };
}

export function followSubmarinePathV2(path) {
  let horizontalPosition = 0;
  let depth = 0;
  let aim = 0;
  for (const { direction, amount } of path) {
    if (direction === "forward") {
      horizontalPosition += amount;
      depth += aim * amount;
    } else if (direction === "down") {
      aim += amount;
    } else if (direction === "up") {
      aim -= amount;
    } else {
      throw new Error(`unexpected direction ${direction}`);
    }
  }
  return { horizontalPosition, depth };
}

function parseSubmarineLine(line) {
  const [direction, amountText] = line.split(" ");
  const amount = parseInt(amountText);
  return { direction, amount };
}

export async function readSubmarinePathFile(filePath) {
  const content = await fs.readFile(filePath, "utf8");
  const lines = content.split("\n");
  const submarinePath = lines.map((line) => parseSubmarineLine(line));
  return submarinePath;
}
