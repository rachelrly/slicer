import { FRACTIONS } from './constants'

export function formatAmount(amount: number, format = true): string {
  const string = formatAmountString(amount)
  if (format) {
    return formatFraction(string)
  }
  return string
}

function formatAmountString(amount: number): string {
  return parseFloat(amount.toFixed(2)).toString()
}

export function formatFraction(amount: string): string {
  const decimalPoint = getDecimalIndex(amount)
  if (decimalPoint) {
    const whole = amount.slice(0, decimalPoint)
    const float = parseFloat(`0.${amount.slice(decimalPoint + 1)}`)
    for (const [fraction, range] of Object.entries(FRACTIONS)) {
      if (inRange(float, range.min, range.max)) {
        if (fraction.length === 1) {
          return `${Number(whole) + Number(fraction)}`
        }
        return whole && whole !== '0' ? `${whole} ${fraction}` : fraction
      }
    }
  }
  return amount
}

function inRange(x: number, min: number, max: number) {
  return x >= min && x <= max
}

function getDecimalIndex(amount: string) {
  const regex = /\./gi
  return regex.exec(amount)?.index ?? false
}
