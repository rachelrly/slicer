"use strict";
exports.__esModule = true;
exports.parse = void 0;
var ingredient_1 = require("./ingredient");
var constants_1 = require("../utils/constants");
function parse(recipe) {
    var ingredients = [];
    var current = new ingredient_1.Ingredient();
    var next = new ingredient_1.Ingredient();
    function _addIngredient() {
        ingredients.push(current);
        current = new ingredient_1.Ingredient();
    }
    var rawWords = recipe.split(constants_1.BREAK_ON_CHAR);
    rawWords.forEach(function (word, i) {
        current.sortCurrent(word);
        var nextWord = i <= rawWords.length - 1 ? null : rawWords[i + 1];
        var nextIsDigit = Boolean(nextWord) && next.isDigit(nextWord);
        var nextIsUnit = false;
        if (nextIsDigit || nextIsUnit || !nextWord)
            _addIngredient();
    });
    return ingredients;
}
exports.parse = parse;
//# sourceMappingURL=parse.js.map