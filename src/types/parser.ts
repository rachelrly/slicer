import { Ingredient } from "./ingredient";

// TODO: implement backtracking
export class Parser {
  ingredients: Ingredient[] = [];
  currentIngredient: Ingredient = new Ingredient();
  currentWord: string = "";

  parse(input: string) {
    const isEmptyChar = (char: string) => {
      if (char == " ") return true;
      if (char === "\n") return true;
      if (char === "-") return true;
      return false;
    };

    for (let i = 0; i <= input.length; i++) {
      if (isEmptyChar(input[i])) {
        const shouldValidate = this.currentIngredient.sort(this.currentWord);
        if (shouldValidate) this._addToIngredients();
        this.currentWord = "";

        console.log("RESET WORD, ingredient is ", this.currentIngredient);
      } else {
        this.currentWord += input[i];
      }
    }
    if (this.currentIngredient) this._addToIngredients();
  }

  _addToIngredients() {
    console.log("RUNNING ADD TO INGREDIENTS");
    const isValidIngredient = this.currentIngredient.isValidIngredient();
    console.log("WILL I ADD BECAUSE VALID IS", isValidIngredient);
    if (isValidIngredient) {
      this.ingredients = [...this.ingredients, this.currentIngredient];
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
