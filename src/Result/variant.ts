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

	/**
	 * Calls the provided closure with a reference to the contained value (if Ok).
	 */
	inspect(f: (v: T) => any): this;

	/**
	 * Calls the provided closure with a reference to the contained error (if Err).
	 */
	inspect_err(f: (v: E) => any): this;

	/**
	 * Returns an iterator over the possibly contained value.
	 * The iterator yields one value if the result is Result::Ok, otherwise none.
	 */
	iter(): Generator<T>;

	/**
	 * Returns the contained value (if Ok) else throws an error with the message provided
	 */
	expect(msg: string): T;

	/**
	 * Returns the contained value (if Ok) else throws the contained error
	 */
	unwrap(): T;

	/**
	 * Returns the contained value (if Ok) else the default value
	 */
	unwrap_or_default<V>(def: V): T | V;

	/**
	 * Returns the contained error (if Err) else throws an error with the message provided
	 */
	expect_err(msg: string): E;

	/**
	 * Returns the contained error (if Err) else throws the contained value
	 */
	unwrap_err(): E;

	/**
	 * Returns the contained value (if Ok) else undefined
	 */
	into_ok(): T | undefined;

	/**
	 * Returns the contained error (if Err) else undefined
	 */
	into_err(): T | undefined;

	/**
	 * Returns res if Ok else a new Err variant of the contained error
	 */
	and<R>(res: Result<R, E>): Result<R, E>;

	/**
	 * Calls the predicate if Ok else returns a new Err variant of the contained error
	 */
	and_then<U>(f: (v: T) => Result<U, E>): Result<U, E>;

	/**
	 * Returns res if Err else returns a new Ok variant of the contained value
	 */
	or<R>(res: Result<T, R>): Result<T, R>;

	/**
	 * Calls the predicate if Err else returns a new Ok variant of the contained value
	 */
	or_else<R>(f: (v: E) => Result<T, R>): Result<T, R>;

	/**
	 * Returns the contained Ok value or a provided default
	 */
	unwrap_or<U>(def: U): T | U;

	/**
	 * Returns the contained Ok value or computes it from a closure.
	 */
	unwrap_or_else<U>(f: (v: E) => U): T | U;

	/**
	 * Returns the Ok value without checking that the value is not Err
	 */
	unwrap_unchecked(): T;

	/**
	 * Returns the Err value without checking that the value is not Ok
	 */
	unwrap_err_unchecked(): E;

	/**
	 * Boolean indicating wether the Result is an Ok containing the provided value
	 */
	contains(v: T): boolean;

	/**
	 * Boolean indicating wether the Result is an Err containing the provided value
	 */
	contains_err(v: E): boolean;
}
