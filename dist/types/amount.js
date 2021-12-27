"use strict";
exports.__esModule = true;
exports.Amount = void 0;
var format_1 = require("../utils/format");
var Amount = (function () {
    function Amount() {
        this.amount = 0;
    }
    Amount.prototype.set = function (number) {
        var float = this._toFloat(number);
        var newAmount = this.amount + float;
        this.amount = newAmount;
    };
    Amount.prototype._toFloat = function (amount) {
        var regex = /\//gi;
        var regexData = regex.exec(amount);
        var isFraction = regexData === null || regexData === void 0 ? void 0 : regexData.index;
        if (isFraction) {
            return (0, format_1.fractionToFloat)(amount, regexData === null || regexData === void 0 ? void 0 : regexData.index);
        }
        else {
            return Number(amount);
        }
    };
    return Amount;
}());
exports.Amount = Amount;
//# sourceMappingURL=amount.js.map