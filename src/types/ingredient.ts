import { Units, UnitsType } from "./units";
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

// replace all instances of ml
// have isMl prop here readonly
export class Amount {
  ml: number;
  amount: number;

  toFloat(amount: string): number {
    // if is reg fraction
    const regex = /\//gi;
    const isPresent = regex.exec(amount);

    if (isPresent?.index) {
      return fractionToFloat(amount, isPresent?.index);
    } else {
      return Number(amount);
    }
    // if vulger fraction
    // convert to decimal
  }

  set(number: string) {
    const float = this.toFloat(number);
    this.ml = this.ml ? this.ml + float : float;
  }
}

class IngredientName {
  name: string;
  set(current: string) {
    if (!this.name) {
      this.name = current;
    } else {
      this.name += " " + current;
    }
  }
}

export class Ingredient {
  amount?: Amount;
  unit?: Unit;
  ingredient?: IngredientName;

  sort(current: string): void {
    if (this._isDigit(current)) {
      if (!this.amount) this.amount = new Amount();
      this.amount.set(current);
    } else if (this._isUnit(current)) {
      const lastIndex = current.length - 1;
      const last = current[lastIndex];
      if (last === ("s" || ".")) current = current.slice(0, lastIndex);
      this.unit = Units[current as UnitsType];
    } else {
      if (!this.ingredient) this.ingredient = new IngredientName();
      this.ingredient.set(current);
    }
  }

  isCompleteIngredient(): boolean {
    return Boolean(this.amount && this.unit && this.ingredient);
  }

  isValidIngredient(): boolean {
    // i.e. "1 cup rice", "1 egg", "salt"
    if (this.isCompleteIngredient()) return true;
    else if (this.ingredient && !this.amount && !this.unit) return true;
    else if (this.ingredient && this.amount && !this.unit) return true;
    else return false;
  }

  _isDigit(word: string): boolean {
    const regex = /\d/;
    return !!word.match(regex);
  }

  _isUnit(current: string): boolean {
    const lastIndex = current.length - 1;
    const last = current[lastIndex];

    // removes ending 's' or '.', i.e. "cups" or "tbsp."
    if (last === ("s" || ".")) current = current.slice(0, lastIndex);
    const isUnit = current in Units;
    return !!isUnit;
  }
}
