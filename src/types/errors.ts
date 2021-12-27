export enum Errors {
  UnitNoAmount = "A unit cannot be added to an ingredient that has no amount.",
  AmountFullIngredient = "An amount cannot be added to the total of an ingredient with other properties.",
  NewIngredient = "This property cannot be added to the current ingredient. Please create a new ingredient to add this property.",
}

export const ERRORS = {
  INGREDIENT: {
    NO_VALID_PART: "Input is not a valid amount, unit, or ingredient name.",
  },
  UNIT: {
    UNREALISTIC_INPUT: "Amounts over 20 gallons (xx ml) cannot be scaled.",
  },
  AMOUNT: {
    NEGATIVE_INPUT: "Ingredients cannot have a negative amount.",
    ZERO_INPUT: "Ingredients with an amount of '0' are not scalable.",
  },
  PARSE: {
    HAS_DATA: "This ingredeient has data. Please make a new ingredient.",
  },
} as const;
