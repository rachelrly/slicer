const Teaspoon = {
    quantityInMl: 4.92892,
    name: {
        long: 'teaspoon',
        short: 'tsp'
    },
    isScalable: true
}

const Tablespoon = {
    quantityInMl: 14.7868,
    name: {
        long: 'tablespoon',
        short: 'tbsp'
    },
    isScalable: true
}

const Ounce = {
    quantityInMl: 29.5735,
    name: {
        long: 'ounce',
        short: 'oz'
    },
    isScalable: true
}

const Cup = {
    quantityInMl: 236.588,
    name: {
        long: 'cup',
        short: 'c'
    },
    isScalable: true
}

const Pint = {
    quantityInMl: 473.176,
    name: {
        long: 'pint',
        short: 'p'
    },
    isScalable: true
}

const Quart = {
    quantityInMl: 946.353,
    name: {
        long: 'quart',
        short: 'q'
    },
    isScalable: true
}

const Gallon = {
    quantityInMl: 3785.41,
    name: {
        long: 'gallon',
        short: 'g'
    },
    isScalable: true
}

const Pound = {
    name: {
        long: 'pound',
        short: 'lb'
    },
    isScalable: false
}

const Gram = {
    quantityInMl: 1,
    name: {
        long: 'gram',
        short: 'g'
    },
    isScalable: false
}

export const Units = {
     "cups": Cup,
     "cup": Cup,
     "c": Cup,
     "cs": Cup,
     "c.": Cup,
     "cs.": Cup,
     "tablespoons": Tablespoon,
     "tablespoon": Tablespoon,
     "tbsp": Tablespoon,
     "tbsps": Tablespoon,
     "tbsp.": Tablespoon,
     "tbsps.": Tablespoon,
     "teaspoons": Teaspoon,
     "teaspoon": Teaspoon,
     "tsps": Teaspoon,
     "tsp": Teaspoon,
     "tsps.": Teaspoon,
     "tsp.": Teaspoon,
     "t": Teaspoon,
     "oz": Ounce,
     "ounce": Ounce,
     "ounces": Ounce,
     "ozs": Ounce,
     "oz.": Ounce,
     "ozs.": Ounce,
     "pounds": Pound,
     "lb": Pound,
     "lbs": Pound,
     "lb.": Pound,
     "gallons": Gallon,
     "gallon": Gallon,
     "pint": Pint,
     "pints": Pint,
     "quart": Quart,
     "quarts": Quart,
     "q": Quart, 
     "grams": Gram,
     "gram": Gram,
     "g": Gram 
 } as const

 export const UnitsType = typeof Units