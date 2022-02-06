import { v4 as uuid } from 'uuid'

import { UnitType } from './units'
import { Amount } from './amount'
import { ERRORS } from './errors'
import { getUnitFromMl, getUnitFromString, MAX_WORD_LENGTH } from '../utils'

export class Ingredient {
  amount?: Amount
  unit?: UnitType
  name?: string
  id: string
  active: 'none' | string
  locked: boolean

  constructor() {
    this.amount = new Amount()
    this.unit = undefined
    this.name = ''
    this.id = uuid()
    this.active = 'none'
    this.locked = true
  }

  sort(current: string): void {
    if (current.length > MAX_WORD_LENGTH)
      throw new Error(ERRORS.BAD_INPUT_LENGTH)
    // Removes most special characters
    if (this.isAmount(current)) {
      this.setAmount(current, true)
    } else if (this._isUnit(current)) {
      if (!this.amount.base) {
        throw new Error(ERRORS.AMOUNT.HAS_DATA)
      }
      this.setUnit(current)
      if ('ml' in this.unit) {
        this.amount.setIsMl()
      }
    } else {
      if (!this.amount.base) {
        throw new Error(ERRORS.UNIT.HAS_DATA)
      }
      this.setName(current, true)
    }
  }

  scale(constant: number) {
    if (this.locked === false) {
      return
    } else if (Boolean(this.unit) && 'ml' in this.unit) {
      const amount = constant * this.amount.base
      this.unit = getUnitFromMl(amount)
      this.setAmount(amount.toString())
    } else {
      const amount = (constant * this.amount.base).toString()
      this.setAmount(amount)
    }
  }

  isAmount(current: string): boolean {
    const regex = /\d/
    // Used externally for next word validation
    return Boolean(current.match(regex))
  }

  setAmount(current: string, add = false) {
    this.amount.set(current, add)
  }

  _isUnit(current: string): boolean {
    return Boolean(getUnitFromString(current))
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
    if (Boolean(this.name) && Boolean(this.amount.base)) {
      return true
    } else return false
  }
}
