import { Ingredient } from "./ingredient";
import { parse } from "./parse";
import { getUnitFromMl } from "../utils/format";
import { UnitType } from "./units";

export class Recipe {
  input: string; //instantiate when created
  recipe: Ingredient[] = [];
  scaledRecipe: Ingredient[] = [];
  constant: number = 1;

  setConstant(constant: number) {
    this.constant = constant;
  }

  _parseRecipeString(input: string) {
    this.recipe = parse(input);
  }

  scaleRecipe() {
    const scaledRecipe = this.recipe.map(
      (ingredient: Ingredient): Ingredient => {
        const noScalableUnit = !ingredient?.unit || !ingredient?.unit?.mlInUnit;
        const ingredientNameOnly = !ingredient?.amount?.amount;
        if (ingredientNameOnly) return ingredient;
        if (noScalableUnit) {
          const newAmount = this._scaleAmountByConstant(
            ingredient?.amount?.amount,
            this.constant
          );
          ingredient.setAmount(newAmount);
          return ingredient;
        }

        const newAmountInMl: number =
          ingredient.amount.amount * ingredient.unit.mlInUnit * this.constant;

        const newUnit: UnitType = getUnitFromMl(newAmountInMl);
        const newAmount = this._getAmountForCurrentUnit(
          newAmountInMl,
          newUnit.mlInUnit
        );
        ingredient.setAmount(newAmount);
        ingredient.setUnit(newUnit);
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
