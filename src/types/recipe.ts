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
        // This should not happen with the current algo
        //  since an ingredient needs a name and amount to be valid
        if (!ingredient?.amount?.amount) return ingredient
        const newAmount = this._scaleAmountByConstant(
          ingredient?.amount?.amount,
          this.constant
        )
        ingredient.setAmount(newAmount, true)
        // No unit or unit does not scale, i.e. 'lb'
        if (!ingredient?.unit || !ingredient?.unit?.mlInUnit) return ingredient
        const totalMl: number =
          ingredient.amount.amount * ingredient.unit.mlInUnit * this.constant
        const newUnit: UnitType = getUnitFromMl(totalMl)
        console.log('SETTING UNIT FROM ', { newUnit, oldUnit: ingredient.unit })
        console.log('THESE ARE AMOUNT VALS', {
          ingredient: ingredient.amount.amount,
          totalMl
        })
        ingredient.setUnit(newUnit)
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

  _scaleAmountByConstant(amount: number, constant: number) {
    const product = amount * constant
    return product.toString()
  }
}
