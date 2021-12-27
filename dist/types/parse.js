"use strict";
exports.__esModule = true;
exports.parse = void 0;
var ingredient_1 = require("./ingredient");
var constants_1 = require("../utils/constants");
function parse(recipe) {
    var ingredients = [];
    var current = new ingredient_1.Ingredient();
    function _addIngredient() {
        if (current.validate()) {
            console.log("ADDING VALID INGREDIENT TO ARRAY", current);
            ingredients.push(current);
            console.log("I ADDED TO INGREDIENTS", ingredients);
            current = new ingredient_1.Ingredient();
            console.log("AFTER ADDING NEW THIS IS INGREDIENT", ingredients);
        }
    }
    var rawWords = recipe.split(constants_1.BREAK_ON_CHAR);
    rawWords.forEach(function (word, i) {
        if (word === "")
            return;
        current.sortCurrent(word);
        var nextWord = i + 2 === rawWords.length ? null : rawWords[i + 1];
        var nextIsDigit = Boolean(nextWord) && current.isDigit(nextWord);
        if (nextIsDigit || nextWord === null) {
            _addIngredient();
        }
    });
    return ingredients;
}
exports.parse = parse;
//# sourceMappingURL=parse.js.map