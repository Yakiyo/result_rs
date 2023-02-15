export class Result<T, E> {
	private value: T | E;
	private _ok: boolean;

	private constructor(f: () => T) {
		try {
			this.value = f();
			this._ok = true;
		} catch (e) {
			this.value = e as E;
			this._ok = false;
		}
	}

	static from<T, E = unknown>(f: () => T) {
		return new Result<T, E>(f);
	}

	/**
	 * Returns true if result is Ok
	 */
	is_ok() {
		return this._ok;
	}

	/**
	 * Returns true if the result is Ok and the value inside of it matches a predicate.
	 */
	is_ok_and(f: (t: T) => boolean) {
		return this.is_ok() && f(this.value as T);
	}

	/**
	 * Returns true if the result is Err
	 */
	is_err() {
		return !this.is_ok();
	}

	/**
	 * Returns true if the result is Err and the value inside of it matches a predicate.
	 */
	is_err_and(f: (t: E) => boolean) {
		return this.is_err() && f(this.value as E);
	}

	// TODO: Use Options
	/**
	 * Returns value if result is Ok else undefined
	 */
	ok() {
		return this.is_ok() ? this.value : null;
	}

	// TODO: Use Options
	/**
	 * Returns error if result is Err else undefined
	 */
	err() {
		return this.is_err() ? this.value : null;
	}

	/**
	 * Maps a Result<T, E> to Result<U, E> by applying a function to a contained Ok value, leaving an Err value untouched.
	 * This function can be used to compose the results of two functions.
	 */
	map<U>(f: (t: T) => U) {
		return this.is_err()
			? Err<E, U>(this.value as E)
			: Ok<U, E>(f(this.value as T));
	}

	/**
	 * Returns the provided default (if Err), or applies a function to the contained value (if Ok),
	 */
	map_or<U>(def: U, f: (t: T) => U) {
		return this.is_err() ? def : f(this.value as T);
	}

	/**
	 * Maps a Result<T, E> to U by applying fallback function e to a contained Err value,
	 * or function f to a contained Ok value.
	 *
	 * This function can be used to unpack a successful result while handling an error.
	 */
	map_or_else<U>(e: (t: E) => U, f: (t: T) => U) {
		if (this.is_ok()) {
			return f(this.value as T);
		}
		return e(this.value as E);
	}

	/**
	 * Maps a Result<T, E> to Result<T, F> by applying a function to a contained Err value, leaving an Ok value untouched.
	 */
	map_err<O>(f: (t: E) => O) {
		return this.is_ok()
			? Ok<T, O>(this.value as T)
			: Err<O, T>(f(this.value as E));
	}

	/**
	 * Calls the provided closure with a reference to the contained value (if Ok).
	 */
	inspect(f: (t: T) => void) {
		if (this.is_ok()) f(this.value as T);

		return this;
	}

	/**
	 * Calls the provided closure with a reference to the contained error (if Err).
	 */
	inspect_err(f: (t: E) => void) {
		if (this.is_err()) f(this.value as E);
		return this;
	}

	/**
	 * Returns an iterator over the possibly contained value.
	 * The iterator yields one value if the result is Result::Ok, otherwise none.
	 */
	*iter() {
		if (this.is_ok()) yield this.value as T;
	}

	/**
	 * Returns the contained value (if Ok) else throws an error with the message provided
	 */
	expect(msg: string) {
		if (this.is_ok()) return this.value as T;
		throw new Error(msg);
	}

	/**
	 * Returns the contained value (if Ok) else throws the contained error
	 */
	unwrap() {
		if (this.is_ok()) return this.value as T;
		throw this.value;
	}

	/**
	 * Returns the contained value (if Ok) else the default value
	 */
	unwrap_or_default(def: T) {
		if (this.is_ok()) return this.value as T;
		return def;
	}

	/**
	 * Returns the contained error (if Err) else throws an error with the message provided
	 */
	expect_err(msg: string) {
		if (this.is_err()) return this.value as E;
		throw new Error(msg);
	}

	/**
	 * Returns the contained error (if Err) else throws the contained value
	 */
	unwrap_err() {
		if (this.is_err()) return this.value as E;
		throw this.value as T;
	}

	/**
	 * Returns the contained value (if Ok) else undefined
	 */
	into_ok() {
		if (this.is_ok()) return this.value as T;
	}

	/**
	 * Returns the contained error (if Err) else undefined
	 */
	into_err() {
		if (this.is_err()) return this.value as E;
	}

	/**
	 * Returns res if Ok else a new Err variant of the contained error
	 */
	and<U>(res: Result<U, E>) {
		if (this.is_ok()) return res;
		return Err<E, U>(this.value as E);
	}

	/**
	 * Calls the predicate if Ok else returns a new Err variant of the contained error
	 */
	and_then<U>(f: () => Result<U, E>) {
		if (this.is_ok()) return f();
		return Err<E, U>(this.value as E);
	}

	/**
	 * Returns res if Err else returns a new Ok variant of the contained value
	 */
	or<F>(res: Result<T, F>) {
		if (this.is_err()) return res;
		return Ok<T, F>(this.value as T);
	}

	/**
	 * Calls the predicate if Err else returns a new Ok variant of the contained value
	 */
	or_else<F>(f: (t: E) => Result<T, F>) {
		if (this.is_err()) return f(this.value as E);
		return Ok<T, F>(this.value as T);
	}

	/**
	 * Returns the contained Ok value or a provided default
	 */
	unwrap_or<U>(def: U) {
		if (this.is_ok()) return this.unwrap();
		return def;
	}

	/**
	 * Returns the contained Ok value or computes it from a closure.
	 */
	unwrap_or_else<U>(f: (t: T) => U) {
		if (this.is_ok()) return this.unwrap();
		return f(this.value as T);
	}

	/**
	 * Boolean indicating wether the Result is an Ok containing the provided value
	 */
	contains(x: T) {
		return this.is_ok() && this.value === x;
	}

	/**
	 * Boolean indicating wether the Result is an Err containing the provided value
	 */
	contains_err(e: E) {
		return this.is_err() && this.value === e;
	}
}

export function Ok<T, E = unknown>(v: T) {
	return Result.from<T, E>(() => v);
}

export function Err<E, T = unknown>(e: E) {
	return Result.from<T, E>(() => {
		throw e as E;
	});
}
