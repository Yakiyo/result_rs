import type { Ok } from './ok.ts';
import type { Err } from './err.ts';
import { Result } from '../result.ts';

export interface Variant<T, E> {
	/**
	 * Returns true if result is Ok
	 */
	is_ok(): this is Ok<T>;

	/**
	 * Returns true if the result is Ok and the value inside of it matches a predicate.
	 */
	is_ok_and<O extends boolean>(f: (v: T) => O): this is Ok<T> & O;

	/**
	 * Returns true if the result is Err
	 */
	is_err(): this is Err<E>;

	/**
	 * Returns true if the result is Err and the value inside of it matches a predicate.
	 */
	is_err_and<O extends boolean>(f: (v: E) => O): this is Err<E> & O;

	// TODO: Use options
	/**
	 * Returns value if result is Ok else undefined
	 */
	ok(): T | undefined;

	// TODO: Use options
	/**
	 * Returns error if result is Err else undefined
	 */
	err(): E | undefined;

	/**
	 * Maps a Result<T, E> to Result<U, E> by applying a function to a contained Ok value, leaving an Err value untouched.
	 * This function can be used to compose the results of two functions.
	 */
	map<U>(f: (v: T) => U): Result<U, E>;

	/**
	 * Returns the provided default (if Err), or applies a function to the contained value (if Ok),
	 */
	map_or<U>(def: U, f: (v: T) => U): U;

	/**
	 * Maps a Result<T, E> to Result<T, F> by applying a function to a contained Err value, leaving an Ok value untouched.
	 */
	map_err<F>(f: (v: E) => F): Result<T, F>;
}
