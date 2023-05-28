# First of Array

The challenge asks us to implement a TypeScript generic `First<T>` that takes an Array `T` and returns the type of its first element.

For example, given `['a', 'b', 'c']`, `First` should return `'a'`.

## Solution

This challenge can be solved by using TypeScript's tuple types and indexed access types.

### Tuple types

In TypeScript, we can specify types for each element in an array-like data structure. These are called tuple types. Here's an example:

```ts
type MyTuple = ['a', 'b', 'c']
```

In the tuple type `MyTuple`, the first element is known to be a string `'a'`, the second element is `'b'`, and the third is `'c'`.

### Indexed access types

Indexed access types allow us to access a type at a particular index or property key, much like how we would access a value at a particular index or key in JavaScript. We use square brackets `[]` to perform an indexed access.

For example, if we have the following type:

```ts
type Point = {
  x: number
  y: number
}
```

We can access the type of property `x` as follows:

```ts
type XType = Point['x'] // XType is of type number
```

In the context of tuples, we can use indexed access types to access the type of a particular element in a tuple.

For example, given the `MyTuple` type defined above, we can get the type of the first element as follows:

```ts
type FirstElement = MyTuple[0] // FirstElement is of type 'a'
```

### Implementation

To implement the `First<T>` generic, we can extend the concept of indexed access types to a generic parameter `T`. We'll constrain `T` to be an array or tuple, and then use the indexed access type `T[0]` to access the type of the first element.

However, for the case of an empty array or tuple, we cannot access the first element as it doesn't exist. To handle this case, we'll make use of TypeScript's conditional types to return `never` when `T` is an empty tuple.

```ts
type First<T extends any[]> = T extends [] ? never : T[0]
```

This reads as: if `T` is an empty tuple, then `First<T>` is `never`; otherwise, `First<T>` is the type of the first element of `T`.
