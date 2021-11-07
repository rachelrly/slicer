"use strict";
exports.__esModule = true;
exports.IngredientName = void 0;
var IngredientName = (function () {
    function IngredientName() {
        this.name = "";
    }
    IngredientName.prototype.set = function (current) {
        if (!this.name) {
            this.name = current;
        }
        else {
            this.name += " " + current;
        }
    };
    return IngredientName;
}());
exports.IngredientName = IngredientName;
//# sourceMappingURL=ingredientName.js.map