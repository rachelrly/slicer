import { v4 as uuid } from 'uuid'

import { UnitType } from './units'
import {
  ERRORS,
  getUnitFromString,
  MAX_WORD_LENGTH,
  toNumber,
  isNumber,
  getUnitFromMl,
  getAmountInUnit,
  formatAmount
} from '../utils'

export interface IngredientDisplayType {
  amount: string
  unit: undefined | { long: string; short?: string }
  name: string
}

export class Ingredient {
  amount?: number
  unit?: UnitType
  name?: string
  id: string
  active: 'none' | string
  locked: boolean

  constructor() {
    this.amount = undefined
    this.unit = undefined
    this.name = ''
    this.id = uuid()
    this.active = 'none'
    this.locked = true
  }

  sort(current: string): void {
    if (current.length > MAX_WORD_LENGTH)
      throw new Error(ERRORS.BAD_INPUT_LENGTH)
    if (this._isAmount(current)) {
      this.setAmount(current, true)
    } else if (this._isUnit(current)) {
      if (!this.amount) {
        throw new Error(ERRORS.AMOUNT.HAS_DATA)
      }
      this.setUnit(current)
      if ('ml' in this.unit) {
        this.amount = this.amount * this.unit.ml.ml
      }
    } else {
      if (!this.amount) {
        throw new Error(ERRORS.UNIT.HAS_DATA)
      }
      this.setName(current, true)
    }
  }

  scale(constant: number) {
    if (this.locked === false) {
      return
    }
    const amount = (constant * this.amount).toString()
    this.setAmount(amount)
    if (this.unit && 'ml' in this.unit) {
      this.unit = getUnitFromMl(this.amount)
    }
  }

  _isAmount(current: string): boolean {
    return isNumber(current)
  }

  _isUnit(current: string): boolean {
    return Boolean(getUnitFromString(current))
  }

  setAmount(current: string, add = false) {
    const float: number = toNumber(current)
    if (add && Boolean(this.amount)) {
      this.amount += float
    } else {
      this.amount = float
    }
  }

  setNewAmount(amount: string) {
    console.log('ATTEMPTING TO SET NEW AMOUTN WITH', amount)
    const rollback = this.amount
    if (this._isAmount(amount)) {
      const num: number = toNumber(amount)
      if (this.unit && 'ml' in this.unit) {
        // Sets user provided amount as new amount
        console.log('BEFORE SET NEW AMOUNT')
        this.amount = num * this.unit.ml.ml
      } else {
        this.amount = num
      }
    } else {
      this.amount = rollback
      throw new Error(ERRORS.AMOUNT.INVALID)
    }
  }

  setUnit(unit: string) {
    this.unit = getUnitFromString(unit)
  }

  setName(current: string, concat = false) {
    if (concat && this.name !== '') {
      const newName = `${this.name} ${current}`
      this.name = newName
    } else {
      this.name = current
    }
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
    if (Boolean(this.name) && Boolean(this.amount)) {
      return true
    } else {
      return false
    }
  }

  displayAmount(format = true) {
    if (this.unit) {
      if ('ml' in this.unit) {
        return formatAmount(getAmountInUnit(this.amount, this.unit), format)
      }
    }
    return formatAmount(this.amount, format)
  }
}
