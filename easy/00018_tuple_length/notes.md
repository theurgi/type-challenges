# Tuple Length

The challenge is to create a TypeScript generic `Length<T>` that takes a tuple `T` and returns the length of the tuple.

For example, given `['tesla', 'model 3', 'model X', 'model Y']`, `Length` should return `4`.

## Solution

To solve this challenge, we can leverage the fact that in TypeScript, the `length` property of a tuple type returns the number of elements in the tuple, and that this number is itself a type.

Here's a simple example to illustrate:

```ts
type MyTuple = ['a', 'b', 'c']
type LengthOfMyTuple = MyTuple['length'] // 3
```

In the above code, `MyTuple` is a tuple type with three elements, and `MyTuple['length']` is a type representing the number `3`.

### Implementation

To implement the `Length<T>` generic, we can apply this concept to a generic parameter `T`.

We'll constrain `T` to be any array or tuple using `T extends readonly any[]`, and then use the indexed access type `T['length']` to get the length of the tuple. This can be done as follows:

```ts
type Length<T extends readonly any[]> = T['length']
```

This code reads as: `Length<T>` is the length of the tuple `T`.
