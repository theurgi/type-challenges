# Awaited

The challenge is to recreate the TypeScript builtin type [`Awaited`](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype)
which unwraps a type from a Promise or nested Promises.

## TypeScript Conditional Types

To solve this, we'll use a TypeScript feature known as **conditional types**. Conditional types allow us to choose the type based on a condition. They can be used to extract types wrapped in other types, such as promises.

```ts
type SomeType = boolean extends true ? string : number

let someVariable: SomeType
```

In the above example, `SomeType` will always be of type `number` because `boolean extends true` is `false`. This is because a conditional type in the form: `TypeA extends TypeB`, checks whether `TypeA` is a subtype of `TypeB`. `boolean` is not a subtype of `true`, it's the opposite, `true` is a subtype of `boolean`.

## The Awaited Type

To create an `Awaited` type, we first need to understand that Promises in TypeScript can be represented as `Promise<T>`, where `T` is the type of the value that the promise resolves to.

We can use conditional types to unwrap the Promise type:

```ts
type MyAwaited<T> = T extends Promise<infer U> ? U : T
```

The conditional type `T extends Promise<infer U> ? U : T` can be read as follows:

- If `T` can be assigned to `Promise<U>` for some `U` (i.e., `T` extends `Promise<U>`), then the result is `U`.
- Otherwise, if `T` cannot be assigned to any `Promise<U>`, then the result is `T` itself.

The `infer` keyword is used in conditional types to infer the type that is being extended. Here it's used to infer the type `U` that `Promise<U>` wraps.

Let's consider a few examples:

1. If `T` is `Promise<string>`, then `U` is inferred to be `string`. So, `T extends Promise<infer U> ? U : T` will resolve to `string`.

   ```ts
   type T = Promise<string>
   type Result = T extends Promise<infer U> ? U : T
   // Result is string
   ```

2. If `T` is `Promise<number>`, then `U` is inferred to be `number`. So, `T extends Promise<infer U> ? U : T` will resolve to `number`.

   ```ts
   type T = Promise<number>
   type Result = T extends Promise<infer U> ? U : T
   // Result is number
   ```

3. If `T` is `string` (not a Promise), then `T` does not extend `Promise<U>` for any `U`, so `T extends Promise<infer U> ? U : T` will resolve to `T`, which is `string`.

   ```ts
   type T = string
   type Result = T extends Promise<infer U> ? U : T
   // Result is string
   ```

This allows us to "unwrap" the type that a Promise resolves to, or leave the type as-is if it's not a Promise.

### Recursive solution

To handle nested Promises, we add a recursive step. We reapply `MyAwaited` to `U` if `U` itself extends `Promise<something>`.

Here's the updated recursive solution:

```ts
type MyAwaited<T> = T extends Promise<infer U>
  ? U extends Promise<infer V>
    ? MyAwaited<V>
    : U
  : T
```

## Implementation

For better handling of the [`PromiseLike`](https://microsoft.github.io/PowerBI-JavaScript/interfaces/_node_modules_typedoc_node_modules_typescript_lib_lib_es5_d_.promiselike.html) objects (including nested Promise), we will improve our solution:

```ts
type MyAwaited<T extends PromiseLike<any | PromiseLike<any>>> =
  T extends PromiseLike<infer U>
    ? U extends PromiseLike<any>
      ? MyAwaited<U>
      : U
    : never
```

In this solution, `MyAwaited` receives a type `T` that must extend `PromiseLike<any | PromiseLike<any>>`. Then, it checks if `T` is `PromiseLike` of some type `U`. If `U` is itself `PromiseLike<any>`, the function re-applies `MyAwaited` to `U` recursively. If `U` is not `PromiseLike<any>`, `U` is returned as the result. If `T` doesn't match the requirements, `never` is returned.
