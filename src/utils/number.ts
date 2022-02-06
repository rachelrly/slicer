/**
 * Functions that turn strings to floats to display fractions
 */

export function fractionToFloat(fraction: string, index: number): number {
  const numerator = fraction.slice(0, index)
  const denominator = fraction.slice(index + 1)
  const total = Number(numerator) / Number(denominator)
  return total
}

export function toNumber(amount: string): number {
  const regex = /\//gi
  const regexData = regex.exec(amount)
  const isFraction = regexData?.index
  if (isFraction) {
    // sent to the util as a string
    return fractionToFloat(amount, regexData?.index)
  } else {
    // rounded to two digits
    return Number(amount)
  }
  // TODO: add support for formatted fracs here
}
