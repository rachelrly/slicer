export const MAX_SUPPORTED_ML = 15200

export const MAX_WORD_LENGTH = 30

export const MAX_INPUT_LENGTH = 300

export const BREAK_ON_CHAR = /[\s|-]/

// Keeps alphabetical chars, digits, '-', '/', '-', '%', and whitespace
export const REPLACE_CHAR = /(?![\-|\.|\/\\|\%|\s])(\W)/g

// Fractions use string matching and a range as opposed to calculated
//  fractions because I couldn't figure out a clean way to handle
//  reduced fractions and because there is a fininte amount of
//  useful fractions in cooking
export const FRACTIONS = {
  '0': {
    min: 0,
    max: 0.11
  },
  '1/4': {
    min: 0.12,
    max: 0.28
  },
  '1/3': {
    min: 0.29,
    max: 0.43
  },
  '1/2': {
    min: 0.44,
    max: 0.58
  },
  '2/3': {
    min: 0.59,
    max: 0.7
  },
  '3/4': {
    min: 0.71,
    max: 0.85
  },
  '1': {
    min: 0.86,
    max: 1
  }
}
