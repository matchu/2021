import {
  computeDepthSumWindows,
  countDepthIncreases,
  readDepthsFile,
} from "./day1";

describe(countDepthIncreases, () => {
  it("counts the small example", () => {
    const depths = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
    expect(countDepthIncreases(depths)).toEqual(7);
  });
});

describe(computeDepthSumWindows, () => {
  it("windows the small example", () => {
    const depths = [199, 200, 208, 210, 200, 207, 240, 269, 260, 263];
    expect(computeDepthSumWindows(depths)).toEqual([
      607, 618, 618, 617, 647, 716, 769, 792,
    ]);
  });
});

describe("day1.js", () => {
  it("solves puzzle 1", async () => {
    const depths = await readDepthsFile(
      new URL("../input/day1.txt", import.meta.url)
    );
    expect(countDepthIncreases(depths)).toMatchInlineSnapshot(`1696`);
  });

  it("solves puzzle 2", async () => {
    const depths = await readDepthsFile(
      new URL("../input/day1.txt", import.meta.url)
    );
    const windows = computeDepthSumWindows(depths);
    expect(countDepthIncreases(windows)).toMatchInlineSnapshot(`1737`);
  });
});
