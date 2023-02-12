import { assertEquals } from "https://deno.land/std@0.177.0/testing/asserts.ts";
import { Result } from "./mod.ts";

Deno.test({
    name: 'Initialization test',
    fn() {
        const r = Result.from('h');
        assertEquals(true ,r instanceof Result)
    }
})