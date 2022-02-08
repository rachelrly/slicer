// Adapted from https://gist.github.com/redteam-snippets/3934258

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a
}

export function formatAmount(decimal: number) {
  // check if this is a whole number or decimal
  // check if this is in fact a fraction before using
  let top: string | number = decimal.toString().replace(/\d+[.]/, '')
  let bottom = Math.pow(10, top.length)
  if (bottom) {
    top = +top + Math.floor(decimal) * bottom
    const x = gcd(top, bottom)
    return `${top / x + '/' + bottom / x}`
  }
  return decimal
}
