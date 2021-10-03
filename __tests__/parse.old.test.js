import {VULGAR_FRACTIONS, SPECIAL_CHARACTERS, RECIPES} from './utils/sampleRecipes'
import {transformInputIntoIngredientData} from '../utils/transformInputIntoIngredientData'

describe('parses all sample recipes successfully', () => {
    (function testParsingAllRecipes(){
        for (const [title, recipe] of Object.entries(RECIPES)){
            testRecipe({title, recipe})
        }
    })()
})

function testRecipe({title, recipe}){
    test(`sucessfully parses sample ${title} recipe`, () => {
        const parsedRecipe = transformInputIntoIngredientData(recipe)
        expect(!!parsedRecipe?.length).toBeTruthy()
    })
}

describe('handles special characters as expected', () => {
    test('parses a recipe with vulgar fractions and returns the correct floating point number', () => {
        const parsedRecipe = transformInputIntoIngredientData(VULGAR_FRACTIONS)
        const testIngredient = parsedRecipe[0]
        const numberOfIngredients = !!parsedRecipe?.length
        console.log('THIS IS THE TEST INGREDIENT', parsedRecipe?.length, testIngredient)
        expect(numberOfIngredients).toBeTruthy()
        expect(testIngredient?.amount).toBe(0.25)
    })
    
    test('strips invalid characters from recipe', () => {
        const parsedRecipe = transformInputIntoIngredientData(SPECIAL_CHARACTERS)
        console.log('THIS IS THE PARSED RECIPE', parsedRecipe)
        const testIngredientName = parsedRecipe[0].ingredient
        const numberOfIngredients = !!parsedRecipe?.length
        console.log('NAME AND NUMBER', testIngredientName, numberOfIngredients    )
        expect(numberOfIngredients).toBeTruthy()
        expect(testIngredientName).not.stringContaining('(')
    })
})