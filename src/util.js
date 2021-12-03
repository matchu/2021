import fs from "node:fs/promises";

export async function readLinesFromFile(path) {
  const content = await fs.readFile(path, "utf8");
  return content.split("\n");
}
