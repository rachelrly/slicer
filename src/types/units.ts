export interface UnitName {
  long: string;
  short: string;
}

export interface Unit {
  readonly quantityInMl?: number;
  readonly name: UnitName;
  readonly isScalable: boolean;
}

const Teaspoon = {
  quantityInMl: 4.92892,
  name: {
    long: "teaspoon",
    short: "tsp",
  },
  isScalable: true,
};

const Tablespoon = {
  quantityInMl: 14.7868,
  name: {
    long: "tablespoon",
    short: "tbsp",
  },
  isScalable: true,
};

const Ounce = {
  quantityInMl: 29.5735,
  name: {
    long: "ounce",
    short: "oz",
  },
  isScalable: true,
};

const Cup = {
  quantityInMl: 236.588,
  name: {
    long: "cup",
    short: "c",
  },
  isScalable: true,
};

const Pint = {
  quantityInMl: 473.176,
  name: {
    long: "pint",
    short: "p",
  },
  isScalable: true,
};

const Quart = {
  quantityInMl: 946.353,
  name: {
    long: "quart",
    short: "q",
  },
  isScalable: true,
};

const Gallon = {
  quantityInMl: 3785.41,
  name: {
    long: "gallon",
    short: "g",
  },
  isScalable: true,
};

const Pound = {
  name: {
    long: "pound",
    short: "lb",
  },
  isScalable: false,
};

const Gram = {
  quantityInMl: 1,
  name: {
    long: "gram",
    short: "g",
  },
  isScalable: false,
};

export function getUnitFromMl(amount: number, includeNonStandardUnits = true) {
  // nonstandard units are outside the traditional American recipe structure
  switch (true) {
    case amount < Gram.quantityInMl && includeNonStandardUnits:
      return Gram;
    case amount < Teaspoon.quantityInMl * 2:
      return Teaspoon;
    case amount < Tablespoon.quantityInMl * 2:
      return Tablespoon;
    case amount < Ounce.quantityInMl * 2 && includeNonStandardUnits:
      return Ounce;
    case amount < Cup.quantityInMl * 2:
      return Cup;
    case amount < Pint.quantityInMl * 2 && includeNonStandardUnits:
      return Pint;
    case amount < Quart.quantityInMl * 2 && includeNonStandardUnits:
      return Quart;
    default:
      return Gallon;
  }
}

export const Units = {
  cup: Cup,
  c: Cup,
  tablespoon: Tablespoon,
  tbsp: Tablespoon,
  teaspoon: Teaspoon,
  tsp: Teaspoon,
  t: Teaspoon,
  oz: Ounce,
  ounce: Ounce,
  pound: Pound,
  lb: Pound,
  gallon: Gallon,
  pint: Pint,
  quart: Quart,
  q: Quart,
  gram: Gram,
  g: Gram,
} as const;

export type UnitsType = keyof typeof Units;
