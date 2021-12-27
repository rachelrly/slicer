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
        console.log("------------------------------------------------------");
        console.log("THIS IS A NEW GODDAMN MOTHERFUCKING INGREDIENT");
        console.log("------------------------------------------------------");
        this.amount = new amount_1.Amount();
        this.unit = undefined;
        this.ingredient = new ingredientName_1.IngredientName();
    }
    Ingredient.prototype.sortCurrent = function (current) {
        console.log("SORTING THIS WORD FROM INGREDIENT CLASS", {
            amount: this.amount,
            unit: this.unit,
            ing: this.ingredient,
            current: current
        });
        if (this.isDigit(current)) {
            this.setAmount(current);
        }
        else if (Boolean(this._getUnit(current))) {
            var unit = this._getUnit(current);
            this.setUnit(unit);
        }
        else if (Boolean(current)) {
            this.setIngredientName(current);
        }
        else {
            throw new Error(errors_1.ERRORS.INGREDIENT.NO_VALID_PART);
        }
    };
    Ingredient.prototype.sortCurrentWord = function (current) {
        if (this.isDigit(current)) {
            this.setAmount(current);
        }
        else if (Boolean(this._getUnit(current))) {
            var unit = this._getUnit(current);
            this.setUnit(unit);
        }
        else if (Boolean(current)) {
            this.setIngredientName(current);
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
    Ingredient.prototype.validate = function () {
        var _a, _b;
        if (this.isCompleteIngredient())
            return true;
        else if (((_a = this.ingredient) === null || _a === void 0 ? void 0 : _a.name) && ((_b = this.amount) === null || _b === void 0 ? void 0 : _b.amount) && !this.unit) {
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
        var unit = (0, format_1.getUnitFromString)(compare);
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