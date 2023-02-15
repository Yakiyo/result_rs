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

	is_ok() {
		return this._ok;
	}

	is_ok_and(f: (t: T) => boolean) {
		return this.is_ok() && f(this.value as T);
	}

	is_err() {
		return !this.is_ok();
	}

	is_err_and(f: (t: E) => boolean) {
		return this.is_err() && f(this.value as E);
	}

	// TODO: Use Options
	ok() {
		return this.is_ok() ? this.value : null;
	}

	// TODO: Use Options
	err() {
		return this.is_err() ? this.value : null;
	}

	map<U>(f: (t: T) => U) {
		return this.is_err()
			? Err<E, U>(this.value as E)
			: Ok<U, E>(f(this.value as T));
	}

	map_or<U>(def: U, f: (t: T) => U) {
		return this.is_err() ? def : f(this.value as T);
	}

	map_or_else<U>(e: (t: E) => U, f: (t: T) => U) {
		if (this.is_ok()) {
			return f(this.value as T);
		}
		return e(this.value as E);
	}

	map_err<O>(f: (t: E) => O) {
		return this.is_ok()
			? Ok<T, O>(this.value as T)
			: Err<O, T>(f(this.value as E));
	}

	inspect(f: (t: T) => void) {
		if (this.is_ok()) f(this.value as T);

		return this;
	}

	inspect_err(f: (t: E) => void) {
		if (this.is_err()) f(this.value as E);
		return this;
	}

	*iter() {
		if (this.is_ok()) yield this.value;
	}

	expect(msg: string) {
		if (this.is_ok()) return this.value as T;
		throw new Error(msg);
	}

	unwrap() {
		if (this.is_ok()) return this.value as T;
		throw this.value;
	}

	unwrap_or_default(def: T) {
		if (this.is_ok()) return this.value as T;
		return def;
	}

	expect_err(msg: string) {
		if (this.is_err()) return this.value as E;
		throw new Error(msg);
	}

	unwrap_err() {
		if (this.is_err()) return this.value as E;
		throw this.value as T;
	}

	into_ok() {
		if (this.is_ok()) return this.value as T;
	}

	into_err() {
		if (this.is_err()) return this.value as E;
	}

	and<U>(res: Result<U, E>) {
		if (this.is_ok()) return res;
		return Err<E, U>(this.value as E);
	}

	and_then<U>(f: () => Result<U, E>) {
		if (this.is_ok()) return f();
		return Err<E, U>(this.value as E);
	}

	or<F>(res: Result<T, F>) {
		if (this.is_err()) return res;
		return Ok<T, F>(this.value as T);
	}

	or_else<F>(f: (t: E) => Result<T, F>) {
		if (this.is_err()) return f(this.value as E);
		return Ok<T, F>(this.value as T);
	}

	unwrap_or<U>(def: U) {
		if (this.is_ok()) return this.unwrap();
		return def;
	}

	unwrap_or_else<U>(f: (t: T) => U) {
		if (this.is_ok()) return this.unwrap();
		return f(this.value as T);
	}

	contains(x: T) {
		return this.is_ok() && this.value === x;
	}

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
