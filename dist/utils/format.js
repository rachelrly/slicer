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
function getUnitFromMl(amount, nonstandardUnits) {
    if (nonstandardUnits === void 0) { nonstandardUnits = false; }
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
        var offset = mlInUnit * 0.1;
        var doubled = mlInUnit * 2;
        return doubled - offset;
    }
    for (var _i = 0, _a = Object.values(units_1.UNITS); _i < _a.length; _i++) {
        var value = _a[_i];
        var ml = value === null || value === void 0 ? void 0 : value.mlInUnit;
        if (Boolean(ml)) {
            if (amount < _getUnitBreakpoint(ml)) {
                var isIncluded = !(value === null || value === void 0 ? void 0 : value.notStandard);
                if (isIncluded)
                    return value;
                return;
            }
        }
        else
            return value;
    }
}
exports.getUnitFromMl = getUnitFromMl;
function getUnitFromString(input) {
    for (var _i = 0, _a = Object.values(units_1.UNITS); _i < _a.length; _i++) {
        var value = _a[_i];
        var matchString = value.matchString;
        if (matchString.has(input.toString())) {
            return value;
        }
    }
}
exports.getUnitFromString = getUnitFromString;
//# sourceMappingURL=format.js.map