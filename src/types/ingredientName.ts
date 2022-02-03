export class IngredientName {
  name: string = undefined
  set(current: string) {
    if (this.name === undefined) {
      this.name = current
    } else {
      this.name += ' ' + current
    }
  }
}
