import {Units, UnitsType} from './units'
import {fractionToFloat} from '../utils/format'

interface UnitName{
    long: string
    short: string
}
export interface Unit {
    readonly quantityInMl?: number
    readonly name: UnitName
    readonly isScalable: boolean
}



export class Amount {
    ml: number

    isValid(){
        
    }

    toFloat(amount: string){
        // if is reg fraction
        const regex = /\//ig
        const {index=null} = regex.exec(amount)

        if (index) {
            return fractionToFloat(amount, index)
        } else {
            return Number(amount)
        }
        // if vulger fraction
        // convert to decimal
    }

    set(number: string){
        this.ml = this.ml + this.toFloat(number)
    }
}

class IngredientName {
    name: string
    set(current:string){
        if (this.name.length){
            this.name = current
        } else {
            this.name += ' ' + current
        }
    }
}

export class Ingredient {
    amount?: Amount
    unit?: Unit
    ingredient?: IngredientName

    display(){
        return ({
            amount: this.amount.ml, 
            unit: this.unit.name, 
            ingredient: this.ingredient
        })
    }

    sort(current: string):void{
        if (this.currentIsDigit(current)) {
            this.amount.set(current)
        } else if (this.currentIsUnit(current)) {
            this.unit = Units[current as UnitsType]
        } else {
            this.ingredient.set(current)
        }
    }

    isCompleteIngredient():boolean{
        return !!(this.amount && this.unit && this.ingredient)
    }

    isValidIngredient():boolean{
        // i.e. "1 cup rice", "1 egg", "salt"
        if (this.isCompleteIngredient()) return true
        else if (this.ingredient && (!this.amount && !this.unit)) return true
        else if (this.ingredient && this.amount && !this.unit) return true
        else return false
    }

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
   

}