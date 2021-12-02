import {
  followSubmarinePathV1,
  followSubmarinePathV2,
  readSubmarinePathFile,
} from "./day2";

describe(followSubmarinePathV1, () => {
  it("solves simple example", () => {
    const path = [
      { direction: "forward", amount: 5 },
      { direction: "down", amount: 5 },
      { direction: "forward", amount: 8 },
      { direction: "up", amount: 3 },
      { direction: "down", amount: 8 },
      { direction: "forward", amount: 2 },
    ];
    expect(followSubmarinePathV1(path)).toEqual({
      horizontalPosition: 15,
      depth: 10,
    });
  });
});

describe(followSubmarinePathV2, () => {
  it("solves simple example", () => {
    const path = [
      { direction: "forward", amount: 5 },
      { direction: "down", amount: 5 },
      { direction: "forward", amount: 8 },
      { direction: "up", amount: 3 },
      { direction: "down", amount: 8 },
      { direction: "forward", amount: 2 },
    ];
    expect(followSubmarinePathV2(path)).toEqual({
      horizontalPosition: 15,
      depth: 60,
    });
  });
});

describe("day2.js", () => {
  it("solves puzzle 1", async () => {
    const path = await readSubmarinePathFile(
      new URL("../input/day2.txt", import.meta.url)
    );
    const { horizontalPosition, depth } = followSubmarinePathV1(path);
    expect(horizontalPosition * depth).toMatchInlineSnapshot(`2073315`);
  });

  it("solves puzzle 2", async () => {
    const path = await readSubmarinePathFile(
      new URL("../input/day2.txt", import.meta.url)
    );
    const { horizontalPosition, depth } = followSubmarinePathV2(path);
    expect(horizontalPosition * depth).toMatchInlineSnapshot(`1840311528`);
  });
});
