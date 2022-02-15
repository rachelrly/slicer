# Recipe Slicer

The Recipe Slicer is a TypeScript algorithm to convert recipe strings into a list of Ingredients.

The goal of this project is to make a recipe manipulation algorithm with broader application than my app [Sliced](https://github.com/rachelrly/sliced).

Install the recipe slicer with `npm install recipe-slicer`.

## How to Use

### class Recipe

The Recipe class is a top-level class with with two methods: `set` and `scale`. `set` takes a recipe string as an argument and sets the list of ingredients. `scale` takes in a constant as an argument and scales the recipe by that constant.

### class Ingredient

The Ingredient class stores the `amount`, `unit`, and `name` of the ingredient. If an ingredient has a unit that supports ml conversion, the `amount` is in ml. Otherwise, the `amount` is the complete `amount` value.

The Ingredient class has a `sort` method that takes a one-word string as an argument and sorts it as an `amount` or `unit`. All other valid inputs are set as the `name`.

To display the Ingredient amount as a fraction, use `Ingredient.display()`. For decimals (converted to units when applicable), use `Ingredient.display(false)`

### UNITS

### utils

There are several utility functions that help with recipe parsing.

`toNumber` takes in a string, which could be a decimal, whole number, or fraction, and returns the numeric value. `toFloat` takes in a string and the index of the '/', converting the fraction to a numeric value.

`formatFraction` formats floats as fractions for display. This function rounds to the nearest '1/4' or '1/3' increment.
