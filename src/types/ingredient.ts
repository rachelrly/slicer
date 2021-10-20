import { Units, UnitsType } from "./units";
import { fractionToFloat } from "../utils/format";
//TODO: Make constructor so you don't have to keep instantiating if not there

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
  amount: number = 0;

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
      this.amount.set(current);
    } else if (this._isUnit(current)) {
      const lastIndex = current.length - 1;
      const last = current[lastIndex];
      if (last === ("s" || ".")) current = current.slice(0, lastIndex);
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
    // else if (this.ingredient && !this.amount && !this.unit) return true;
    else if (this.ingredient?.name && this.amount?.amount && !this.unit)
      return true;
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
