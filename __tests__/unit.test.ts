import { getUnitFromMl } from '../src/utils'
import { ERRORS, UNITS } from '../src/types'

// TODO: Write test to demonstrate that units are sorted by ml
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

  test('it throws when input is too high', () => {
    expect(() => getUnitFromMl(9999999)).toThrow(ERRORS.UNIT.UNREALISTIC_INPUT)
  })

  test('it throws when input is negative', () => {
    expect(() => getUnitFromMl(-1)).toThrow(ERRORS.AMOUNT.NEGATIVE_INPUT)
  })
})
