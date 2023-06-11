# If

This challenge involves creating a TypeScript utility type `If<C, T, F>` that works in a similar manner to a ternary operator in JavaScript, but at the type level.

The ternary operator `(condition ? valueIfTrue : valueIfFalse)` takes three arguments: a condition, a value to return if the condition is true, and a value to return if the condition is false. The result is the value chosen based on the condition.

In TypeScript, we can achieve a similar effect using conditional types. A conditional type takes a condition (which is itself a type), and two types to choose between based on the condition. The syntax for a conditional type is `type Conditional = Condition extends Base ? IfTrue : IfFalse`.

In this case, `C` will be the condition (which is expected to be either `true` or `false`), `T` will be the type chosen if `C` is `true`, and `F` will be the type chosen if `C` is `false`.

The solution for this challenge will be:

```ts
type If<C extends boolean, T, F> = C extends true ? T : F
```

Here, `C extends boolean` ensures that `C` can only be `true` or `false`. Then, if `C` is `true`, the type will be `T`, otherwise, it will be `F`.

The `extends` keyword in the context of generic constraints means that the type parameter `C` can only be `true` or `false`, which is why `If<null, 'a', 'b'>` would lead to a TypeScript error.

In the type tests, we can see that `If<true, 'a', 'b'>` will resolve to `'a'`, and `If<false, 'a', 2>` will resolve to `2`, as expected.
