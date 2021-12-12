import { Ingredient, IngredientOptions } from "./ingredient";

// TODO: implement backtracking
export class Parser {
  ingredients: Ingredient[] = [];
  currentIngredient: Ingredient = new Ingredient();
  currentWord: string = "";

  parseRecipe(input: string) {
    const inputLength = input.length;
    for (let i = 0; i <= inputLength; i++) {
      if (_isEmptyChar(input[i]) || _isFinalChar(i, inputLength)) {
        if (Boolean(this.currentWord)) {
          // Sorts this.currentWord and sets in this.currentIngredient
          this.currentIngredient.sortCurrentWord(this.currentWord);
          this.currentWord = "";
          const isValid = this.currentIngredient.isValidIngredient();
          if (isValid) {
            // sets new this.currentIngredient
            this._addToIngredients();
          }
        }
      } else {
        this.currentWord += input[i];
      }
    }
    const isValid = this.currentIngredient.isValidIngredient();
    if (isValid) {
      // sets new this.currentIngredient
      this._addToIngredients();
    }

    function _isEmptyChar(char: string) {
      // TODO: Switch case?
      if (char == " ") return true;
      if (char === "\n") return true;
      if (char === "-") return true;
      return false;
    }

    function _isFinalChar(index: number, inputLength: number) {
      return inputLength === index;
    }
  }

  _addToIngredients() {
    this.ingredients = [...this.ingredients, this.currentIngredient];
    this.currentIngredient = new Ingredient();
  }
}
