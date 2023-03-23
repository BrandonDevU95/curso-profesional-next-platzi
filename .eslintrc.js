module.exports = {
	env: {
		browser: true,
		amd: true,
		node: true,
		es6: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:jsx-a11y/recommended',
		'plugin:prettier/recommended',
		'next',
		'next/core-web-vitals',
	],
	rules: {
		semi: ['error', 'always'],
		'prettier/prettier': [
			'error',
			{
				semi: true,
				singleQuote: true,
				printWidth: 80,
				tabWidth: 2,
				useTabs: true,
				trailingComma: 'es6',
				bracketSpacing: true,
			},
		],
	},
};
