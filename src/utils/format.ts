export function fractionToFloat(fraction: string, index: number): number {
    const numerator = fraction.slice(0, index)
    const denominator = fraction.slice(index+1)
    const total = Number(numerator) / Number(denominator)
    return total
}