# Recipe Slicer

This repo contains the TypeScript algorithm to convert recipe strings into a list of Ingredients.

The goal of this project is to make a recipe parsing package with broader application than the [Sliced app](https://github.com/rachelrly/sliced).

## Codebase

### `/src`

Contains the TypeScript code of the Slicer algorithm.

#### `/types`

Contains the TS classes for [`Recipe`](/src/types/recipe.ts) and [`Ingredient`](/src/types/ingredient.ts), and the typed constant definition of [`UNITS`](/src/types/units.ts).

#### `/utils`

Contains constants and utility functions, notably [`makeIngredientArray()`](/src/utils/makeIngredientArray.ts), which takes in a an array of words and converts them to an array of Ingredients.

### `/__tests__`

Contains the Jest tests for the algorithm

#### `ingredient.test.ts`

Tests the Ingredient class

#### `recipe.test.ts`

Tests the recipe class

#### `unit.test.ts`

Tests functions in [`/src/utils.unit.ts`](/src/utils/unit.ts)

#### `regex.test.ts`

Tests regex for character breaks ([`BREAK_ON_CHAR`](/src/utils/constants.ts)) and ([`REPLACE_CHAR`](/src/utils/constants.ts))
