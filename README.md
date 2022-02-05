# The Slicer

This repo contains the TypeScript algorithm to convert recipe strings into a list of Ingredients.

The goal of this project is to make a recipe parsing package with broader application than the [Sliced app](https://github.com/rachelrly/sliced).

## Tech Stack

- TypeScript
- Jest
- [ts-jest](https://www.npmjs.com/package/ts-jest)

## Codebase

### `/src`

Contains the TypeScript code of the Slicer algorithm.
Top level [Recipe 👀](/src/types/Recipe.ts) class is exported from this folder.

#### `/types`

Contains the TS classes for `Recipe`, `Ingredient`, `Amount` and `IngredientName` along with the constant definition of `UNITS` and `ERRORS` and necessary types.

#### `/utils`

Contains [parse.ts 👀](/src/utils/parse.ts), which turns a recipe string into an ingredient list, and other utility functions.

### `/__tests__`

Contains unit tests for the algorithm
