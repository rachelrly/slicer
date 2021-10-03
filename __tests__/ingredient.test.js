const {MyIngredient, Ingredient} = require('../src/types/ingredient.js')

describe('parses input successfully', () => {

    describe('correctly handles amount input in isolation', () => {
        
        test('sorts single digit integer as amount', () => {
            const TestIngredient = new Ingredient()
            TestIngredient.sort('1')
            expect(TestIngredient.amount.ml).toBe(1)
        })
    
        test('sorts fraction and converts to decimal', () => {
            const TestIngredient = new Ingredient()
            TestIngredient.sort('1/2')
            expect(TestIngredient.amount.ml).toBe(0.5)
        })

        test('sorts fraction and converts to decimal', () => {
            const TestIngredient = new Ingredient()
            TestIngredient.sort('1.5')
            expect(TestIngredient.amount.ml).toBe(1.5)
        })
    
        test('adds to amount with additional numeric input', () => {
            const TestIngredient = new Ingredient()
            TestIngredient.sort('1')
            TestIngredient.sort('2')
            expect(TestIngredient.amount.ml).toBe(3)
        })
    })

    describe('correctly handles unit input in isolation', () => {
        const TestIngredient = new Ingredient()

        test('sets unit correctly based on valid string input', () => {
            TestIngredient.sort('tsp')
            expect(TestIngredient.unit.name.short).toBe('tsp')
        })

        test('unit input to overwrite current unit input', () => {
            TestIngredient.sort('tbsp')
            expect(TestIngredient.unit.name.short).toBe('tbsp')
        })

        test('ignores "s" at the end of valid unit input', () => {
            TestIngredient.sort('tsps')
            expect(TestIngredient.unit.name.short).toBe('tsp')
        })
    })

    describe('correctly handles ingredient name input in isolation', () => {
        const TestIngredient = new Ingredient()

        test('adds ingredient name', () => {
            TestIngredient.sort('salt')
            expect(TestIngredient.ingredient.name).toBe('salt')
        })

        test('continues to add ingredient name items seperated by spaces', () => {
            TestIngredient.sort('and')
            TestIngredient.sort('pepper')
            expect(TestIngredient.ingredient.name).toBe('salt and pepper')
        })
    })

    

})