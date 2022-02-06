import { MAX_SUPPORTED_ML } from '../utils'

export interface UnitName {
  long: string
  short?: string
}

export interface UnitType {
  readonly name: UnitName
  readonly matchString: any
  readonly ml?: {
    ml: number
    min: number
    max: number
    standard?: {
      // if standard is present and empty
      min?: number // breakpoints are the same as before
      max?: number
    }
  }
}

const ML_PER_UNIT = {
  GALLON: 3785.41,
  QUART: 946.353,
  PINT: 473.176,
  CUP: 236.588,
  OUNCE: 29.5735,
  TABLESPOON: 14.7868,
  TEASPOON: 4.92892,
  GRAM: 1
} as const

type UnitsType = {
  [key: string]: UnitType
}

export const UNITS: UnitsType = {
  GALLON: {
    name: {
      long: 'gallon'
    },
    matchString: new Set(['G', 'G.', 'Gs', 'gallon', 'gallons']),
    ml: {
      ml: ML_PER_UNIT.GALLON,
      max: MAX_SUPPORTED_ML,
      min: ML_PER_UNIT.QUART * 2,
      standard: {
        min: ML_PER_UNIT.CUP * 4
      }
    }
  },
  QUART: {
    name: {
      long: 'quart'
    },
    matchString: new Set(['q', 'q.', 'Q', 'quart', 'quarts']),
    ml: {
      ml: ML_PER_UNIT.QUART,
      min: ML_PER_UNIT.QUART,
      max: ML_PER_UNIT.QUART * 2
    }
  },
  PINT: {
    name: {
      long: 'pint'
    },
    matchString: new Set(['p', 'p.', 'P', 'pint', 'pints']),
    ml: {
      ml: ML_PER_UNIT.PINT,
      min: ML_PER_UNIT.PINT,
      max: ML_PER_UNIT.QUART
    }
  },
  CUP: {
    name: {
      long: 'cup',
      short: 'c'
    },
    matchString: new Set(['c', 'c.', 'cs', 'C', 'Cs', 'cup', 'cups']),
    ml: {
      ml: ML_PER_UNIT.CUP,
      min: ML_PER_UNIT.CUP / 4,
      max: ML_PER_UNIT.PINT,
      standard: {
        max: ML_PER_UNIT.GALLON / 2
      }
    }
  },
  OUNCE: {
    name: {
      long: 'ounce',
      short: 'oz'
    },
    ml: {
      ml: ML_PER_UNIT.OUNCE,
      min: ML_PER_UNIT.OUNCE / 2,
      max: ML_PER_UNIT.CUP / 4
    },
    matchString: new Set(['o', 'oz', 'oz.', 'ozs', 'ounce', 'ounces'])
  },
  TABLESPOON: {
    name: {
      long: 'tablespoon',
      short: 'tbsp'
    },
    matchString: new Set([
      'T',
      'tbsp',
      'tbsps',
      'tbsp.',
      'tablespoon',
      'tablespoons'
    ]),
    ml: {
      ml: ML_PER_UNIT.TABLESPOON,
      min: ML_PER_UNIT.TABLESPOON / 2,
      max: ML_PER_UNIT.TABLESPOON * 2,
      standard: {
        max: ML_PER_UNIT.CUP / 4
      }
    }
  },
  TEASPOON: {
    name: {
      long: 'teaspoon',
      short: 'tsp'
    },
    matchString: new Set(['t', 't.', 'tsp', 'teaspoon', 'teaspoons']),
    ml: {
      ml: ML_PER_UNIT.TEASPOON,
      min: ML_PER_UNIT.TEASPOON / 4,
      max: ML_PER_UNIT.TABLESPOON / 2,
      standard: {
        min: 0
      }
    }
  },
  GRAM: {
    name: {
      long: 'gram',
      short: 'g'
    },
    ml: {
      ml: ML_PER_UNIT.GRAM,
      min: 0,
      max: ML_PER_UNIT.TEASPOON / 4
    },
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
} as const
