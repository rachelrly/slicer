import { formatAmount } from '../src'

describe('Given an amount', () => {
  describe('Given a decimal', () => {
    test('it formats that decimal as a fraction', () => {
      expect(formatAmount(0.5)).toBe('1/2')
      expect(formatAmount(0.3333)).toBe('1/3')
      expect(formatAmount(0.3)).toBe('3/10')
      expect(formatAmount(1.0)).toBe('1')
      expect(formatAmount(1.5)).toBe('1 1/2')
    })
  })
})
