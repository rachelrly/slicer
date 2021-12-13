"use strict";
exports.__esModule = true;
exports.UNITS = void 0;
exports.UNITS = {
    TEASPOON: {
        mlInUnit: 4.92892,
        name: {
            long: "teaspoon",
            short: "tsp"
        },
        matchString: new Set(["t", "t.", "tsp", "teaspoon", "teaspoons"])
    },
    TABLESPOON: {
        mlInUnit: 14.7868,
        name: {
            long: "tablespoon",
            short: "tbsp"
        },
        matchString: new Set(["T", "tbsp", "tbsp.", "tablespoon", "tablespoons"])
    },
    OUNCE: {
        mlInUnit: 29.5735,
        name: {
            long: "ounce",
            short: "oz"
        },
        matchString: new Set(["o", "oz", "oz.", "ozs", "ounce", "ounces"]),
        notStandard: true
    },
    CUP: {
        mlInUnit: 236.588,
        name: {
            long: "cup",
            short: "c"
        },
        matchString: new Set(["c", "c.", "cs", "C", "Cs", "cup", "cups"])
    },
    PINT: {
        mlInUnit: 473.176,
        name: {
            long: "pint"
        },
        matchString: new Set(["p", "p.", "P", "pint", "pints"]),
        notStandard: true
    },
    QUART: {
        mlInUnit: 946.353,
        name: {
            long: "quart"
        },
        matchString: new Set(["q", "q.", "Q", "quart", "quarts"]),
        notStandard: true
    },
    POUND: {
        name: {
            long: "pound",
            short: "lb"
        },
        matchString: new Set(["lb", "lb.", "lbs", "lbs.", "pound", "pounds"])
    },
    GALLON: {
        mlInUnit: 3785.41,
        name: {
            long: "gallon"
        },
        matchString: new Set(["G", "G.", "Gs", "gallon", "gallons"])
    },
    GRAM: {
        mlInUnit: 1,
        name: {
            long: "gram",
            short: "g"
        },
        matchString: new Set(["g", "g.", "gram", "grams"])
    },
    PINCH: {
        name: {
            long: "pinch"
        },
        matchString: new Set(["pinch"])
    },
    SPLASH: {
        name: {
            long: "splash"
        },
        matchString: new Set(["splash"])
    },
    DASH: {
        name: {
            long: "dash"
        },
        matchString: new Set(["dash"])
    }
};
//# sourceMappingURL=units.js.map