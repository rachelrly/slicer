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
        parser.parse(this.input);
        this.recipe = parser.ingredients;
    };
    Recipe.prototype.scaleRecipe = function () {
        var _this = this;
        var scaledRecipe = this.recipe.map(function (ingredient) {
            var newAmountInMl = ingredient.amount.amount *
                ingredient.unit.quantityInMl *
                _this.constant;
            var newUnit = (0, format_1.getUnitFromMl)(newAmountInMl);
            var newAmountInUnit = newAmountInMl / newUnit.quantityInMl;
            ingredient.setAmount(newAmountInUnit.toString());
            ingredient.setUnit(newUnit.name.long);
            return ingredient;
        });
        this.scaledRecipe = scaledRecipe;
    };
    return Recipe;
}());
exports.Recipe = Recipe;
//# sourceMappingURL=recipe.js.map