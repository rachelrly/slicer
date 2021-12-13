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
  includeNonStandardUnits = false
): UnitType {
  // nonstandard units are outside the traditional American recipe structure

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
    return mlInUnit / 2 - mlInUnit * 0.1;
  }

  switch (true) {
    case amount < _getUnitBreakpoint(UNITS.TEASPOON.mlInUnit) &&
      includeNonStandardUnits:
      return UNITS.GRAM;
    case amount < _getUnitBreakpoint(UNITS.TABLESPOON.mlInUnit):
      return UNITS.TEASPOON;
    case amount < _getUnitBreakpoint(UNITS.OUNCE.mlInUnit):
      return UNITS.TABLESPOON;
    case amount < _getUnitBreakpoint(UNITS.CUP.mlInUnit) &&
      includeNonStandardUnits:
      return UNITS.OUNCE;
    case amount < _getUnitBreakpoint(UNITS.PINT.mlInUnit):
      return UNITS.CUP;
    case amount < _getUnitBreakpoint(UNITS.QUART.mlInUnit) &&
      includeNonStandardUnits:
      return UNITS.PINT;
    case amount < _getUnitBreakpoint(UNITS.GALLON.mlInUnit) &&
      includeNonStandardUnits:
      return UNITS.QUART;
    default:
      return UNITS.GALLON;
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
