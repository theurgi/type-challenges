# Exclude

This challenge is about recreating the TypeScript utility type `Exclude<T, U>`, which constructs a type by excluding from `T` all properties that are assignable to `U`.

A common use case for `Exclude` is to exclude certain union members from a union. For example:

```ts
type T0 = Exclude<'a' | 'b' | 'c', 'a'>
//    ^ = type T0 = "b" | "c"
```

## Solution

We can solve this challenge by using [conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html) in TypeScript. Conditional types select one of two possible types based on a condition expressed as a type relationship test.

The syntax for a conditional type is as follows:

```ts
T extends U ? X : Y
```

- `T extends U` is the condition. It checks if the type `T` is assignable to `U`.
- If the condition is `true`, the type `X` is selected.
- If the condition is `false`, the type `Y` is selected.

So, if we want to exclude types from `T` that are assignable to `U`, we can create a conditional type like this:

```ts
type MyExclude<T, U> = T extends U ? never : T
```

Given the example `MyExclude<'a' | 'b' | 'c', 'a'>`, here's what happens step-by-step:

1. TypeScript starts by checking each member of `T` (`'a' | 'b' | 'c'`) against `U` (`'a'`).
2. First, it checks `'a'` (a member of `T`). `'a'` is assignable to `'a'`, so it selects `never`.
3. Then it checks `'b'`. `'b'` is not assignable to `'a'`, so it selects `'b'`.
4. Finally, it checks `'c'`. `'c'` is not assignable to `'a'`, so it selects `'c'`.

So the result is `never | 'b' | 'c'`. In TypeScript, `never` is a special type that represents the absence of any value. When used in a union, it effectively disappears, leaving `'b' | 'c'` as the result.

The `never` type in this context is used to "remove" or "exclude" members of the union type `T` that are assignable to `U`, hence the name `MyExclude`.
