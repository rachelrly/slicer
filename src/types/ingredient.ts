import { Units, UnitsType } from "./units";
import { Errors } from "./errors";
import { fractionToFloat } from "../utils/format";

interface UnitName {
  long: string;
  short: string;
}

export interface Unit {
  readonly quantityInMl?: number;
  readonly name: UnitName;
  readonly isScalable: boolean;
}

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

  set(number: string) {
    const float: number = this.toFloat(number);
    const newAmount = this.amount + float;
    this.amount = newAmount;
  }
}

class IngredientName {
  name: string = "";
  set(current: string) {
    if (!this.name) {
      this.name = current;
    } else {
      this.name += " " + current;
    }
  }
}

export class Ingredient {
  amount? = new Amount();
  unit?: Unit = null;
  ingredient? = new IngredientName();

  sort(current: string): void {
    if (this._isDigit(current)) {
      if (this.unit || this.ingredient.name)
        throw new Error(Errors.AmountFullIngredient);
      else this.amount.set(current);
    } else if (this._isUnit(current)) {
      const lastIndex = current.length - 1;
      const lastChar = current[lastIndex];
      if (lastChar === ("s" || ".")) current = current.slice(0, lastIndex);
      this.unit = Units[current as UnitsType];
    } else {
      this.ingredient.set(current);
    }
  }

  isCompleteIngredient(): boolean {
    return Boolean(
      this.amount?.amount && this.unit && this.ingredient?.name?.length
    );
  }

  isValidIngredient(): boolean {
    // i.e. "1 cup rice", "1 egg", "salt"
    if (this.isCompleteIngredient()) return true;
    // TODO: add support for case with just ingredient name, i.e. salt
    else if (this.ingredient?.name && this.amount?.amount && !this.unit) {
      return true;
    } else return false;
  }

  _isDigit(word: string): boolean {
    const regex = /\d/;
    return !!word.match(regex);
  }

  _isUnit(current: string): boolean {
    // removes ending 's' or '.', i.e. "cups" or "tbsp."
    const lastIndex = current.length - 1;
    const last = current[lastIndex];
    if (last === ("s" || ".")) current = current.slice(0, lastIndex);

    const isUnit = Boolean(current in Units);
    return isUnit;
  }
}
