"use strict";
exports.__esModule = true;
exports.Units = void 0;
var Teaspoon = {
    quantityInMl: 4.92892,
    name: {
        long: 'teaspoon',
        short: 'tsp'
    },
    isScalable: true
};
var Tablespoon = {
    quantityInMl: 14.7868,
    name: {
        long: 'tablespoon',
        short: 'tbsp'
    },
    isScalable: true
};
var Ounce = {
    quantityInMl: 29.5735,
    name: {
        long: 'ounce',
        short: 'oz'
    },
    isScalable: true
};
var Cup = {
    quantityInMl: 236.588,
    name: {
        long: 'cup',
        short: 'c'
    },
    isScalable: true
};
var Pint = {
    quantityInMl: 473.176,
    name: {
        long: 'pint',
        short: 'p'
    },
    isScalable: true
};
var Quart = {
    quantityInMl: 946.353,
    name: {
        long: 'quart',
        short: 'q'
    },
    isScalable: true
};
var Gallon = {
    quantityInMl: 3785.41,
    name: {
        long: 'gallon',
        short: 'g'
    },
    isScalable: true
};
var Pound = {
    name: {
        long: 'pound',
        short: 'lb'
    },
    isScalable: false
};
var Gram = {
    quantityInMl: 1,
    name: {
        long: 'gram',
        short: 'g'
    },
    isScalable: false
};
exports.Units = {
    "cup": Cup,
    "c": Cup,
    "tablespoon": Tablespoon,
    "tbsp": Tablespoon,
    "teaspoon": Teaspoon,
    "tsp": Teaspoon,
    "t": Teaspoon,
    "oz": Ounce,
    "ounce": Ounce,
    "pound": Pound,
    "lb": Pound,
    "gallon": Gallon,
    "pint": Pint,
    "quart": Quart,
    "q": Quart,
    "gram": Gram,
    "g": Gram
};
