"use strict";
exports.__esModule = true;
exports.Ingredient = exports.IngredientOptions = void 0;
var units_1 = require("./units");
var amount_1 = require("./amount");
var ingredientName_1 = require("./ingredientName");
var IngredientOptions;
(function (IngredientOptions) {
    IngredientOptions["Amount"] = "amount";
    IngredientOptions["Unit"] = "unit";
    IngredientOptions["Ingredient"] = "ingredient";
})(IngredientOptions = exports.IngredientOptions || (exports.IngredientOptions = {}));
var Ingredient = (function () {
    function Ingredient() {
        this.amount = new amount_1.Amount();
        this.unit = null;
        this.ingredient = new ingredientName_1.IngredientName();
    }
    Ingredient.prototype.sort = function (current) {
        if (this._isDigit(current)) {
            return IngredientOptions.Amount;
        }
        else if (this._isUnit(current)) {
            return IngredientOptions.Unit;
        }
        else if (Boolean(current)) {
            return IngredientOptions.Ingredient;
        }
        else
            return IngredientOptions.Ingredient;
    };
    Ingredient.prototype.setAmount = function (current) {
        this.amount.set(current);
    };
    Ingredient.prototype.setUnit = function (current) {
        var lastIndex = current.length - 1;
        var lastChar = current[lastIndex];
        if (lastChar === ("s" || "."))
            current = current.slice(0, lastIndex);
        this.unit = units_1.Units[current];
    };
    Ingredient.prototype.setIngredient = function (current) {
        this.ingredient.set(current);
    };
    Ingredient.prototype.isCompleteIngredient = function () {
        var _a, _b, _c;
        return Boolean(((_a = this.amount) === null || _a === void 0 ? void 0 : _a.amount) && this.unit && ((_c = (_b = this.ingredient) === null || _b === void 0 ? void 0 : _b.name) === null || _c === void 0 ? void 0 : _c.length));
    };
    Ingredient.prototype.isValidIngredient = function () {
        var _a, _b;
        if (this.isCompleteIngredient())
            return true;
        else if (((_a = this.ingredient) === null || _a === void 0 ? void 0 : _a.name) && ((_b = this.amount) === null || _b === void 0 ? void 0 : _b.amount) && !this.unit) {
            return true;
        }
        else
            return false;
    };
    Ingredient.prototype._isDigit = function (word) {
        var regex = /\d/;
        return !!word.match(regex);
    };
    Ingredient.prototype._isUnit = function (current) {
        var lastIndex = current.length - 1;
        var last = current[lastIndex];
        var isDiscardChar = last === "s" || last === ".";
        if (isDiscardChar)
            current = current.slice(0, lastIndex);
        var isUnit = Boolean(current in units_1.Units);
        return isUnit;
    };
    return Ingredient;
}());
exports.Ingredient = Ingredient;
//# sourceMappingURL=ingredient.js.map