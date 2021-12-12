export interface UnitName {
  long: string;
  short?: string;
} // currently not being used in this file. Move?

export interface Unit {
  readonly quantityInMl?: number;
  readonly name: UnitName;
  readonly isScalable: boolean;
} // currently not being used in this file. Move?

export const UNITS = {
  TEASPOON: {
    quantityInMl: 14.7868,
    name: {
      long: "tablespoon",
      short: "tbsp",
    },
  },
  TABLESPOON: {
    quantityInMl: 14.7868,
    name: {
      long: "tablespoon",
      short: "tbsp",
    },
  },
  OUNCE: {
    quantityInMl: 29.5735,
    name: {
      long: "ounce",
      short: "oz",
    },
  },
  CUP: {
    quantityInMl: 236.588,
    name: {
      long: "cup",
      short: "c",
    },
  },
  PINT: {
    quantityInMl: 473.176,
    name: {
      long: "pint",
    },
  },
  QUART: {
    quantityInMl: 946.353,
    name: {
      long: "quart",
    },
  },
  POUND: {
    name: {
      long: "pound",
      short: "lb",
    },
  },
  GALLON: {
    quantityInMl: 3785.41,
    name: {
      long: "gallon",
    },
  },
  GRAM: {
    quantityInMl: 1,
    name: {
      long: "gram",
      short: "g",
    },
  },
  PINCH: {
    name: {
      long: "pinch",
    },
  },
  SPLASH: {
    name: {
      long: "splash",
    },
  },
} as const;

// The UNIT_COMPARISON map contains unit strings from recipes and maps them to the unit constant
export const UNIT_COMPARISON = new Map();

// Units that end in "." or "s" are parsed before comparison
UNIT_COMPARISON.set(new Set(["t", "tsp", "teaspoon"]), UNITS.TEASPOON);
UNIT_COMPARISON.set(new Set(["T", "tbsp", "tablespoon"]), UNITS.TABLESPOON);
UNIT_COMPARISON.set(new Set(["o", "oz", "ounce"]), UNITS.OUNCE);
UNIT_COMPARISON.set(new Set(["c", "C", "cup"]), UNITS.CUP);
UNIT_COMPARISON.set(new Set(["p", "P", "pint"]), UNITS.PINT);
UNIT_COMPARISON.set(new Set(["q", "Q", "quart"]), UNITS.QUART);
UNIT_COMPARISON.set(new Set(["lb", "pound"]), UNITS.POUND);
UNIT_COMPARISON.set(new Set(["G", "gallon"]), UNITS.GALLON);
UNIT_COMPARISON.set(new Set(["g", "gram"]), UNITS.GRAM);
UNIT_COMPARISON.set(new Set(["pinch"]), UNITS.PINCH);
UNIT_COMPARISON.set(new Set(["splash"]), UNITS.SPLASH);

export type UnitsType = keyof typeof UNITS;

// TODO: if length is > 1, do compare .toLowerCase()
