# Notes

This challenge is to recreate the TS core library utility type
[`Pick<Type, Keys>`](https://www.typescriptlang.org/docs/handbook/utility-types.html#picktype-keys) which:

> Constructs a type by picking the set of properties `Keys` (string literal
> or union of string literals) from `Type`.

For example, suppose we have the following `Car` type:

```ts
type Car = {
  make: string
  model: string
  price: number
}
```

We can create a new type `CarWithoutPrice` by picking some of `Car`'s
properties:

```ts
type CarWithoutPrice = Pick<Car, 'make' | 'model'>

const car: CarWithoutPrice = {
  make: 'tesla',
  model: '3',
}
```

## Solution

To solve this we can use the
[`keyof`](https://www.typescriptlang.org/docs/handbook/2/keyof-types.html)
type operator in combination with
[Mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html).

### `keyof`

> The `keyof` operator takes an object type and produces a string or numeric
> literal union of its keys.

Example:

```ts
type Point = {
  x: number
  y: number
}

type Coordinate = keyof Point

const coord: Coordinate = 'x' // can also be 'y' but nothing else
```

### Mapped types

> A **mapped type** is a generic type which uses a union of `PropertyKey`s
> (frequently created via a `keyof`) to iterate through keys to create a
> type.

For example, suppose we want to create a type `BoolPoint` based on `Point`
except where its `x` and `y` properties are booleans instead of numbers. We
can create a generic mapped type `ToBooleans` to handle this:

```ts
type ToBooleans<T> = {
  [property in keyof T]: boolean
}
```

Now we can pass `Point` to `ToBooleans` to generate our desired `BoolPoint`
type:

```ts
type BoolPoint = ToBooleans<Point>

const boolPoint: BoolPoint = {
  x: true,
  y: false,
}
```

### Implementation

Define a generic type `MyPick` with two type parameters `T` and `K` where `K extends keyof T` so that `K` can only contain keys found in `T` (a [generic
constraint](https://www.typescriptlang.org/docs/handbook/2/generics.html#generic-constraints)).

Inside the body of `MyPick`, `P` is declared as a key
[`in`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#in)
`K` mapping the keys of `K` to the types of `T` using the syntax: `[P in K]: T[P]`

```ts
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P]
}
```
