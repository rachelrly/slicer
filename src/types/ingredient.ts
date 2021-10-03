

export interface Unit {
    readonly quantityInMl?: number
    readonly name: string
    readonly isScalable: boolean
}



export class Amount {
    ml: number

    validate(){
        
    }
}

export class Ingredient {
    amount?: Amount
    unit?: Unit
    ingredient?: string

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

   

}