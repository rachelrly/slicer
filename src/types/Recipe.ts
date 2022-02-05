import { Ingredient } from './Ingredient'
import { UnitType } from './Units'

import { parse, getUnitFromMl } from '../utils'

export class Recipe {
  input: string
  ingredients: Ingredient[] = []
  constant: number = 1

  setConstant(constant: number) {
    if (constant !== this.constant) {
      this.constant = constant
      this.scaleRecipe()
    }
  }

  setInput(input: string) {
    this.ingredients = parse(input)
    this.input = input
  }

  scaleRecipe() {
    const scaledRecipe = this.ingredients.map(
      (ingredient: Ingredient): Ingredient => {
        const amountConstantProduct = ingredient.amount.amount * this.constant
        // This should not happen with the current algo
        //  since an ingredient needs a name and amount to be valid
        if (!ingredient?.amount?.amount) return ingredient
        // No unit or unit does not scale, i.e. 'lb'
        if (!ingredient?.unit || !ingredient.unit?.mlInUnit) {
          ingredient.setAmount(`${amountConstantProduct}`, true)
          return ingredient
        }
        const totalMl =
          this.constant * ingredient.amount.amount * ingredient.unit.mlInUnit
        const newUnit: UnitType = getUnitFromMl(totalMl)
        // If units are the same, do no further calculations
        if (newUnit === ingredient.unit) {
          ingredient.setAmount(`${amountConstantProduct}`, true)
          return ingredient
        }
        const scaledAmount = totalMl / newUnit.mlInUnit
        ingredient.setUnit(newUnit)
        ingredient.setAmount(`${scaledAmount}`, true)
        return ingredient
      }
    )
    this.ingredients = scaledRecipe
  }

  _getAmountForCurrentUnit(amountInMl: number, mlPerUnit: number) {
    const value = amountInMl / mlPerUnit
    const roundedValue = Number(value.toFixed(2))
    // Turns to string because Amount.set takes in string
    return roundedValue.toString()
  }
}
