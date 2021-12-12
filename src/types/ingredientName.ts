export class IngredientName {
  name: string = undefined;
  set(current: string) {
    if (Boolean(this.name)) {
      this.name = current;
    } else {
      this.name += " " + current;
    }
  }
}
