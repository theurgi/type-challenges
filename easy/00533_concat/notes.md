# Concat

This challenge requires creating a TypeScript utility type `Concat<T, U>` that emulates the JavaScript `Array.concat()` function at the type level.

The `concat()` function in JavaScript is used to merge two or more arrays. This function does not change the existing arrays but returns a new array containing the elements of the input arrays.

We aim to replicate this functionality with types. We want to create a type that represents the array obtained by concatenating two given array types.

For this, we can use TypeScript's built-in tuple concatenation feature, which was introduced in TypeScript 4.0 along with [variadic tuple types](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-4-0.html).

The variadic tuple type feature allows us to spread elements from one tuple type into another, effectively concatenating them.

```ts
type Tuple = readonly unknown[]

type Concat<T extends Tuple, U extends Tuple> = [...T, ...U]
```

In this solution, we define a `Tuple` type as a `readonly` array of `unknown` elements. The `Concat` type takes two parameters `T` and `U` that extend `Tuple`. It then creates a new tuple type that includes all the elements from `T` and `U` in left-to-right order.

The `[...T, ...U]` syntax spreads the elements from `T` and `U` into a new tuple, effectively concatenating them.
