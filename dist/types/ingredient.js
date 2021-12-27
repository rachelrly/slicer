"use strict";
exports.__esModule = true;
exports.Ingredient = exports.IngredientOptions = void 0;
var amount_1 = require("./amount");
var ingredientName_1 = require("./ingredientName");
var errors_1 = require("./errors");
var format_1 = require("../utils/format");
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
    Ingredient.prototype.sort = function (current) {
        if (this.isDigit(current)) {
            if (Boolean(this.unit) || Boolean(this.ingredient.name)) {
                throw new Error(errors_1.ERRORS.AMOUNT.HAS_DATA);
            }
            else {
                this.setAmount(current);
            }
        }
        else if (Boolean(this._getUnit(current))) {
            if (Boolean(this.ingredient.name)) {
                throw new Error(errors_1.ERRORS.UNIT.HAS_DATA);
            }
            else if (Boolean(this.unit)) {
                throw new Error(errors_1.ERRORS.UNIT.HAS_UNIT);
            }
            else {
                this.setUnit(this._getUnit(current));
            }
        }
        else {
            this.setIngredientName(current);
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
    Ingredient.prototype.validate = function () {
        var _a, _b;
        var validUnit = Boolean(this.unit) || this.unit === undefined;
        if (Boolean((_a = this.ingredient) === null || _a === void 0 ? void 0 : _a.name) &&
            Boolean((_b = this.amount) === null || _b === void 0 ? void 0 : _b.amount) &&
            validUnit) {
            return true;
        }
        else
            return false;
    };
    Ingredient.prototype.isDigit = function (word) {
        var regex = /\d/;
        return Boolean(word.match(regex));
    };
    Ingredient.prototype._getUnit = function (current) {
        var compare = this._formatBeforeComparison(current);
        return (0, format_1.getUnitFromString)(compare);
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