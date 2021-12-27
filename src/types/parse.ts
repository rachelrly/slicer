import { Ingredient } from "./ingredient";
import { BREAK_ON_CHAR } from "../utils/constants";

/**
 *
 * @param recipe In the following format:
 * 1 package active dry yeast
 * 3 tablespoons sugar
 * 2-1/4 cups warm water
 * 1 tablespoon salt
 * 6-1/4 cups bread flour
 * 2 tablespoons canola oil
 */
export function parse(recipe: string) {
  const ingredients: Ingredient[] = [];
  let current: Ingredient = new Ingredient();

  function _addIngredient() {
    console.log("ADDING VALID INGREDIENT TO ARRAY", current);
    ingredients.push(current);
    console.log("I ADDED TO INGREDIENTS", ingredients);
    current = new Ingredient();
    console.log("AFTER ADDING NEW THIS IS INGREDIENT", ingredients);
  }
  // Could lose important data by treating all break chars equally.
  // Give line breaks higher prescedence in sorting??
  const rawWords = recipe.split(BREAK_ON_CHAR);
  rawWords.forEach((word: string, i) => {
    if (!word) return;
    try {
      current.sortCurrent(word);
      let nextWord = i + 2 === rawWords.length ? null : rawWords[i + 1];
      const nextIsDigit = Boolean(nextWord) && current.isDigit(nextWord);
      const nextIsUnit = false; // TODO: Define me!!!!
      if (nextIsDigit || nextIsUnit || nextWord === null) {
        if (current.validate()) {
          _addIngredient();
        }
      }
    } catch (error) {
      console.error(
        "Error sorting word from ingredient: ",
        error?.message ?? error
      );
      console.log("BAD: Creating new ingredient and adding anyway");
      _addIngredient();
    }
  });
  return ingredients;
}
