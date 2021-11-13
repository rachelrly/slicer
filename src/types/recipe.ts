import { Ingredient } from "./ingredient";
import { Parser } from "./parser";
import { getUnitFromMl } from "../utils/format";
import { Unit } from "./units";
// holds input
// controls scaling function
//

export class Recipe {
  input: string; //instantiate when created
  recipe: Ingredient[] = [];
  scaledRecipe: Ingredient[] = [];
  constant: number = 1;

  //todo: call scale recupe when input is created
  setInput(input: string) {
    this.input = input;
    this._parseInput();
  }

  setConstant(constant: number) {
    this.constant = constant;
  }

  _parseInput() {
    const parser = new Parser();
    parser.parse(this.input);
    this.recipe = parser.ingredients;
  }

  scaleRecipe() {
    const scaledRecipe = this.recipe.map(
      (ingredient: Ingredient): Ingredient => {
        const noScalableUnit =
          !ingredient?.unit || !ingredient?.unit?.quantityInMl;
        const ingredientNameOnly = !ingredient?.amount?.amount;
        if (ingredientNameOnly) return ingredient;
        if (noScalableUnit) {
          const newAmount = this._scaleAmountByConstant(
            ingredient?.amount?.amount,
            this.constant
          );
          console.log("THIS IS THE NEW AMOUNT I AM SETTING", newAmount);
          console.log("THIS IS THE OLD AMOUNT", ingredient);
          ingredient.setAmount(newAmount);
          console.log("THIS IS THE NEW INGREDIENT AFTER SET", ingredient);
          return ingredient;
        }

        const newAmountInMl: number =
          ingredient.amount.amount *
          ingredient.unit.quantityInMl *
          this.constant;

        const newUnit: Unit = getUnitFromMl(newAmountInMl);
        const newAmount = this._getAmountForCurrentUnit(
          newAmountInMl,
          newUnit.quantityInMl
        );
        console.log("THIS IS MYING BEFORE SET AMOUNT", newAmount);
        ingredient.setAmount(newAmount);
        console.log("THIS IS MYING AFTER SET AMOUNT", ingredient);
        ingredient.setUnit(newUnit.name.long);
        return ingredient;
      }
    );
    this.scaledRecipe = scaledRecipe;
  }

  _getAmountForCurrentUnit(amountInMl: number, mlPerUnit: number) {
    const value = amountInMl / mlPerUnit;
    const roundedValue = Number(value.toFixed(2));
    return roundedValue.toString();
  }

  _scaleAmountByConstant(amount: number, constant: number) {
    const product = amount * constant;
    return product.toString();
  }
}
