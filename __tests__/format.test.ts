import { formatAmount } from '../src'

describe('Given an amount and the default setting to display in fractions', () => {
  test('it handles a whole number input', () => {
    expect(formatAmount(1)).toBe('1')
    expect(formatAmount(1.0)).toBe('1')
    expect(formatAmount(10)).toBe('10')
  })

  test('it handles decimal input', () => {
    expect(formatAmount(0.01)).toBe('0')
    expect(formatAmount(0.99)).toBe('1')
    expect(formatAmount(0.2)).toBe('1/4')
    expect(formatAmount(0.32)).toBe('1/3')
    expect(formatAmount(0.34)).toBe('1/3')
    expect(formatAmount(0.5)).toBe('1/2')
    expect(formatAmount(0.52222)).toBe('1/2')
    expect(formatAmount(0.65)).toBe('2/3')
    expect(formatAmount(0.67)).toBe('2/3')
    expect(formatAmount(0.82)).toBe('3/4')
  })

  test('it handles mixed number input', () => {
    expect(formatAmount(1.5)).toBe('1 1/2')
    expect(formatAmount(1.544444)).toBe('1 1/2')
    expect(formatAmount(0.5)).toBe('1/2')
  })
})
