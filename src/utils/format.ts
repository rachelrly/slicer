import { UNITS, UnitType } from "../types/units";
import { MAXIMUM_SUPPORTED_ML } from "./constants";
import { ERRORS } from "../types/errors";
export function fractionToFloat(fraction: string, index: number): number {
  const numerator = fraction.slice(0, index);
  const denominator = fraction.slice(index + 1);
  const total = Number(numerator) / Number(denominator);
  return total;
}

export function getUnitFromMl(
  amount: number,
  nonstandardUnits = false // Not tsp, tbsp, cup
): UnitType {
  if (amount === 0) {
    throw Error(ERRORS.AMOUNT.ZERO_INPUT);
  }

  if (amount > MAXIMUM_SUPPORTED_ML) {
    throw Error(ERRORS.UNIT.UNREALISTIC_INPUT);
  }

  if (amount < 0) {
    throw Error(ERRORS.AMOUNT.NEGATIVE_INPUT);
  }

  function _getUnitBreakpoint(mlInUnit: number) {
    // subtraction prevents scale up at exactly 1/2 of next unit
    const offset = mlInUnit * 0.1;
    const doubled = mlInUnit * 2;
    return doubled - offset;
  }

  for (const value of Object.values(UNITS)) {
    // this should be compared to the next unit, not the current unit
    const ml = value?.mlInUnit;
    if (Boolean(ml)) {
      if (amount < _getUnitBreakpoint(ml)) {
        // not handling nonstandard units for testing
        const isIncluded = !value?.notStandard;
        if (isIncluded) return value;
        return;
      }
    } else return value;
  }
}

export function getUnitFromString(input: string) {
  // Set does not match variable without toString conversion
  for (const value of Object.values(UNITS)) {
    const { matchString } = value;
    if (matchString.has(input.toString())) {
      return value;
    }
  }
}
