import { scaleIngredient } from '../utils/scaleIngredient'
import {UNIT_DATA} from '../config/constants'

describe('scales ingredients accurately', () => {
    test('returns the same values when the constant is 1', ()=> {
        const INPUT = {amount: 1, unit: UNIT_DATA.CUP}
        expect(scaleIngredient(INPUT, 1)).toStrictEqual(INPUT)
    })
    
    test('scales amount by a constant when there is no unit', ()=> {
        expect(scaleIngredient({amount: 1, unit: {}}, 2)).toStrictEqual({amount:"2", unit: {}})
    })
    
    test('scales amount by a constant and returns the same unit when the unit is not scalable', ()=> {
        expect(scaleIngredient({amount: 1, unit: UNIT_DATA.POUND}, 2)).toStrictEqual({amount:"2", unit: UNIT_DATA.POUND})
    })
    
    test('scales up amount with decimal input and returns the same unit when in range', ()=> {
        expect(scaleIngredient({amount: 1.5, unit: UNIT_DATA.CUP}, 2)).toStrictEqual({amount: "3", unit: UNIT_DATA.CUP})
    })
    
    test('scales down amount with decimal input and returns the same unit when in range', ()=> {
        expect(scaleIngredient({amount: 1.5, unit: UNIT_DATA.CUP}, 0.5)).toStrictEqual({amount: "0.75", unit: UNIT_DATA.CUP})
    })
    
    test('scales down amount and unit when new amount is below of unit range', () => {
        expect(scaleIngredient({amount: 1, unit: UNIT_DATA.TABLESPOON}, 0.3333)).toStrictEqual({amount: "1", unit: UNIT_DATA.TEASPOON})   
    })
    
    test('scales up amount and unit when new amount is above of unit range', () => {
        expect(scaleIngredient({amount: 1, unit: UNIT_DATA.TABLESPOON}, 4)).toStrictEqual({amount: "0.25", unit: UNIT_DATA.CUP})   
    })
})