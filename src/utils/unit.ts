import { UNITS, UnitType } from '../types'
import { MAX_SUPPORTED_ML } from './constants'
import { ERRORS } from './errors'

/**
 * Various helper functions that have to do with string:Unit:ml conversion
 */
export function getUnitFromMl(
  amount: number,
  standard: boolean = true
): UnitType {
  // this function takes an amount (of ml) and returns the
  //    correct unit based on the breakpoint.
  if (amount === 0) {
    throw Error(ERRORS.AMOUNT.ZERO_INPUT)
  }
  if (amount > MAX_SUPPORTED_ML) {
    throw Error(ERRORS.UNIT.UNREALISTIC_INPUT)
  }
  if (amount < 0) {
    throw Error(ERRORS.AMOUNT.NEGATIVE_INPUT)
  }
  // Units are assumed to already be sorted in descending order of unit.ml
  const units: UnitType[] = Object.values(UNITS).filter((unit) =>
    unit?.ml && standard
      ? Boolean('standard' in unit.ml)
      : unit?.ml // Not filtering for standard
      ? true
      : false
  )
  // New unit for amount
  const unit = units.find((unit) => {
    const { min } = getBreakpoint(unit, standard)
    console.log('I HAVE A MIN BREAKPOINT!!!', min)
    if (amount >= min) return true
  })
  if (!unit) {
    throw new Error(ERRORS.UNIT.NO_UNIT)
  }
  return unit
}

export function getUnitFromString(input: string) {
  // When a unit only contains one character, this is often meaningful
  //    i.e. "T" is TABLESPOON and "t" is TEASPOON
  //    but "TABLESPOON" and "tablespoon" are both TABLESPOON
  const compare = input.length > 1 ? input.toLowerCase() : input
  for (const unit of Object.values(UNITS)) {
    const matches = unit.matchString
    // Set does not match variable without toString()
    const compareval = matches.has(compare.toString())
    if (compareval) {
      return unit
    }
  }
}

function getBreakpoint(
  { ml }: UnitType,
  standard: boolean = true // Standard units only
): { min: number } {
  const breakpoints = { min: ml.min }
  if (standard && 'standard' in ml) {
    if ('min' in ml.standard) breakpoints.min = ml.standard.min
  }
  return breakpoints
}

export function getDisplayAmount(
  amount: number,
  unit: UnitType | undefined
): string {
  if (!unit || !('ml' in unit)) {
    return amount.toString()
  }
  return getAmountInUnit(amount, unit).toString()
}

export function getAmountInUnit(amount: number, { ml }: UnitType): number {
  return Number(parseFloat(`${amount / ml.ml}`).toFixed(2))
}
