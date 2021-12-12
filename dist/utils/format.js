"use strict";
exports.__esModule = true;
exports.getUnitFromString = exports.getUnitFromMl = exports.fractionToFloat = void 0;
var units_1 = require("../types/units");
var constants_1 = require("./constants");
var errors_1 = require("../types/errors");
function fractionToFloat(fraction, index) {
    var numerator = fraction.slice(0, index);
    var denominator = fraction.slice(index + 1);
    var total = Number(numerator) / Number(denominator);
    return total;
}
exports.fractionToFloat = fractionToFloat;
function getUnitFromMl(amount, includeNonStandardUnits) {
    if (includeNonStandardUnits === void 0) { includeNonStandardUnits = false; }
    if (amount === 0) {
        throw Error(errors_1.ERRORS.AMOUNT.ZERO_INPUT);
    }
    if (amount > constants_1.MAXIMUM_SUPPORTED_ML) {
        throw Error(errors_1.ERRORS.UNIT.UNREALISTIC_INPUT);
    }
    if (amount < 0) {
        throw Error(errors_1.ERRORS.AMOUNT.NEGATIVE_INPUT);
    }
    function _getUnitBreakpoint(mlInUnit) {
        return mlInUnit * 2 - mlInUnit / 6;
    }
    switch (true) {
        case amount < _getUnitBreakpoint(units_1.UNITS.GRAM.mlInUnit) &&
            includeNonStandardUnits:
            return units_1.UNITS.GRAM;
        case amount < _getUnitBreakpoint(units_1.UNITS.TEASPOON.mlInUnit):
            return units_1.UNITS.TEASPOON;
        case amount < _getUnitBreakpoint(units_1.UNITS.TEASPOON.mlInUnit):
            return units_1.UNITS.TABLESPOON;
        case amount < _getUnitBreakpoint(units_1.UNITS.OUNCE.mlInUnit) &&
            includeNonStandardUnits:
            return units_1.UNITS.OUNCE;
        case amount < _getUnitBreakpoint(units_1.UNITS.CUP.mlInUnit):
            return units_1.UNITS.CUP;
        case amount < _getUnitBreakpoint(units_1.UNITS.PINT.mlInUnit) &&
            includeNonStandardUnits:
            return units_1.UNITS.PINT;
        case amount < _getUnitBreakpoint(units_1.UNITS.QUART.mlInUnit) &&
            includeNonStandardUnits:
            return units_1.UNITS.QUART;
        default:
            return units_1.UNITS.GALLON;
    }
}
exports.getUnitFromMl = getUnitFromMl;
function getUnitFromString(input) {
    var unit;
    units_1.UNIT_COMPARISON.forEach(function (value, key) {
        if (key.has(input.toString())) {
            unit = value;
        }
    });
    return unit;
}
exports.getUnitFromString = getUnitFromString;
//# sourceMappingURL=format.js.map