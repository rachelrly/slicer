import { formatAmount } from '../src'

describe('Given an amount', () => {
  test('it handles a whole number input', () => {
    expect(formatAmount(1)).toBe('1')
    expect(formatAmount(1.0)).toBe('1')
    expect(formatAmount(10)).toBe('10')
  })
  test('it handles a one-digit decimal input', () => {
    expect(formatAmount(0.1)).toBe('1/10')
    expect(formatAmount(0.2)).toBe('1/5')
    expect(formatAmount(0.3)).toBe('3/10')
    expect(formatAmount(0.4)).toBe('2/5')
    expect(formatAmount(0.5)).toBe('1/2')
    expect(formatAmount(0.6)).toBe('3/5')
    expect(formatAmount(0.7)).toBe('7/10')
    expect(formatAmount(0.8)).toBe('4/5')
    expect(formatAmount(0.9)).toBe('9/10')
  })

  test('it handles a rounded two-digit decimal input', () => {
    expect(formatAmount(0.33)).toBe('1/3')
    expect(formatAmount(0.66)).toBe('2/3')
  })

  test('it rounds decimals that are +-0.01 to the nearest fraction', () => {
    expect(formatAmount(0.11)).toBe('1/10')

    expect(formatAmount(0.01)).toBe('1')
    expect(formatAmount(0.99)).toBe('1')

    expect(formatAmount(0.32)).toBe('1/3')
    expect(formatAmount(0.34)).toBe('1/3')

    expect(formatAmount(0.65)).toBe('2/3')
    expect(formatAmount(0.67)).toBe('2/3')
  })

  test('it handles mixed number input', () => {
    expect(formatAmount(1.5)).toBe('1 1/2')
  })
})
