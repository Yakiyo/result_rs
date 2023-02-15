import {
	build,
	emptyDir,
} from 'https://deno.land/x/dnt@0.33.1/mod.ts';

const version = Deno.args[0] ?? null;

if (!version) {
	throw 'Version not passed to script invocation';
}

await emptyDir('./npm');

await build({
	entryPoints: ['./mod.ts'],
	outDir: './npm',
	packageManager: 'pnpm',
	shims: {
		// see JS docs for overview and more options
		deno: true,
	},
	package: {
		// package.json properties
		name: 'result-rs',
		version,
		description:
			'Rust\'s Result struct ported to Typescript/Javascript',
		license: 'MIT',
		repository: {
			type: 'git',
			url: 'git+https://github.com/Yakiyo/result-rs.git',
		},
		bugs: {
			url: 'https://github.com/Yakiyo/result-rs/issues',
		},
	},
});

// post build steps
Deno.copyFileSync('LICENSE', 'npm/LICENSE');
Deno.copyFileSync('README.md', 'npm/README.md');
