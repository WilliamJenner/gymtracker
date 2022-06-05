import { plateRound } from "./number";

describe("plateRound", () => {
  it("returns 40 without rounding down", () => {
    const wholeNumber = 40; // number that can be achieved with standard gym plates

    let rounded = plateRound(wholeNumber);

    expect(rounded).toEqual(wholeNumber);
  });

  it("returns 42.5 without rounding down", () => {
    const wholeNumber = 42.5; // number that can be achieved with standard gym plates

    let rounded = plateRound(wholeNumber);

    expect(rounded).toEqual(wholeNumber);
  });

  it("rounds 41.25 to 40", () => {
    const weight = 41.25; // number that can NOT be achieved with standard gym plates
    const expected = 40;

    let rounded = plateRound(weight);

    expect(rounded).toEqual(expected);
  });
});
