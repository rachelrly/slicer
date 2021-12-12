"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
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
        var inputLength = input.length;
        for (var i = 0; i <= inputLength; i++) {
            if (_isEmptyChar(input[i]) || _isFinalChar(i, inputLength)) {
                if (Boolean(this.currentWord)) {
                    this.currentIngredient.sortCurrentWord(this.currentWord);
                    this.currentWord = "";
                    var isValid_1 = this.currentIngredient.isValidIngredient();
                    if (isValid_1) {
                        this._addToIngredients();
                    }
                }
            }
            else {
                this.currentWord += input[i];
            }
        }
        var isValid = this.currentIngredient.isValidIngredient();
        if (isValid) {
            this._addToIngredients();
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
        function _isFinalChar(index, inputLength) {
            return inputLength === index;
        }
    };
    Parser.prototype._addToIngredients = function () {
        this.ingredients = __spreadArray(__spreadArray([], this.ingredients, true), [this.currentIngredient], false);
        this.currentIngredient = new ingredient_1.Ingredient();
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map