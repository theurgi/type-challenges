# Notes

[`Readonly<Type>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#readonlytype) is
one of TypeScript's built in [utility
types](https://www.typescriptlang.org/docs/handbook/utility-types.html) which:

> Constructs a type with all properties of `Type` set to readonly, meaning the properties of the constructed type cannot be reassigned.

## Solution

Use a mapped type `[P in keyof T]: T[P]` that iterates over all the properties of the input type `T` and replaces
each property with a `readonly` version of its type:

```typescript
type MyReadonly<T> = {
  readonly [P in keyof T]: T[P]
}
```

Using `MyReadonly`, we can now rewrite the example from the challenge:

```typescript
interface Todo {
  title: string
  description: string
}

const todo: MyReadonly<Todo> = {
  title: 'Hey',
  description: 'foobar',
}

todo.title = 'Hello' // Error: Cannot assign to 'title' because it is a read-only property
todo.description = 'barFoo' // Error: Cannot assign to 'description' because it is a read-only property
```

`MyReadonly<Todo>` produces a new type that is equivalent to:

```typescript
{
  readonly title: string;
  readonly description: string;
}
```
