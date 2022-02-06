import { BREAK_ON_CHAR } from '../utils'

export function splitInput(input: string) {
  return input.split(BREAK_ON_CHAR).filter((word) => Boolean(word))
}
