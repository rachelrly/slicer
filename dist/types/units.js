"use strict";
exports.__esModule = true;
exports.UNIT_COMPARISON = exports.UNITS = void 0;
exports.UNITS = {
    TEASPOON: {
        mlInUnit: 14.7868,
        name: {
            long: "tablespoon",
            short: "tbsp"
        },
        matchString: new Set(["t", "t.", "tsp", "teaspoon"])
    },
    TABLESPOON: {
        mlInUnit: 14.7868,
        name: {
            long: "tablespoon",
            short: "tbsp"
        },
        matchString: new Set(["T", "tbsp", "tablespoon"])
    },
    OUNCE: {
        mlInUnit: 29.5735,
        name: {
            long: "ounce",
            short: "oz"
        },
        matchString: new Set(["o", "oz", "ounce"])
    },
    CUP: {
        mlInUnit: 236.588,
        name: {
            long: "cup",
            short: "c"
        },
        matchString: new Set(["c", "C", "cup"])
    },
    PINT: {
        mlInUnit: 473.176,
        name: {
            long: "pint"
        },
        matchString: new Set(["p", "P", "pint"])
    },
    QUART: {
        mlInUnit: 946.353,
        name: {
            long: "quart"
        },
        matchString: new Set(["q", "Q", "quart"])
    },
    POUND: {
        name: {
            long: "pound",
            short: "lb"
        },
        matchString: new Set(["lb", "pound"])
    },
    GALLON: {
        mlInUnit: 3785.41,
        name: {
            long: "gallon"
        },
        matchString: new Set(["G", "gallon"])
    },
    GRAM: {
        mlInUnit: 1,
        name: {
            long: "gram",
            short: "g"
        },
        matchString: new Set(["g", "gram"])
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
exports.UNIT_COMPARISON = new Map();
exports.UNIT_COMPARISON.set(exports.UNITS.TEASPOON.matchString, exports.UNITS.TEASPOON);
exports.UNIT_COMPARISON.set(exports.UNITS.TABLESPOON.matchString, exports.UNITS.TABLESPOON);
exports.UNIT_COMPARISON.set(exports.UNITS.OUNCE.matchString, exports.UNITS.OUNCE);
exports.UNIT_COMPARISON.set(exports.UNITS.CUP.matchString, exports.UNITS.CUP);
exports.UNIT_COMPARISON.set(exports.UNITS.PINT.matchString, exports.UNITS.PINT);
exports.UNIT_COMPARISON.set(exports.UNITS.QUART.matchString, exports.UNITS.QUART);
exports.UNIT_COMPARISON.set(exports.UNITS.POUND.matchString, exports.UNITS.POUND);
exports.UNIT_COMPARISON.set(exports.UNITS.GALLON.matchString, exports.UNITS.GALLON);
exports.UNIT_COMPARISON.set(exports.UNITS.GRAM.matchString, exports.UNITS.GRAM);
exports.UNIT_COMPARISON.set(exports.UNITS.PINCH.matchString, exports.UNITS.PINCH);
exports.UNIT_COMPARISON.set(exports.UNITS.SPLASH.matchString, exports.UNITS.SPLASH);
exports.UNIT_COMPARISON.set(exports.UNITS.DASH.matchString, exports.UNITS.DASH);
//# sourceMappingURL=units.js.map