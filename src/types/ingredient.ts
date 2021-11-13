import { Units, Unit, UnitsType } from "./units";
import { Amount } from "./amount";
import { IngredientName } from "./ingredientName";

export enum IngredientOptions {
  Amount = "amount",
  Unit = "unit",
  Ingredient = "ingredient",
}

export class Ingredient {
  amount? = new Amount();
  unit?: Unit = null;
  ingredient? = new IngredientName();

  sort(current: string): IngredientOptions {
    if (this._isDigit(current)) {
      return IngredientOptions.Amount;
    } else if (this._isUnit(current)) {
      return IngredientOptions.Unit;
    } else if (Boolean(current)) {
      // stops undefined
      return IngredientOptions.Ingredient;
    } else return IngredientOptions.Ingredient;
  }

  /**
   * Methods to validate and set ingredient list
   */
  setAmount(current: string, parser = false) {
    this.amount.set(current, parser);
  }

  setUnit(current: string) {
    const lastIndex = current.length - 1;
    const lastChar = current[lastIndex];
    if (lastChar === ("s" || ".")) current = current.slice(0, lastIndex);
    this.unit = Units[current as UnitsType];
  }

  setIngredient(current: string) {
    this.ingredient.set(current);
  }

  scale(constant: number) {
    // currently scales amount only
    const unitMl = this.unit.quantityInMl;
    const base = this.amount.amount * unitMl;
    const scaled = this.amount.amount * constant;
    const newAmount = scaled / base;
    this.setAmount(newAmount.toString());
    // how to scale unit??
    // new quantity in ml
    // what qualifies as a switch?
  }

  isCompleteIngredient(): boolean {
    return Boolean(
      this.amount?.amount && this.unit && this.ingredient?.name?.length
    );
  }

  isValidIngredient(): boolean {
    // i.e. "1 cup rice", "1 egg"
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
    const isDiscardChar = last === "s" || last === ".";
    if (isDiscardChar) current = current.slice(0, lastIndex);

    const isUnit = Boolean(current in Units);
    return isUnit;
  }
}
