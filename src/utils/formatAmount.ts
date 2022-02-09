// This uses string matching as opposed to calculations
//  because I couldn't figure out a clean way to handle
//  reduced fractions for repeating decimals and rounding
//  and because there is a fininte amount of useful fractions in cooking

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

export function formatAmount(amount: number, fractions = true): string {
  const string = formatAmountString(amount)
  if (fractions) {
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
