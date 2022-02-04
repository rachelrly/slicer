import { UNITS, ERRORS, UnitType } from '../types'
import { MAXIMUM_SUPPORTED_ML } from './constants'

export function fractionToFloat(fraction: string, index: number): number {
  const numerator = fraction.slice(0, index)
  const denominator = fraction.slice(index + 1)
  const total = Number(numerator) / Number(denominator)
  return total
}

export function getUnitFromMl(
  amount: number
  // nonstandardUnits = false // Not tsp, tbsp, cup
): UnitType {
  console.log('--------------------------------------------------')
  console.log('RUNNING GET UNIT FROM ML WITH AMOUNT', { amount })
  if (amount === 0) {
    throw Error(ERRORS.AMOUNT.ZERO_INPUT)
  }

  if (amount > MAXIMUM_SUPPORTED_ML) {
    throw Error(ERRORS.UNIT.UNREALISTIC_INPUT)
  }

  if (amount < 0) {
    throw Error(ERRORS.AMOUNT.NEGATIVE_INPUT)
  }
  const units: UnitType[] = Object.values(UNITS)
  const newUnit = units
    .filter((unit) => Boolean(unit.mlInUnit))
    .find((unit, index) => {
      const next = units[index + 1]
      if (!next) {
        console.log('FOUND NEXT UNIT')
        return true // Finds last unit
      }
      const breakpoint = getUnitBreakpoint(unit.mlInUnit, next.mlInUnit)
      if (amount < breakpoint) return true
    })
  console.log('THIS IS MY NEW UNIT', newUnit)
  if (!newUnit) {
    throw Error(ERRORS.UNIT.NO_UNIT)
  } else return newUnit
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

function getUnitBreakpoint(currMl: number, nextMl: number): number {
  const offset = currMl * 0.1 // Prevents constant=0.5 from rounding up units
  const average = (currMl + nextMl) / 2
  return offset + average
}

// function _getUnitBreakpoint(mlInUnit: number) {
//   // subtraction prevents scale up at exactly 1/2 of next unit
//   const offset = mlInUnit * 0.1
//   const doubled = mlInUnit * 2
//   return doubled - offset
// }
