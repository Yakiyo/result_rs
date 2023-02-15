# result-rs <img src="https://github.com/Yakiyo/result-rs/actions/workflows/ci.yml/badge.svg">

Rust's [Result](https://doc.rust-lang.org/std/result/enum.Result.html)
enum ported to Typescript/Javascript

## Installation

Import the module to your code:

```ts
import { Result } from 'https://deno.land/x/result-rs/mod.ts';
```

It is also published as a [npm](npmjs.com/) module too.

```bash
$ npm i result-rs
# or using pnpm
$ pnpm add result-rs
# or yarn
$ yarn add result-rs
```

Then you can import it in your code:

```ts
// Commonjs require
const { Result } = require('result-rs');
// ES Module import
import { Result } from 'result-rs';
```

## Usage

Use the `Result.from` method to create a new instance of Result

```ts
const result = Result.from(someFunctionThatThrows);

result.is_ok(); // Returns false if function throwed an error
```

The package also exports two utility functions `Ok` and `Err` that are
useful to create Ok or Err values from simple values instead of a
function

```ts
import { Err, Ok } from 'https://deno.land/x/result_rs/mod.ts';

const ok = Ok('Hello World');

ok.is_ok(); // true;
ok.unwrap(); // 'Hello World'

const err = Err('Error value');
err.is_er(); // true;
err.unwrap(); // throws an error
```

Passing async functions to the `Result.from` method are handled like
synchronous functions. If you want to resolve the internal value's
promise, you can use the `Result.sync` method on any instance to
resolve the promise internally.

```ts
const result = Result.from(async () => 'Hello World');
result.unwrap(); // Promise<string>

await result.sync();
result.unwrap(); // 'Hello World'
```

Documentation of all methods is available
[here](https://deno.land/x/result-rs?doc).

## Author

**result-rs** © [Yakiyo](https://github.com/Yakiyo). Authored and
maintained by Yakiyo.

Released under [MIT](https://opensource.org/licenses/MIT) License
