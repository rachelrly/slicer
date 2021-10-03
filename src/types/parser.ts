//has current ingredient in constructor
//has methods that control this
import {Units, UnitsType} from './units'
import {Ingredient} from './ingredient'


export class Parser{
    ingredients: Ingredient[]
    currentIngredient: Ingredient
    lastIngredient: Ingredient // in case of backtracking
    currentWord: string

    currentIsDigit(word: string):boolean{
        const regex = /\d/
        return !!word.match(regex)
    }

    currentIsUnit(current:string):boolean{
        const lastIndex = current.length - 1
        const last = current[lastIndex]

        // removes ending 's' or '.', i.e. "cups" or "tbsp."
        if (last === ('s' || '.')) current = current.slice(0, lastIndex)
        const isUnit = current in Units
        return !!isUnit
    }

    parse(input:string){
        const emptyChar = ' ' || '\n'
        let i = 0
        for (i=0; i<=input.length; i++){
            if (input[i] == emptyChar){
                this.currentIngredient.sort(this.currentWord)
                this.currentWord = ''
            } else {
                this.currentWord += input[i]
            }
        }
        
    }

    addCurrentToIngredients(){
        if (this.currentIngredient.isWholeIngredient()){
            this.ingredients = this.ingredients.push(this.currentIngredient)
            this.currentIngredient = new Ingredient
        } 
    }



}





// ingredient
    // sort
        // is unit
        // set unit
        // is digit
        // format number
        // set digit
        // set ingredient