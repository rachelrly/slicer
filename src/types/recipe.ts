import { Ingredient } from "./ingredient";
import { Parser } from "./parser";

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

  scaleRecipe() {}
}
