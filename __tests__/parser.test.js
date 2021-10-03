const {Parser} = require('../src/types/parser')


const BASIC_BREAD = `1 package active dry yeast
3 tablespoons sugar plus 1/2 teaspoon sugar
2-1/4 cups warm water
1 tablespoon salt
6-1/4 to 6-3/4 cups bread flour
2 tablespoons canola oil`

describe('parser works as expected', () => {
    const TestParser = new Parser()

    test('given valid recipe input sets a list of sorted ingredients', () => {
        TestParser.parse(BASIC_BREAD)
        console.log('THIS IS AFTER ADDED BY PARSER', TestParser.ingredients)
        expect(TestParser.ingredients?.length).toBe(7)
    })

    test('given a recipe, the first ingredient is returned as expected', () => {
        const ingredient = TestParser.ingredients[0]
        expect(ingredient.amount.ml).toBe(1)
    })

    
})