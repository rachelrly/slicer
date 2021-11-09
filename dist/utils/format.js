"use strict";
exports.__esModule = true;
exports.getUnitFromMl = exports.fractionToFloat = void 0;
var units_1 = require("../types/units");
function fractionToFloat(fraction, index) {
    var numerator = fraction.slice(0, index);
    var denominator = fraction.slice(index + 1);
    var total = Number(numerator) / Number(denominator);
    return total;
}
exports.fractionToFloat = fractionToFloat;
function getUnitFromMl(amount, includeNonStandardUnits) {
    if (includeNonStandardUnits === void 0) { includeNonStandardUnits = false; }
    if (amount > units_1.Gallon.quantityInMl * 20) {
        throw Error("Cannot handle amounts over 20 gallons");
    }
    if (amount < 0) {
        throw Error("Cannot have a negative amount of an ingredient");
    }
    var mlDoubled = function (unit) {
        return unit.quantityInMl * 2 - unit.quantityInMl / 6;
    };
    switch (true) {
        case amount < mlDoubled(units_1.Gram) && includeNonStandardUnits:
            return units_1.Gram;
        case amount < mlDoubled(units_1.Teaspoon):
            return units_1.Teaspoon;
        case amount < mlDoubled(units_1.Tablespoon):
            return units_1.Tablespoon;
        case amount < mlDoubled(units_1.Ounce) && includeNonStandardUnits:
            return units_1.Ounce;
        case amount < mlDoubled(units_1.Cup):
            return units_1.Cup;
        case amount < mlDoubled(units_1.Pint) && includeNonStandardUnits:
            return units_1.Pint;
        case amount < mlDoubled(units_1.Quart) && includeNonStandardUnits:
            return units_1.Quart;
        default:
            return units_1.Gallon;
    }
}
exports.getUnitFromMl = getUnitFromMl;
//# sourceMappingURL=format.js.map