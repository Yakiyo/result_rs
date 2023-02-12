import { assert } from 'https://deno.land/std@0.177.0/testing/asserts.ts';
import { Err, Ok, Result } from './mod.ts';

Deno.test('Initialization test', () => {
	const r = Result.from(() => 'Test');
	assert(r instanceof Result);
});

Deno.test('Ok test', () => {
	const result = Ok('Test');
	assert(result.is_ok());
});

Deno.test('Err test', () => {
	const result = Err('Error');
	assert(result.is_err());
});
