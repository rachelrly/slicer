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
    }
    Parser.prototype.parse = function (input) {
        var emptyChar = ' ' || '\n' || '-';
        var i = 0;
        for (i = 0; i <= input.length; i++) {
            if (input[i] == emptyChar) {
                if (!this.currentIngredient)
                    this.currentIngredient = new ingredient_1.Ingredient();
                this.currentIngredient.sort(this.currentWord);
                this.currentWord = '';
                this.addCurrentToIngredients();
            }
            else {
                this.currentWord += input[i];
            }
        }
        if (this.currentIngredient)
            this.addCurrentToIngredients();
    };
    Parser.prototype.addCurrentToIngredients = function () {
        if (!this.ingredients)
            this.ingredients = [];
        if (this.currentIngredient.isValidIngredient()) {
            this.ingredients = __spreadArray(__spreadArray([], this.ingredients, true), [this.currentIngredient], false);
            this.currentIngredient = new ingredient_1.Ingredient;
        }
    };
    return Parser;
}());
exports.Parser = Parser;
