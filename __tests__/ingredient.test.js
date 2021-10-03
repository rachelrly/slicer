const {Ingredient} = require('../src/types/ingredient.js')

describe('sorts, formats, and filters ingredient input', () => {

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

    describe('fills an ingredient with given input of different types', () => {
        const TestIngredient = new Ingredient()

        test('given valid ingredient without unit, returns valid unit is true', () => {
            TestIngredient.sort('1')
            TestIngredient.sort('water')
            expect(TestIngredient.isValidIngredient()).toBe(true)
        })
        
        test('given incomplete input, returns false for isCompleteInput()', () => {
            expect(TestIngredient.isCompleteIngredient()).toBe(false)
        })
        
        test('given valid three part input sorts all three parts correctly', () => {
            TestIngredient.sort('cup')

            expect(TestIngredient.amount.ml).toBe(1)
            expect(TestIngredient.unit.name.long).toBe('cup')
            expect(TestIngredient.ingredient.name).toBe('water')
        })

        test('returns true for complete ingredient', () => {
            expect(TestIngredient.isCompleteIngredient()).toBe(true)
        })

       

    })

})