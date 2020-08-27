import { Ingredient } from './../shared/ingredient.model';
export class Recipe{
    // public name: string;
    // public description: string;
    // public imagePath: string;
    // public ingredients: ingredient[];


    // constructor(name: string, desc: string, imagePath: string, ingredients: ingredient[]) {
    //     this.name = name;
    //     this.description = desc;
    //     this.imagePath = imagePath;
    //     this.ingredients= ingredients;
    // }

    // public name: string;
    // public description: string;
    // public imagePath: string;
    // public ingredients: ingredient[];


    constructor(public name: string, public description: string, public imagePath: string, public ingredients: Ingredient[]) {}
}

