import { toNumber } from '../utils'

export class Amount {
  base: number = 0
  isMl?: boolean = false

  set(number: string, add = false) {
    const float: number = toNumber(number)
    const newAmount = add ? this.base + float : float
    this.base = newAmount
  }

  scale() {}

  setIsMl() {
    if (!this.isMl) this.isMl = true
  }
}
