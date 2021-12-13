"use strict";
exports.__esModule = true;
exports.Recipe = void 0;
var parser_1 = require("./parser");
var format_1 = require("../utils/format");
var Recipe = (function () {
    function Recipe() {
        this.recipe = [];
        this.scaledRecipe = [];
        this.constant = 1;
    }
    Recipe.prototype.setInput = function (input) {
        this.input = input;
        this._parseInput();
    };
    Recipe.prototype.setConstant = function (constant) {
        this.constant = constant;
    };
    Recipe.prototype._parseInput = function () {
        var parser = new parser_1.Parser();
        parser.parseRecipe(this.input);
        this.recipe = parser.ingredients;
    };
    Recipe.prototype.scaleRecipe = function () {
        var _this = this;
        var scaledRecipe = this.recipe.map(function (ingredient) {
            var _a, _b, _c;
            var noScalableUnit = !(ingredient === null || ingredient === void 0 ? void 0 : ingredient.unit) || !((_a = ingredient === null || ingredient === void 0 ? void 0 : ingredient.unit) === null || _a === void 0 ? void 0 : _a.mlInUnit);
            var ingredientNameOnly = !((_b = ingredient === null || ingredient === void 0 ? void 0 : ingredient.amount) === null || _b === void 0 ? void 0 : _b.amount);
            if (ingredientNameOnly)
                return ingredient;
            if (noScalableUnit) {
                var newAmount_1 = _this._scaleAmountByConstant((_c = ingredient === null || ingredient === void 0 ? void 0 : ingredient.amount) === null || _c === void 0 ? void 0 : _c.amount, _this.constant);
                ingredient.setAmount(newAmount_1);
                return ingredient;
            }
            var newAmountInMl = ingredient.amount.amount * ingredient.unit.mlInUnit * _this.constant;
            var newUnit = (0, format_1.getUnitFromMl)(newAmountInMl);
            var newAmount = _this._getAmountForCurrentUnit(newAmountInMl, newUnit.mlInUnit);
            ingredient.setAmount(newAmount);
            ingredient.setUnit(newUnit);
            return ingredient;
        });
        this.scaledRecipe = scaledRecipe;
    };
    Recipe.prototype._getAmountForCurrentUnit = function (amountInMl, mlPerUnit) {
        var value = amountInMl / mlPerUnit;
        var roundedValue = Number(value.toFixed(2));
        return roundedValue.toString();
    };
    Recipe.prototype._scaleAmountByConstant = function (amount, constant) {
        var product = amount * constant;
        return product.toString();
    };
    return Recipe;
}());
exports.Recipe = Recipe;
//# sourceMappingURL=recipe.js.map