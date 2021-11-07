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

  sort(current: string): boolean {
    //if it already has ingredient and amount
    // if only amount or no amount, add to amount
    // if amount and no unit, validate unit then ingredient
    // if unit and mount, no need to validate
    // just add as ingredient
    const shouldTryAmount = !this.unit;
    const shouldTryUnit = !this.ingredient.name;
    if (shouldTryAmount){
        const isValid = validateAsAmount()
        if (isValid)
    }
    if () {

      return true; // should validate ingredient
    } else if (this._isUnit(current)) {
      // if there already is an ingredient, this is a new ingredient??? sort prev??

      this.unit = Units[current as UnitsType];
      return false; //FOR TESTING
    } else {
      return false; //FOR TESTING
    }

    function validateAndSet(validate: ()=>boolean, set: ()=>void, next?: ()=>void){
        const isValid = validate()
        if (isValid) set()
        else if (Boolean(next)) next()
    }

    function validateAsAmount():boolean{
        return this._isDigit(current)
    }

    function setAmount():void {
        this.amount.set(current);
    }

    function validateAsUnit(){
        const lastIndex = current.length - 1;
        const last = current[lastIndex];
        if (last === ("s" || ".")) current = current.slice(0, lastIndex);
    }

    function setUnit(){
        this.unit = Units[current as UnitsType];
    }

    function setIngredient(){
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
      console.log("HAS INGREDIENT AND NO UNIT, RETURNING TRUE");
      return true;
    } else return false;
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
    if (!this.amount.amount)
      throw new Error("Ingredient Error: " + Errors.UnitNoAmount);
    else return !!isUnit;
  }
}
