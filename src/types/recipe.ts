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
  constant: number;

  setInput(input: string) {
    this.input = input;
    this._parseInput();
  }

  setConstant(constant: number) {
    this.constant = constant;
    // trigger function to that returns scaled recipe
    // this.scaledRecipe = response
  }

  _parseInput() {
    const parser = new Parser();
    parser.parse(this.input);
    this.recipe = parser.ingredients;
  }

  scaleRecipe() {
    const scaledRecipe = this.recipe.map(
      (ingredient: Ingredient): Ingredient => {
        const newAmountInMl: number =
          ingredient.amount.amount *
          ingredient.unit.quantityInMl *
          this.constant;

        const newUnit: Unit = getUnitFromMl(newAmountInMl);
        const newAmountInUnit: bigint | number =
          newAmountInMl / newUnit.quantityInMl;

        ingredient.setAmount(newAmountInUnit.toString());
        ingredient.setUnit(newUnit.name.long);
        return ingredient;
      }
    );

    this.scaledRecipe = scaledRecipe;
  }
}
