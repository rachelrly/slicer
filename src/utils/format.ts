import {
  Unit,
  Gram,
  Ounce,
  Teaspoon,
  Tablespoon,
  Cup,
  Pint,
  Quart,
  Gallon,
} from "../types/units";

export function fractionToFloat(fraction: string, index: number): number {
  const numerator = fraction.slice(0, index);
  const denominator = fraction.slice(index + 1);
  const total = Number(numerator) / Number(denominator);
  return total;
}

export function getUnitFromMl(
  amount: number,
  includeNonStandardUnits = false
): Unit {
  // nonstandard units are outside the traditional American recipe structure

  if (amount > Gallon.quantityInMl * 20) {
    throw Error("Cannot handle amounts over 20 gallons");
  }

  if (amount < 0) {
    throw Error("Cannot have a negative amount of an ingredient");
  }

  const mlDoubled = (unit: Unit) =>
    unit.quantityInMl * 2 - unit.quantityInMl / 6;

  switch (true) {
    case amount < mlDoubled(Gram) && includeNonStandardUnits:
      return Gram;
    case amount < mlDoubled(Teaspoon):
      return Teaspoon;
    case amount < mlDoubled(Tablespoon):
      return Tablespoon;
    case amount < mlDoubled(Ounce) && includeNonStandardUnits:
      return Ounce;
    case amount < mlDoubled(Cup):
      return Cup;
    case amount < mlDoubled(Pint) && includeNonStandardUnits:
      return Pint;
    case amount < mlDoubled(Quart) && includeNonStandardUnits:
      return Quart;
    default:
      return Gallon;
  }
}
