"use strict";
exports.__esModule = true;
exports.Parser = void 0;
var ingredient_1 = require("./ingredient");
var Parser = (function () {
    function Parser() {
        this.ingredients = [];
        this.currentIngredient = new ingredient_1.Ingredient();
        this.currentWord = "";
    }
    Parser.prototype.parseRecipe = function (input) {
        for (var i = 0; i <= input.length; i++) {
            if (_isEmptyChar(input[i]) || _isFinalChar(i)) {
                if (Boolean(this.currentWord)) {
                    this.currentIngredient.sortCurrentWord(this.currentWord);
                    this.currentWord = "";
                }
            }
            else {
                this.currentWord += input[i];
            }
        }
        function _isEmptyChar(char) {
            if (char == " ")
                return true;
            if (char === "\n")
                return true;
            if (char === "-")
                return true;
            return false;
        }
        function _isFinalChar(index) {
            var isFinal = input.length === index;
            return isFinal;
        }
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map