const { getUnitFromMl } = require("../dist/utils/format");
const { UNITS } = require("../dist/types/units");
const { ERRORS } = require("../dist/types/errors");

describe("Given an amount in ml, it returns the correct unit", () => {
  test("Given a number, it returns the next closest unit", () => {
    expect(getUnitFromMl(10).name.short).toBe(UNITS.TABLESPOON.name.short);
  });

  test("Without `includeNonStandardUnits` flag, it returns the next standard unit", () => {
    expect(getUnitFromMl(50).name.short).toBe(UNITS.CUP.name.short);
    expect(getUnitFromMl(1).name.short).toBe(UNITS.TEASPOON.name.short);
    expect(getUnitFromMl(500).name.short).toBe(UNITS.GALLON.name.short);
  });

  test("With `includeNonStandardUnits` flag, it returns the closest nonstandard unit", () => {
    expect(getUnitFromMl(50, true).name.short).toBe(UNITS.OUNCE.name.short);
    expect(getUnitFromMl(1, true).name.short).toBe(UNITS.GRAM.name.short);
    expect(getUnitFromMl(500, true).name.short).toBe(UNITS.PINT.name.short);
  });

  test("Responds with error with amount that is too high", () => {
    expect(() => getUnitFromMl(9999999)).toThrow(ERRORS.UNIT.UNREALISTIC_INPUT);
  });

  test("Responds with error with negative input", () => {
    expect(() => getUnitFromMl(-1)).toThrow(ERRORS.AMOUNT.NEGATIVE_INPUT);
  });
});
