export const MAXIMUM_SUPPORTED_ML = 100000

export const BREAK_ON_CHAR = /[\s|-]/

export const MAX_WORD_LENGTH = 30

export const MAX_INPUT_LENGTH = 750

// keeps alphabetical chars, digits, '-', '/', '-', '%'
export const REPLACE_CHAR = /(?![\-|\.|\/\\|\%])(\W)/g

// This is not being used in favor of the simple /\d/
// export const DIGIT = /^[\d|\.|\/]+$/
