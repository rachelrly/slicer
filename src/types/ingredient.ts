import { UNIT_COMPARISON, UnitType } from "./units";
import { Amount } from "./amount";
import { IngredientName } from "./ingredientName";
import { ERRORS } from "./errors";
import { getUnitFromString } from "../utils/format";

export enum IngredientOptions {
  Amount = "amount",
  Unit = "unit",
  Ingredient = "ingredient",
}

export class Ingredient {
  amount? = new Amount();
  unit?: UnitType = undefined;
  ingredient? = new IngredientName();

  sortCurrentWord(current: string): void {
    if (this._isDigit(current)) {
      // console.log("SETTING THIS AS DIGIT", current);
      this.setAmount(current);
      // console.log("THIS IS THE AMOUNT AFTER SET", this.amount);
    } else if (Boolean(this._getUnit(current))) {
      // console.log("SETTING THIS AS UNIT", current);
      const unit = this._getUnit(current);
      this.setUnit(unit);
      // console.log("THIS IS THE UNIT AFTER SET", this.unit);
    } else if (Boolean(current)) {
      // Prevents undefined from being set as ingredient.
      // This shouldn't be happening in the first place.
      // Remove bool check when fixed
      this.setIngredientName(current);
      // console.log(
      //   "THIS IS THE INGREDIENT NAME AFTER SET",
      //   this.ingredient.name
      // );
    } else {
      // We do not actually want to throw here
      // this is temporary until error handling is proper
      throw new Error(ERRORS.INGREDIENT.NO_VALID_PART);
    }
  }

  scale(constant: number) {
    // currently scales amount only
    const unitMl = this.unit.mlInUnit;
    const base = this.amount.amount * unitMl;
    const scaled = this.amount.amount * constant;
    const newAmount = scaled / base;
    this.setAmount(newAmount.toString());
    // how to scale unit??
    // new quantity in ml
    // what qualifies as a switch?
  }

  /**
   * Methods to validate and set ingredient list
   */
  setAmount(current: string) {
    this.amount.set(current);
  }

  setUnit(unit: UnitType) {
    this.unit = unit;
  }

  setIngredientName(current: string) {
    this.ingredient.set(current);
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

  private _isDigit(word: string): boolean {
    const regex = /\d/;
    return Boolean(word.match(regex));
  }

  // Not decalred as private for tests
  _getUnit(current: string): any {
    // TODO: Handle Set Type
    const compare = this._formatBeforeComparison(current);
    const unit = getUnitFromString(compare);
    console.log("THIS IS MY UNIT", unit);
    return unit;
  }

  private _formatBeforeComparison(current: string) {
    // When a unit only contains one character, this is often meaningful
    // i.e. "T" is TABLESPOON and "t" is TEASPOON
    // but "TABLESPOON" and "tablespoon" are both TABLESPOON
    const shouldChangeCase = current.length > 1;
    const compare = shouldChangeCase ? current.toLowerCase() : current;
    return compare;
  }
}
