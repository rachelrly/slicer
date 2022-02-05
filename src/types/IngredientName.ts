export class IngredientName {
  name: string = undefined
  set(current: string, replace: boolean) {
    if (replace || this.name === undefined) {
      this.name = current
    } else {
      this.name += ' ' + current
    }
  }
}
