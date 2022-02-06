export function toFloat(fraction: string, index: number): number {
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
    return toFloat(amount, regexData?.index)
  } else {
    return Number(amount)
  }
}

export function isNumber(current: string): boolean {
  const regex = /\d/
  return Boolean(current.match(regex))
}
