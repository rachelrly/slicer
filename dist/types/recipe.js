"use strict";
exports.__esModule = true;
exports.Recipe = void 0;
var parser_1 = require("./parser");
var Recipe = (function () {
    function Recipe() {
        this.recipe = [];
        this.scaledRecipe = [];
    }
    Recipe.prototype.parseInput = function () {
        var parser = new parser_1.Parser();
        parser.parse(this.input);
        this.recipe = parser.ingredients;
    };
    Recipe.prototype.scaleRecipe = function () { };
    return Recipe;
}());
exports.Recipe = Recipe;
//# sourceMappingURL=recipe.js.map