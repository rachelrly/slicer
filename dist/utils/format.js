"use strict";
exports.__esModule = true;
exports.fractionToFloat = void 0;
function fractionToFloat(fraction, index) {
    var numerator = fraction.slice(0, index);
    var denominator = fraction.slice(index + 1);
    var total = Number(numerator) / Number(denominator);
    return total;
}
exports.fractionToFloat = fractionToFloat;
//# sourceMappingURL=format.js.map