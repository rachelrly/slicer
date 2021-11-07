"use strict";
exports.__esModule = true;
exports.Ingredient = exports.Amount = void 0;
var units_1 = require("./units");
var format_1 = require("../utils/format");
var Amount = (function () {
    function Amount() {
    }
    Amount.prototype.toFloat = function (amount) {
        var regex = /\//ig;
        var isPresent = regex.exec(amount);
        if (isPresent === null || isPresent === void 0 ? void 0 : isPresent.index) {
            return (0, format_1.fractionToFloat)(amount, isPresent === null || isPresent === void 0 ? void 0 : isPresent.index);
        }
        else {
            return Number(amount);
        }
    };
    Amount.prototype.set = function (number) {
        var float = this.toFloat(number);
        this.ml = this.ml ? this.ml + float : float;
    };
    return Amount;
}());
exports.Amount = Amount;
var IngredientName = (function () {
    function IngredientName() {
    }
    IngredientName.prototype.set = function (current) {
        if (!this.name) {
            this.name = current;
        }
        else {
            this.name += ' ' + current;
        }
    };
    return IngredientName;
}());
var Ingredient = (function () {
    function Ingredient() {
    }
    Ingredient.prototype.sort = function (current) {
        if (this.currentIsDigit(current)) {
            if (!this.amount)
                this.amount = new Amount();
            this.amount.set(current);
        }
        else if (this.currentIsUnit(current)) {
            var lastIndex = current.length - 1;
            var last = current[lastIndex];
            if (last === ('s' || '.'))
                current = current.slice(0, lastIndex);
            this.unit = units_1.Units[current];
        }
        else {
            if (!this.ingredient)
                this.ingredient = new IngredientName;
            this.ingredient.set(current);
        }
    };
    Ingredient.prototype.isCompleteIngredient = function () {
        return !!(this.amount && this.unit && this.ingredient);
    };
    Ingredient.prototype.isValidIngredient = function () {
        if (this.isCompleteIngredient())
            return true;
        else if (this.ingredient && (!this.amount && !this.unit))
            return true;
        else if (this.ingredient && this.amount && !this.unit)
            return true;
        else
            return false;
    };
    Ingredient.prototype.currentIsDigit = function (word) {
        var regex = /\d/;
        return !!word.match(regex);
    };
    Ingredient.prototype.currentIsUnit = function (current) {
        var lastIndex = current.length - 1;
        var last = current[lastIndex];
        if (last === ('s' || '.'))
            current = current.slice(0, lastIndex);
        var isUnit = current in units_1.Units;
        return !!isUnit;
    };
    return Ingredient;
}());
exports.Ingredient = Ingredient;
//# sourceMappingURL=ingredient.js.map