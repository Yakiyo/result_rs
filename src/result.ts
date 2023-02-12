export class Result<T, E = unknown> {
	private value: T | E;

	private constructor(f: () => T) {
		try {
			this.value = f();
		} catch (e) {
			this.value = e as E;
		}
	}

	public static from(f: unknown | (() => unknown)) {
		if (typeof f !== 'function') {
			return new Result(() => {
				return f;
			});
		}
		// @ts-ignore: ts is freaking out cz f is a function here
		return new Result(f);
	}
}