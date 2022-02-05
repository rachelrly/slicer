import { Ingredient } from './Ingredient'
import { UnitType } from './Units'

import { parse, getUnitFromMl } from '../utils'

export class Recipe {
  input: string
  ingredients: Ingredient[] = []
  constant: number = 1
  // TODO: If ingredient[any].unit.standard === false, set this to false
  standardUnitsOnly: boolean = true

  setConstant(constant: number) {
    if (constant !== this.constant) {
      this.constant = constant
      this._scaleRecipe()
    }
  }

  setInput(input: string) {
    if (input !== this.input) {
      this.ingredients = parse(input)
      this.input = input
    }
  }

  private _scaleRecipe() {
    const scaledRecipe = this.ingredients.map(
      (ingredient: Ingredient): Ingredient => {
        const amountConstantProduct = ingredient.amount.amount * this.constant
        // This should not happen with the current algo
        //  since an ingredient needs a name and amount to be valid
        if (!ingredient?.amount?.amount) return ingredient
        // Locked ingredients do not scale
        if (ingredient.locked === false) return ingredient
        // No unit or unit does not scale, i.e. 'lb'
        if (!ingredient?.unit || !ingredient.unit?.mlInUnit) {
          ingredient.setAmount(`${amountConstantProduct}`, true)
          return ingredient
        }
        const totalMl =
          this.constant * ingredient.amount.amount * ingredient.unit.mlInUnit
        const newUnit: UnitType = getUnitFromMl(totalMl, this.standardUnitsOnly)
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
}
