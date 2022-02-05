import { UNITS, ERRORS, UnitType } from '../types'
import { MAXIMUM_SUPPORTED_ML } from './constants'

export function fractionToFloat(fraction: string, index: number): number {
  const numerator = fraction.slice(0, index)
  const denominator = fraction.slice(index + 1)
  const total = Number(numerator) / Number(denominator)
  return total
}

// this function takes an amount (of ml) and returns the
//    correct unit based on the breakpoint.
export function getUnitFromMl(amount: number): UnitType {
  if (amount === 0) {
    throw Error(ERRORS.AMOUNT.ZERO_INPUT)
  }
  if (amount > MAXIMUM_SUPPORTED_ML) {
    throw Error(ERRORS.UNIT.UNREALISTIC_INPUT)
  }
  if (amount < 0) {
    throw Error(ERRORS.AMOUNT.NEGATIVE_INPUT)
  }
  const units: UnitType[] = Object.values(UNITS).filter((unit) => unit.mlInUnit)
  return units.find(
    (unit, i) =>
      i === units.length - 1 ||
      amount > getUnitBreakpoint(unit.mlInUnit, units[i + 1].mlInUnit)
  )
}

export function getUnitFromString(input: string) {
  // Set does not match variable without toString conversion
  for (const value of Object.values(UNITS)) {
    const { matchString } = value
    if (matchString.has(input.toString())) {
      return value
    }
  }
}

function getUnitBreakpoint(curr: number, next: number): number {
  const offset = curr * 0.1 // Prevents constant=0.5 from rounding up units
  const average = (curr + next) / 2
  return average - offset
}
