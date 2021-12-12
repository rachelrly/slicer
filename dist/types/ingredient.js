"use strict";
exports.__esModule = true;
exports.Ingredient = exports.IngredientOptions = void 0;
var units_1 = require("./units");
var amount_1 = require("./amount");
var ingredientName_1 = require("./ingredientName");
var errors_1 = require("./errors");
var IngredientOptions;
(function (IngredientOptions) {
    IngredientOptions["Amount"] = "amount";
    IngredientOptions["Unit"] = "unit";
    IngredientOptions["Ingredient"] = "ingredient";
})(IngredientOptions = exports.IngredientOptions || (exports.IngredientOptions = {}));
var Ingredient = (function () {
    function Ingredient() {
        this.amount = new amount_1.Amount();
        this.unit = undefined;
        this.ingredient = new ingredientName_1.IngredientName();
    }
    Ingredient.prototype.sortCurrentWord = function (current) {
        if (this._isDigit(current)) {
            console.log("SETTING THIS AS DIGIT", current);
            this.setAmount(current);
            console.log("THIS IS THE AMOUNT AFTER SET", this.amount);
        }
        else if (Boolean(this._getUnit(current))) {
            console.log("SETTING THIS AS UNIT", current);
            var unit = this._getUnit(current);
            this.setUnit(unit);
            console.log("THIS IS THE UNIT AFTER SET", this.unit);
        }
        else if (Boolean(current)) {
            this.setIngredientName(current);
            console.log("THIS IS THE INGREDIENT NAME AFTER SET", this.ingredient.name);
        }
        else {
            throw new Error(errors_1.ERRORS.INGREDIENT.NO_VALID_PART);
        }
    };
    Ingredient.prototype.scale = function (constant) {
        var unitMl = this.unit.mlInUnit;
        var base = this.amount.amount * unitMl;
        var scaled = this.amount.amount * constant;
        var newAmount = scaled / base;
        this.setAmount(newAmount.toString());
    };
    Ingredient.prototype.setAmount = function (current) {
        this.amount.set(current);
    };
    Ingredient.prototype.setUnit = function (unit) {
        this.unit = unit;
    };
    Ingredient.prototype.setIngredientName = function (current) {
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
        return Boolean(word.match(regex));
    };
    Ingredient.prototype._getUnit = function (current) {
        var compare = this._formatBeforeComparison(current);
        var unit = units_1.UNIT_COMPARISON.has(function (key) { return key.contains(compare); });
        return unit;
    };
    Ingredient.prototype._formatBeforeComparison = function (current) {
        var shouldChangeCase = current.length > 1;
        var compare = shouldChangeCase ? current.toLowerCase() : current;
        return compare;
    };
    return Ingredient;
}());
exports.Ingredient = Ingredient;
//# sourceMappingURL=ingredient.js.map