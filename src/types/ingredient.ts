import {Units, UnitsType} from './units'

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

    add(number: string){
        this.ml = this.ml + this.toFloat(number)
    }

}

function fractionToFloat(fraction: string, index: number): number {
    const numerator = fraction.slice(0, index - 1)
    const denominator = fraction.slice(index)
    const total = Number(numerator) / Number(denominator)
    return total
}

function compositeStringToFloat(){

}

export class Ingredient {
    amount?: Amount
    unit?: Unit
    ingredient?: string

    //what is it?
    //where does it belong? 


    display(){
        return ({
            amount: this.amount.ml, 
            unit: this.unit.name, 
            ingredient: this.ingredient
        })
    }

    addProperty(){
    //if amount exists already, add to amount or backtrack
    //if unit exists already and ingredient exists make new
    }

    setAmount(input: string){
        // this.amount

    }

    isWholeIngredient():boolean{
        return !!(this.amount && this.unit && this.ingredient)
    }
   

}