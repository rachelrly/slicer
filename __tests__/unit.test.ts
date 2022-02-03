import { getUnitFromMl, getUnitFromString } from '../src/utils/format'
import { UNITS } from '../src/types/units'
import { ERRORS } from '../src/types/errors'

describe('Given an amount in ml', () => {
  test('it returns the a valid unit when it is not too high', () => {
    expect(getUnitFromMl(10)).toBeTruthy
    expect(getUnitFromMl(50)).toBeTruthy
    expect(getUnitFromMl(100)).toBeTruthy
    expect(getUnitFromMl(1000)).toBeTruthy
    expect(getUnitFromMl(10000)).toBeTruthy
  })

  test('it returns the next closest unit', () => {
    expect(getUnitFromMl(10)).toMatchObject(UNITS.TABLESPOON)
  })

  describe.skip('Given that `includeNonStandardUnits` is true', () => {
    test('it returns only standard units', () => {
      //    expect(getUnitFromMl(50, true)).toMatchObject(UNITS.OUNCE);
      expect(getUnitFromMl(1, true)).toMatchObject(UNITS.GRAM)
      //    expect(getUnitFromMl(500, true)).toMatchObject(UNITS.PINT);
    })
  })

  describe('Given that nonstandard units are NOT included (default)', () => {
    test('it returns the the correct unit, including nonstandard units', () => {
      const one = getUnitFromMl(50)
      expect(getUnitFromMl(1)).toMatchObject(UNITS.TEASPOON)
      // expect(getUnitFromMl(500)).toMatchObject(UNITS.GALLON);
      // expect(one).toMatchObject(UNITS.CUP);
    })
  })

  test('it throws when input is too high', () => {
    expect(() => getUnitFromMl(9999999)).toThrow(ERRORS.UNIT.UNREALISTIC_INPUT)
  })

  test('it throws when input is negative', () => {
    expect(() => getUnitFromMl(-1)).toThrow(ERRORS.AMOUNT.NEGATIVE_INPUT)
  })
})
