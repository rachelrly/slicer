import { Ingredient, IngredientOptions } from "./ingredient";

// TODO: implement backtracking
export class Parser {
  ingredients: Ingredient[] = [];
  currentIngredient: Ingredient = new Ingredient();
  currentWord: string = "";

  parse(input: string) {
    for (let i = 0; i <= input.length; i++) {
      if (_isEmptyChar(input[i]) || _isFinalChar(i)) {
        if (this.currentWord) {
          const option = this.currentIngredient.sort(this.currentWord);
          switch (option) {
            case IngredientOptions.Amount:
              const isFullIngredient =
                this.currentIngredient.ingredient?.name ||
                this.currentIngredient.unit;

              if (isFullIngredient) this._addToIngredients();

              this.currentIngredient.setAmount(this.currentWord);
              break;
            case IngredientOptions.Ingredient:
              this.currentIngredient.setIngredient(this.currentWord);
              break;
            case IngredientOptions.Unit:
              this.currentIngredient.setUnit(this.currentWord);
              break;
          }
          this.currentWord = "";
        }
      } else {
        this.currentWord += input[i];
      }
    }
    // adds last ingredient after loop finishes
    this._addToIngredients();

    function _isEmptyChar(char: string) {
      // TODO: Switch case?
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
