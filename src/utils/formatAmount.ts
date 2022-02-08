// Adapted from https://gist.github.com/redteam-snippets/3934258

function gcd(a: number, b: number): number {
  return b ? gcd(b, a % b) : a
}

export function formatAmount(amount: number) {
  // Use regex to test for whole number
  const string = parseFloat(amount.toFixed(2)).toString()
  const regex = /\./gi
  const decimalPoint = regex.exec(string)?.index
  console.log('THIS IS MY NUM AND DECIMAL POINT', {
    decimalPoint,
    string,
    amount
  })
  if (decimalPoint) {
    // check if this is a whole number or amount
    // check if this is in fact a fraction before using
    //const mixed = string.split(' ')
    // NOT WORKING
    // is left side of dec over 1??
    // const whole = mixed[1] ? mixed[0] : ''
    let topString = string.slice(decimalPoint + 1)
    let top = parseFloat(topString)
    let bottom = Math.pow(10, topString.length)
    // top > bottom top % bottom
    if (bottom) {
      top = +top + Math.floor(amount) * bottom
      const x = gcd(top, bottom)
      top = top / x
      bottom = bottom / x
      console.log('REDUCED HERE', top / bottom, top / (bottom - 1), {
        topString,
        bottom,
        top
      })
      if (top > bottom) {
        const mod = top % bottom
        const whole = string.slice(0, decimalPoint)
        return `${whole + ' '}${mod + '/' + bottom}`
      }

      return `${top + '/' + bottom}`
    }
  }
  return `${amount}`
}
