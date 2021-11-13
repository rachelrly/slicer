import { fractionToFloat } from "../utils/format";

export class Amount {
  amount: number = 0;

  toFloat(amount: string): number {
    const regex = /\//gi;
    const hasSlash = regex.exec(amount); // is a fraction

    if (hasSlash?.index) {
      return fractionToFloat(amount, hasSlash?.index);
    } else {
      return Number(amount);
    }
    // TODO: add support for formatted fracs here
  }

  set(number: string, _parser: boolean) {
    const float: number = _parser ? this.toFloat(number) : Number(number);
    const newAmount = this.amount + float;
    this.amount = newAmount;
  }
}
