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

	static from<T, E>(f: () => T) {
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

	ok() {
		return this.is_ok() ? this.value : null;
	}

	err() {
		return this.is_err() ? this.value : null;
	}

	map<U>(f: (t: T) => U) {
		return this.is_err()
			? Err<U, E>(this.value as E)
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
			: Err<T, O>(f(this.value as E));
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
}

export function Ok<T, E>(v: T) {
	return Result.from<T, E>(() => v);
}

export function Err<T, E>(e: E) {
	return Result.from<T, E>(() => {
		throw e as E;
	});
}
