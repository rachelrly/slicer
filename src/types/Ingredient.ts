import { v4 as uuid } from 'uuid'

import { UnitType } from './Units'
import { Amount } from './amount'
import { IngredientName } from './ingredientName'
import { ERRORS } from './errors'
import { getUnitFromString } from '../utils/format'

export enum IngredientOptions {
  Amount = 'amount',
  Unit = 'unit',
  Ingredient = 'ingredient'
}

export class Ingredient {
  amount?: Amount
  unit?: UnitType
  ingredient?: IngredientName
  id: string
  active: 'none' | string
  // If locked === false, the changes in ingredient amount don't effect the recipe's scale
  locked: boolean

  constructor() {
    this.amount = new Amount()
    this.unit = undefined
    this.ingredient = new IngredientName()
    this.id = uuid()
    this.active = 'none'
    this.locked = true
  }

  sort(current: string): void {
    if (this.isDigit(current)) {
      if (Boolean(this.unit) || Boolean(this.ingredient.name)) {
        throw new Error(ERRORS.AMOUNT.HAS_DATA)
      } else {
        this.setAmount(current)
      }
    } else if (Boolean(this._getUnit(current))) {
      if (Boolean(this.ingredient.name)) {
        throw new Error(ERRORS.UNIT.HAS_DATA)
      } else if (Boolean(this.unit)) {
        throw new Error(ERRORS.UNIT.HAS_UNIT)
      } else {
        this.setUnit(this._getUnit(current))
      }
    } else {
      this.setIngredientName(current)
    }
  }

  /**
   * Methods to validate and set ingredient list
   */
  setAmount(current: string, replace = false) {
    this.amount.set(current, replace)
  }

  setUnit(unit: UnitType) {
    this.unit = unit
  }

  setIngredientName(current: string, replace = false) {
    this.ingredient.set(current, replace)
  }

  setActive(state: string) {
    if (this.active === state) this.active = 'none'
    else this.active = state
  }

  toggleLocked() {
    this.locked = !this.locked
  }

  validate(): boolean {
    // i.e. "1 cup rice", "1 egg"
    const validUnit = Boolean(this.unit) || this.unit === undefined
    if (
      Boolean(this.ingredient?.name) &&
      Boolean(this.amount?.amount) &&
      validUnit
    ) {
      return true
    } else return false
  }

  isDigit(word: string): boolean {
    const regex = /\d/
    return Boolean(word.match(regex))
  }

  // Not decalred as private for tests
  _getUnit(current: string): any {
    const compare = this._formatBeforeComparison(current)
    return getUnitFromString(compare)
  }

  private _formatBeforeComparison(current: string) {
    // When a unit only contains one character, this is often meaningful
    //  i.e. "T" is TABLESPOON and "t" is TEASPOON
    //  but "TABLESPOON" and "tablespoon" are both TABLESPOON
    const shouldChangeCase = current.length > 1
    const compare = shouldChangeCase ? current.toLowerCase() : current
    return compare
  }
}
