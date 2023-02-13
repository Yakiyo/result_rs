import { Err } from './Result/err.ts';
import { Ok } from './Result/ok.ts';

export type Result<T, E> = Ok<T> | Err<E>;

export namespace Result {
	export function from<T, E = unknown>() {}
}
