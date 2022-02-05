export interface UnitName {
  long: string
  short?: string
}

export interface UnitType {
  readonly name: UnitName
  readonly matchString: any // For recipe input
  mlInUnit?: number
  readonly standard?: boolean // This only pertains to scalable units
}

type UnitsType = {
  [key: string]: UnitType
}

export const UNITS: UnitsType = {
  GALLON: {
    mlInUnit: 3785.41,
    name: {
      long: 'gallon'
    },
    standard: true,
    matchString: new Set(['G', 'G.', 'Gs', 'gallon', 'gallons'])
  },
  QUART: {
    mlInUnit: 946.353,
    name: {
      long: 'quart'
    },
    matchString: new Set(['q', 'q.', 'Q', 'quart', 'quarts']),
    standard: false
  },
  PINT: {
    mlInUnit: 473.176,
    name: {
      long: 'pint'
    },
    matchString: new Set(['p', 'p.', 'P', 'pint', 'pints']),
    standard: false
  },
  CUP: {
    mlInUnit: 236.588,
    name: {
      long: 'cup',
      short: 'c'
    },
    standard: true,
    matchString: new Set(['c', 'c.', 'cs', 'C', 'Cs', 'cup', 'cups'])
  },
  OUNCE: {
    mlInUnit: 29.5735,
    name: {
      long: 'ounce',
      short: 'oz'
    },
    matchString: new Set(['o', 'oz', 'oz.', 'ozs', 'ounce', 'ounces']),
    standard: false
  },
  TABLESPOON: {
    mlInUnit: 14.7868,
    name: {
      long: 'tablespoon',
      short: 'tbsp'
    },
    standard: true,
    matchString: new Set([
      'T',
      'tbsp',
      'tbsps',
      'tbsp.',
      'tablespoon',
      'tablespoons'
    ])
  },
  TEASPOON: {
    mlInUnit: 4.92892,
    name: {
      long: 'teaspoon',
      short: 'tsp'
    },
    standard: true,
    matchString: new Set(['t', 't.', 'tsp', 'teaspoon', 'teaspoons'])
  },
  GRAM: {
    mlInUnit: 1,
    name: {
      long: 'gram',
      short: 'g'
    },
    standard: false,
    matchString: new Set(['g', 'g.', 'gram', 'grams'])
  },
  POUND: {
    name: {
      long: 'pound',
      short: 'lb'
    },
    matchString: new Set(['lb', 'lb.', 'lbs', 'lbs.', 'pound', 'pounds'])
  },
  PINCH: {
    name: {
      long: 'pinch'
    },
    matchString: new Set(['pinch'])
  },
  SPLASH: {
    name: {
      long: 'splash'
    },
    matchString: new Set(['splash'])
  },
  DASH: {
    name: {
      long: 'dash'
    },
    matchString: new Set(['dash'])
  }
}
