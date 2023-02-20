export class Option<T> {
	private value: T | null;

	private constructor(v?: T) {
		if (v) this.value = v;
		else this.value = null;
	}

	private static isFunction(
		x: unknown,
	): x is (...args: readonly any[]) => any {
		return typeof x === 'function';
	}
	public static from<T>(f?: T | (() => T)) {
		if (this.isFunction(f)) {
			return new Option(f());
		}
		return new Option(f);
	}
}

export function Some<T>(input: T) {
	return Option.from(input);
}

export const None = Option.from<never>();
