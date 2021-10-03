export function fractionToFloat(fraction: string, index: number): number {
    const numerator = fraction.slice(0, index - 1)
    const denominator = fraction.slice(index)
    const total = Number(numerator) / Number(denominator)
    return total
}