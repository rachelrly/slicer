const { getUnitFromMl } = require("../dist/utils/format");
const {
  Pint,
  Quart,
  Cup,
  Tablespoon,
  Teaspoon,
  Gallon,
  Gram,
  Ounce,
} = require("../dist/types/units");

describe.skip("Given an amount in ml, it returns the correct unit", () => {
  test("Given a number, it returns the next closest unit", () => {
    expect(getUnitFromMl(10).name.short).toBe(Tablespoon.name.short);
  });

  test("Without `includeNonStandardUnits` flag, it returns the next standard unit", () => {
    expect(getUnitFromMl(50).name.short).toBe(Cup.name.short);
    expect(getUnitFromMl(1).name.short).toBe(Teaspoon.name.short);
    expect(getUnitFromMl(500).name.short).toBe(Gallon.name.short);
  });

  test("With `includeNonStandardUnits` flag, it returns the closest nonstandard unit", () => {
    expect(getUnitFromMl(50, true).name.short).toBe(Ounce.name.short);
    expect(getUnitFromMl(1, true).name.short).toBe(Gram.name.short);
    expect(getUnitFromMl(500, true).name.short).toBe(Pint.name.short);
  });

  test("Responds with error with amount that is too high", () => {
    expect(() => getUnitFromMl(9999999)).toThrow(
      "Cannot handle amounts over 20 gallons"
    );
  });

  test("Responds with error with negative input", () => {
    expect(() => getUnitFromMl(-1)).toThrow(
      "Cannot have a negative amount of an ingredient"
    );
  });
});
