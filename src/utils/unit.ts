import { UNITS, ERRORS, UnitType } from '../types'
import { MAXIMUM_SUPPORTED_ML } from './constants'

/**
 * Various helper functions that have to do with string:Unit:ml conversion
 */
export function getUnitFromMl(amount: number, standardOnly: boolean): UnitType {
  // this function takes an amount (of ml) and returns the
  //    correct unit based on the breakpoint.
  if (amount === 0) {
    throw Error(ERRORS.AMOUNT.ZERO_INPUT)
  }
  if (amount > MAXIMUM_SUPPORTED_ML) {
    throw Error(ERRORS.UNIT.UNREALISTIC_INPUT)
  }
  if (amount < 0) {
    throw Error(ERRORS.AMOUNT.NEGATIVE_INPUT)
  }
  // Units are assumed to already be sorted in descending order of unit.ml
  const units: UnitType[] = Object.values(UNITS).filter(
    (unit) =>
      unit.ml && (unit.standard === standardOnly || unit.standard === true)
  )
  return units.find(
    (unit, i) =>
      i === units.length - 1 ||
      amount > getUnitBreakpoint(unit.ml, units[i + 1].ml)
  )
}

export function getUnitFromString(input: string) {
  // When a unit only contains one character, this is often meaningful
  //    i.e. "T" is TABLESPOON and "t" is TEASPOON
  //    but "TABLESPOON" and "tablespoon" are both TABLESPOON
  // Set does not match variable without toString()
  const compare = input.length > 1 ? input.toLowerCase() : input
  for (const unit of Object.values(UNITS)) {
    const matches = unit.matchString
    const compareval = matches.has(compare.toString())
    if (compareval) {
      return unit
    } else {
    }
  }
}

function getUnitBreakpoint(curr: number, next: number): number {
  const offset = curr * 0.1 // Prevents constant=0.5 from rounding up units
  const average = (curr + next) / 2
  return average - offset
}
