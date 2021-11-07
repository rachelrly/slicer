# The Slicer

This repo contains the TypeScript algorithm to slice copy and pasted recipes.

The goal of this project is to make a recipe parsing package with broader application than the [Sliced app](https://github.com/rachelrly/sliced).

## Tech Stack

- TypeScript
- Jest

## Codebase

### /src

Contains the TypeScript code of the Slicer algorithm

#### /types

##### ingredient.ts

Defines `Amount` and `IngredientName` classes and integrates them with valid `Unit` to create the `Ingredient` class

##### units.ts

Declares valid units and equivalencies

##### parser.ts

Contains the class that loops through the string and controls the behavior of the parser

#### index.ts

Currently does nothing

### /dist

Contains the compiled JavaScript code for the project

### /tests

This folder contains unit tests for the various parts of the Slicer.
