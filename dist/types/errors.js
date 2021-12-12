"use strict";
exports.__esModule = true;
exports.ERRORS = exports.Errors = void 0;
var Errors;
(function (Errors) {
    Errors["UnitNoAmount"] = "A unit cannot be added to an ingredient that has no amount.";
    Errors["AmountFullIngredient"] = "An amount cannot be added to the total of an ingredient with other properties.";
    Errors["NewIngredient"] = "This property cannot be added to the current ingredient. Please create a new ingredient to add this property.";
})(Errors = exports.Errors || (exports.Errors = {}));
exports.ERRORS = {
    INGREDIENT: {
        NO_VALID_PART: "Input is not a valid amount, unit, or ingredient name."
    },
    UNIT: {
        UNREALISTIC_INPUT: "Amounts over 20 gallons (xx ml) cannot be scaled."
    },
    AMOUNT: {
        NEGATIVE_INPUT: "Ingredients cannot have a negative amount.",
        ZERO_INPUT: "Ingredients with an amount of '0' are not scalable."
    }
};
//# sourceMappingURL=errors.js.map