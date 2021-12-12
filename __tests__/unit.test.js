const { getUnitFromMl } = require("../dist/utils/format");
const { UNITS } = require("../dist/types/units");
const { ERRORS } = require("../dist/types/errors");

describe("Given an amount in ml", () => {
  test("it returns the next closest unit", () => {
    expect(getUnitFromMl(10).name.short).toBe(UNITS.TABLESPOON.name.short);
  });

  describe("Given that `includeNonStandardUnits` is true", () => {
    test("it returns only standard units", () => {
      expect(getUnitFromMl(50).name.short).toBe(UNITS.CUP.name.short);
      expect(getUnitFromMl(1).name.short).toBe(UNITS.TEASPOON.name.short);
      expect(getUnitFromMl(500).name.short).toBe(UNITS.GALLON.name.short);
    });
  });

  describe("Given that `includeNonStandardUnits` is false", () => {
    test("it returns the the correct unit, including nonstandard units", () => {
      expect(getUnitFromMl(50, true).name.short).toBe(UNITS.OUNCE.name.short);
      expect(getUnitFromMl(1, true).name.short).toBe(UNITS.GRAM.name.short);
      expect(getUnitFromMl(500, true).name.short).toBe(UNITS.PINT.name.short);
    });
  });

  test("it throws when input is too high", () => {
    expect(() => getUnitFromMl(9999999)).toThrow(ERRORS.UNIT.UNREALISTIC_INPUT);
  });

  test("it throws when input is negative", () => {
    expect(() => getUnitFromMl(-1)).toThrow(ERRORS.AMOUNT.NEGATIVE_INPUT);
  });
});
