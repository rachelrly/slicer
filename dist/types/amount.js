"use strict";
exports.__esModule = true;
exports.Amount = void 0;
var format_1 = require("../utils/format");
var Amount = (function () {
    function Amount() {
        this.amount = 0;
    }
    Amount.prototype.toFloat = function (amount) {
        var regex = /\//gi;
        var hasSlash = regex.exec(amount);
        if (hasSlash === null || hasSlash === void 0 ? void 0 : hasSlash.index) {
            return (0, format_1.fractionToFloat)(amount, hasSlash === null || hasSlash === void 0 ? void 0 : hasSlash.index);
        }
        else {
            return Number(amount);
        }
    };
    Amount.prototype.set = function (number) {
        var float = this.toFloat(number);
        var newAmount = this.amount + float;
        this.amount = newAmount;
    };
    return Amount;
}());
exports.Amount = Amount;
//# sourceMappingURL=amount.js.map