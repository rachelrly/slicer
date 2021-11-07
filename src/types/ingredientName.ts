export class IngredientName {
  name: string = "";
  set(current: string) {
    if (!this.name) {
      this.name = current;
    } else {
      this.name += " " + current;
    }
  }
}
