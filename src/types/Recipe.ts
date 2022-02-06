import { Ingredient } from './Ingredient'
import { ERRORS } from './errors'
import { makeIngredientArray, MAX_INPUT_LENGTH } from '../utils'
import { splitInput } from '../utils/string'

export class Recipe {
  input: string
  ingredients: Ingredient[] = []
  constant: number = 1
  standardUnitsOnly: boolean = true

  set(input: string) {
    try {
      const inputArr = splitInput(input)
      if (inputArr.length > MAX_INPUT_LENGTH) {
        throw new Error(ERRORS.BAD_INPUT_LENGTH)
      }
      if (input !== this.input) {
        const ingredients = makeIngredientArray(inputArr)
        this.input = input
        this.ingredients = ingredients
      }
    } catch (error) {
      throw new Error(
        `CATCHING FROM RECIPE.SET${ERRORS.BAD_INPUT}: ${error?.message}`
      )
    }
  }

  scale(constant: number) {
    try {
      this.ingredients.forEach((ingredient: Ingredient): void =>
        ingredient.scale(constant)
      )
      this.constant = constant
    } catch (error) {
      throw new Error(`${ERRORS.RECIPE_NOT_SCALED}: ${error?.message}`)
    }
  }
}
