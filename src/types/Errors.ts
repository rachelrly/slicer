export const ERRORS = {
  BAD_INPUT_LENGTH: 'This input is too long',
  BAD_INPUT: 'Unable to parse recipe input',
  RECIPE_NOT_SCALED: 'Unable to scale recipe',
  WORD_NOT_SORTED: 'Unable to sort current word',
  INGREDIENT: {
    NO_VALID_PART: 'Input is not a valid amount, unit, or ingredient name.'
  },
  UNIT: {
    UNREALISTIC_INPUT: 'Amounts over 20 gallons (xx ml) cannot be scaled.',
    HAS_DATA:
      'This ingredeient already has a ingredient name or unit. Units must be added before an ingredeint name.',
    HAS_UNIT:
      'This ingredient already has a unit. Units may not be overwritten.',
    NO_UNIT: 'No unit found for this amount input'
  },
  AMOUNT: {
    NEGATIVE_INPUT: 'Ingredients cannot have a negative amount.',
    ZERO_INPUT: "Ingredients with an amount of '0' are not scalable.",
    HAS_DATA:
      'This ingredeient already has a unit or ingredient name. Amounts must be added first.'
  },
  INPUT: {
    BAD_INPUT: 'This is not a valid input.'
  }
} as const
