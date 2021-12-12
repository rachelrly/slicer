export interface UnitName {
  long: string;
  short?: string;
} // currently not being used in this file. Move?

export interface UnitType {
  readonly mlInUnit?: number;
  readonly name: UnitName;
  readonly matchString: any;
} // currently not being used in this file. Move?

export const UNITS = {
  TEASPOON: {
    mlInUnit: 14.7868,
    name: {
      long: "tablespoon",
      short: "tbsp",
    },
    matchString: new Set(["t", "t.", "tsp", "teaspoon"]),
  },
  TABLESPOON: {
    mlInUnit: 14.7868,
    name: {
      long: "tablespoon",
      short: "tbsp",
    },
    matchString: new Set(["T", "tbsp", "tablespoon"]),
  },
  OUNCE: {
    mlInUnit: 29.5735,
    name: {
      long: "ounce",
      short: "oz",
    },
    matchString: new Set(["o", "oz", "ounce"]),
  },
  CUP: {
    mlInUnit: 236.588,
    name: {
      long: "cup",
      short: "c",
    },
    matchString: new Set(["c", "C", "cup"]),
  },
  PINT: {
    mlInUnit: 473.176,
    name: {
      long: "pint",
    },
    matchString: new Set(["p", "P", "pint"]),
  },
  QUART: {
    mlInUnit: 946.353,
    name: {
      long: "quart",
    },
    matchString: new Set(["q", "Q", "quart"]),
  },
  POUND: {
    name: {
      long: "pound",
      short: "lb",
    },
    matchString: new Set(["lb", "pound"]),
  },
  GALLON: {
    mlInUnit: 3785.41,
    name: {
      long: "gallon",
    },
    matchString: new Set(["G", "gallon"]),
  },
  GRAM: {
    mlInUnit: 1,
    name: {
      long: "gram",
      short: "g",
    },
    matchString: new Set(["g", "gram"]),
  },
  PINCH: {
    name: {
      long: "pinch",
    },
    matchString: new Set(["pinch"]),
  },
  SPLASH: {
    name: {
      long: "splash",
    },
    matchString: new Set(["splash"]),
  },
  DASH: {
    name: {
      long: "dash",
    },
    matchString: new Set(["dash"]),
  },
} as const;

// The UNIT_COMPARISON map contains unit strings from recipes and maps them to the unit constant
export const UNIT_COMPARISON = new Map();

// TODO: Remove UNITS[x].matchString from unit returned since it is not being used

// In previous versions, strings ending in "." or "s" were formatted before comparison.
// This is depreciated because it requires preforming computation on ingredient names.
UNIT_COMPARISON.set(UNITS.TEASPOON.matchString, UNITS.TEASPOON);
UNIT_COMPARISON.set(UNITS.TABLESPOON.matchString, UNITS.TABLESPOON);
UNIT_COMPARISON.set(UNITS.OUNCE.matchString, UNITS.OUNCE);
UNIT_COMPARISON.set(UNITS.CUP.matchString, UNITS.CUP);
UNIT_COMPARISON.set(UNITS.PINT.matchString, UNITS.PINT);
UNIT_COMPARISON.set(UNITS.QUART.matchString, UNITS.QUART);
UNIT_COMPARISON.set(UNITS.POUND.matchString, UNITS.POUND);
UNIT_COMPARISON.set(UNITS.GALLON.matchString, UNITS.GALLON);
UNIT_COMPARISON.set(UNITS.GRAM.matchString, UNITS.GRAM);
UNIT_COMPARISON.set(UNITS.PINCH.matchString, UNITS.PINCH);
UNIT_COMPARISON.set(UNITS.SPLASH.matchString, UNITS.SPLASH);
UNIT_COMPARISON.set(UNITS.DASH.matchString, UNITS.DASH);

export type UnitsType = keyof typeof UNITS;

// TODO: if length is > 1, do compare .toLowerCase()
