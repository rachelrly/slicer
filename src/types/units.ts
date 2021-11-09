export interface UnitName {
  long: string;
  short: string;
}

export interface Unit {
  readonly quantityInMl?: number;
  readonly name: UnitName;
  readonly isScalable: boolean;
}

export const Teaspoon = {
  quantityInMl: 4.92892,
  name: {
    long: "teaspoon",
    short: "tsp",
  },
  isScalable: true,
};

export const Tablespoon = {
  quantityInMl: 14.7868,
  name: {
    long: "tablespoon",
    short: "tbsp",
  },
  isScalable: true,
};

export const Ounce = {
  quantityInMl: 29.5735,
  name: {
    long: "ounce",
    short: "oz",
  },
  isScalable: true,
};

export const Cup = {
  quantityInMl: 236.588,
  name: {
    long: "cup",
    short: "c",
  },
  isScalable: true,
};

export const Pint = {
  quantityInMl: 473.176,
  name: {
    long: "pint",
    short: "p",
  },
  isScalable: true,
};

export const Quart = {
  quantityInMl: 946.353,
  name: {
    long: "quart",
    short: "q",
  },
  isScalable: true,
};

export const Gallon = {
  quantityInMl: 3785.41,
  name: {
    long: "gallon",
    short: "g",
  },
  isScalable: true,
};

export const Pound = {
  name: {
    long: "pound",
    short: "lb",
  },
  isScalable: false,
};

export const Gram = {
  quantityInMl: 1,
  name: {
    long: "gram",
    short: "g",
  },
  isScalable: false,
};

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
