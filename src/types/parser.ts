//has current ingredient in constructor
//has methods that control this
import { Units, UnitsType } from "./units";
import { Ingredient } from "./ingredient";

//TODO: Make constructor so you don't have to keep instantiating if not there
export class Parser {
  ingredients: Ingredient[] = [];
  currentIngredient: Ingredient = new Ingredient();
  //lastIngredient: Ingredient; // in case of backtracking
  currentWord: string = "";

  parse(input: string) {
    const isEmptyChar = (char: string) => {
      if (char == " ") return true;
      if (char === "\n") return true;
      if (char === "-") return true;
      return false;
    };
    let i = 0;
    for (i = 0; i <= input.length; i++) {
      if (isEmptyChar(input[i])) {
        this.currentIngredient.sort(this.currentWord);

        this.currentWord = "";
      } else {
        this.currentWord += input[i];
      }
      this._addToIngredients();
    }
    if (this.currentIngredient) this._addToIngredients();
  }

  _addToIngredients() {
    // validates and adds
    const isValidIngredient = this.currentIngredient.isValidIngredient();
    if (isValidIngredient) {
      this.ingredients = [...this.ingredients, this.currentIngredient];

      // replaces with blank ingredient
      this.currentIngredient = new Ingredient();
    }
  }
}

// ingredient
// sort
// is unit
// set unit
// is digit
// format number
// set digit
// set ingredient
