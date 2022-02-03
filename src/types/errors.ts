export enum Errors {
  UnitNoAmount = 'A unit cannot be added to an ingredient that has no amount.',
  AmountFullIngredient = 'An amount cannot be added to the total of an ingredient with other properties.',
  NewIngredient = 'This property cannot be added to the current ingredient. Please create a new ingredient to add this property.'
}

export const ERRORS = {
  INGREDIENT: {
    NO_VALID_PART: 'Input is not a valid amount, unit, or ingredient name.'
  },
  UNIT: {
    UNREALISTIC_INPUT: 'Amounts over 20 gallons (xx ml) cannot be scaled.',
    HAS_DATA:
      'This ingredeient already has a ingredient name or unit. Units must be added before an ingredeint name.',
    HAS_UNIT:
      'This ingredient already has a unit. Units may not be overwritten.'
  },
  AMOUNT: {
    NEGATIVE_INPUT: 'Ingredients cannot have a negative amount.',
    ZERO_INPUT: "Ingredients with an amount of '0' are not scalable.",
    HAS_DATA:
      'This ingredeient already has a unit or ingredient name. Amounts must be added first.'
  }
} as const
