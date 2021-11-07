import { Ingredient } from "./ingredient";

// TODO: implement backtracking
export class Parser {
  ingredients: Ingredient[] = [];
  currentIngredient: Ingredient = new Ingredient();
  currentWord: string = "";

  parse(input: string) {
    for (let i = 0; i <= input.length; i++) {
      if (_isEmptyChar(input[i]) || _isFinalChar(i)) {
        if (this.currentWord) {
          this.currentIngredient.sort(this.currentWord);
          this.currentWord = "";
        }
      } else {
        this.currentWord += input[i];
      }
      this._addToIngredients();
    }

    function _isEmptyChar(char: string) {
      if (char == " ") return true;
      if (char === "\n") return true;
      if (char === "-") return true;
      return false;
    }

    function _isFinalChar(index: number) {
      const isFinal = input.length === index;
      return isFinal;
    }
  }

  _addToIngredients() {
    const isValidIngredient = this.currentIngredient.isValidIngredient();
    if (isValidIngredient) {
      this.ingredients = [...this.ingredients, this.currentIngredient];
      this.currentIngredient = new Ingredient();
    }
  }
}
