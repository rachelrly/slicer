import { Ingredient } from "./ingredient";
import { Parser } from "./parser";

export class Recipe {
  input: string; //instantiate when created
  recipe: Ingredient[] = [];
  scaledRecipe: Ingredient[] = [];
  constant: number;

  parseInput() {
    const parser = new Parser();
    parser.parse(this.input);
    this.recipe = parser.ingredients;
  }

  scaleRecipe() {}
}
