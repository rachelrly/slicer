import { fractionToFloat } from '../utils'

export class Amount {
  amount: number = 0
  set(number: string, replace: boolean) {
    const float: number = this._toFloat(number)
    const newAmount = replace ? float : this.amount + float
    this.amount = newAmount
  }

  _toFloat(amount: string): number {
    const regex = /\//gi
    const regexData = regex.exec(amount)
    const isFraction = regexData?.index
    if (isFraction) {
      // sent to the util as a string
      return fractionToFloat(amount, regexData?.index)
    } else {
      return Number(amount)
    }
    // TODO: add support for formatted fracs here
  }
}
