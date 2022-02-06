import { Ingredient } from '../types'
import { isNumber } from './number'
import { ERRORS } from './errors'

export function makeIngredientArray(words: string[]) {
  const ingredients: Ingredient[] = []
  let current: Ingredient = new Ingredient()

  function _addIngredient() {
    ingredients.push(current)
    current = new Ingredient()
  }

  words.forEach((word: string, i) => {
    try {
      current.sort(word)
      if (i + 1 === words.length) {
        _addIngredient()
      } else {
        let nextWord = words[i + 1]
        if (isNumber(nextWord) && current.validate()) {
          _addIngredient()
        }
      }
    } catch (error) {
      console.error(`${ERRORS.WORD_NOT_SORTED}: ${error?.message}`)
    }
  })
  return ingredients
}
