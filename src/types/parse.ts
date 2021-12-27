import { Ingredient } from "./ingredient";
import { Amount } from "./amount";
import { UnitType } from "./units";
import { BREAK_ON_CHAR } from "../utils/constants";

export interface IngredientType {
  amount?: Amount;
  unit?: UnitType;
  ingredient?: string;
}

/**
 *
 * @param recipe In the following format:
 * ` 1/2 cup flour
 *    1 egg
 *    1 1/2 tsp water `
 */

export function parse(recipe: string) {
  const ingredients: Ingredient[] = [];
  let current: Ingredient = new Ingredient();
  let next: Ingredient = new Ingredient();

  function _addIngredient() {
    ingredients.push(current);
    current = new Ingredient();
  }
  // Could lose important data by treating all break chars equally.
  // Give line breaks higher prescedence in sorting??
  const rawWords = recipe.split(BREAK_ON_CHAR);
  rawWords.forEach((word: string, i) => {
    current.sortCurrent(word);

    let nextWord = i <= rawWords.length - 1 ? null : rawWords[i + 1];
    const nextIsDigit = Boolean(nextWord) && next.isDigit(nextWord);
    const nextIsUnit = false; // DEFINE LATER
    if (nextIsDigit || nextIsUnit || !nextWord) _addIngredient();
  });
  return ingredients;
}
