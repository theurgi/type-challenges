//
// ────────────────────────────────── SOLUTION ─────────────────────────────────
//

type MyReadonly<T> = {
	readonly [P in keyof T]: T[P]
}

//
// ──────────────────────────────────── TEST ───────────────────────────────────
//

import type { Equal, Expect } from '@type-challenges/utils'

type cases = [Expect<Equal<MyReadonly<Todo1>, Readonly<Todo1>>>]

interface Todo1 {
	title: string
	description: string
	completed: boolean
	meta: {
		author: string
	}
}

const todo: MyReadonly<Todo1> = {
	title: 'Hey',
	description: 'foobar',
	completed: false,
	meta: {
		author: 'John',
	},
}

// @ts-expect-error
todo.title = 'Hello' // Error: Cannot assign to 'title' because it is a read-only property
