'use strict'

module.exports = {
	env: {
		node: true,
		es2021: true,
		browser: true,
	},
	parser: '@typescript-eslint/parser',
	extends: [
		// Cybozu様オススメは使わない。。
		// '@cybozu/eslint-config/presets/kintone-customize-es5',
		'eslint:recommended',
		'plugin:@typescript-eslint/eslint-recommended',
		'plugin:@typescript-eslint/recommended',
		'plugin:react/recommended',
		'plugin:react-hooks/recommended',
		'prettier/react',
		'prettier/@typescript-eslint',
	],
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 12,
		sourceType: 'module',
	},
	plugins: ['react', '@typescript-eslint'],
	rules: {
		'@typescript-eslint/explicit-module-boundary-types': 0,
		'react/prop-types': 0,
		// 今require禁止するといろいろ大変なことになる。。
		// '@typescript-eslint/no-var-requires': 0,
	},
	overrides: [
		{
			files: ['*.ts', '*.tsx'],
			rules: {
				'@typescript-eslint/explicit-module-boundary-types': 0,
				'react/display-name': 0,
				'@typescript-eslint/no-namespace': 0,
			},
		},
	],
	ignorePatterns: ['*.config.js', '/scripts/', '/contents/'],
}
