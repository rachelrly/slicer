export enum Errors {
  UnitNoAmount = "A unit cannot be added to an ingredient that has no amount.",
  AmountFullIngredient = "An amount cannot be added to the total of an ingredient with other properties.",
  NewIngredient = "This property cannot be added to the current ingredient. Please create a new ingredient to add this property.",
}

export const ERRORS = {
  INGREDIENT: {
    NO_VALID_PART: "Input is not a valid amount, unit, or ingredient name.",
  },
} as const;
