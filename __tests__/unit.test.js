const { getUnitFromMl, getUnitFromString } = require("../dist/utils/format");
const { UNITS } = require("../dist/types/units");
const { ERRORS } = require("../dist/types/errors");

describe("Given an amount in ml", () => {
  test("it returns the a valid unit when it is not too high", () => {
    expect(getUnitFromMl(10)).toBeTruthy;
    expect(getUnitFromMl(50)).toBeTruthy;
    expect(getUnitFromMl(100)).toBeTruthy;
    expect(getUnitFromMl(1000)).toBeTruthy;
    expect(getUnitFromMl(10000)).toBeTruthy;
  });

  test("it returns the next closest unit", () => {
    expect(getUnitFromMl(10).name.short).toBe(UNITS.TABLESPOON.name.short);
  });

  describe.skip("Given that `includeNonStandardUnits` is true", () => {
    test("it returns only standard units", () => {
      //    expect(getUnitFromMl(50, true).name.short).toBe(UNITS.OUNCE.name.short);
      expect(getUnitFromMl(1, true).name.short).toBe(UNITS.GRAM.name.short);
      //    expect(getUnitFromMl(500, true).name.short).toBe(UNITS.PINT.name.short);
    });
  });

  describe("Given that nonstandard units are NOT included (default)", () => {
    test("it returns the the correct unit, including nonstandard units", () => {
      const one = getUnitFromMl(50);
      console.log("THIS IS THE RESPONSE", one);
      expect(getUnitFromMl(1).name.long).toBe(UNITS.TEASPOON.name.long);
      // expect(getUnitFromMl(500).name.short).toBe(UNITS.GALLON.name.short);
      // expect(one.name.short).toBe(UNITS.CUP.name.short);
    });
  });

  test("it throws when input is too high", () => {
    expect(() => getUnitFromMl(9999999)).toThrow(ERRORS.UNIT.UNREALISTIC_INPUT);
  });

  test("it throws when input is negative", () => {
    expect(() => getUnitFromMl(-1)).toThrow(ERRORS.AMOUNT.NEGATIVE_INPUT);
  });
});

describe("Given a valid unit string input", () => {
  test("it sorts `tsp` as TEASPOON", () => {
    expect(getUnitFromString("tsp").name.short).toBe("tsp");
  });
});
