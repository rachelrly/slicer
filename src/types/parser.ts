//has current ingredient in constructor
//has methods that control this
import {Units, UnitsType} from './units'
import {Ingredient} from './ingredient'


export class Parser{
    ingredients: Ingredient[]
    currentIngredient: Ingredient
    lastIngredient: Ingredient // in case of backtracking
    currentWord: string


    parse(input:string){
        const emptyChar = ' ' || '\n' || '-'
        let i = 0
        for (i=0; i<=input.length; i++){
            if (input[i] == emptyChar){
                if (!this.currentIngredient) this.currentIngredient = new Ingredient()
                this.currentIngredient.sort(this.currentWord)
                this.currentWord = ''
                this.addCurrentToIngredients()
            } else {
                this.currentWord += input[i]
            }
        }

        if (this.currentIngredient) this.addCurrentToIngredients()
    }

    addCurrentToIngredients(){
        if (!this.ingredients) this.ingredients = []
        if (this.currentIngredient.isValidIngredient()){
            this.ingredients = [...this.ingredients, this.currentIngredient]
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