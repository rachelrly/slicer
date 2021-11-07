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
    Parser.prototype.parse = function (input) {
        for (var i = 0; i <= input.length; i++) {
            if (_isEmptyChar(input[i]) || _isFinalChar(i)) {
                if (this.currentWord) {
                    this.currentIngredient.sort(this.currentWord);
                    this.currentWord = "";
                }
            }
            else {
                this.currentWord += input[i];
            }
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
        function _isFinalChar(index) {
            var isFinal = input.length === index;
            return isFinal;
        }
    };
    Parser.prototype._addToIngredients = function () {
        var isValidIngredient = this.currentIngredient.isValidIngredient();
        if (isValidIngredient) {
            this.ingredients = __spreadArray(__spreadArray([], this.ingredients, true), [this.currentIngredient], false);
            this.currentIngredient = new ingredient_1.Ingredient();
        }
    };
    return Parser;
}());
exports.Parser = Parser;
//# sourceMappingURL=parser.js.map