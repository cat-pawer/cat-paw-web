module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		"eslint:recommended",
		"plugin:react/recommended",
		"plugin:jsx-a11y/recommended",
		"plugin:prettier/recommended",
		"plugin:react-hooks/recommended",
		"plugin:@typescript-eslint/eslint-recommended",
		"plugin:@typescript-eslint/recommended",
		"react-app",
		"react-app/jest",
		"prettier"
	],
	overrides: [
		{
			env: {
				node: true,
			},
			files: [".eslintrc.{js,cjs}"],
			parserOptions: {
				sourceType: "script",
			},
		},
	],
	parserOptions: {
		ecmaFeatures: {
			"jsx": true
		},
		ecmaVersion: "latest",
		sourceType: "module",
	},
	plugins: ["react", "@typescript-eslint",'react-hooks', 'jsx-a11y'],
	rules: {
		"prettier/prettier": [
			"error",
			{
				useTabs: false,
				endOfLine: 'auto',
			}
		],
		'react/react-in-jsx-scope': 'off',
	},
	settings: {
		"react": {
			"version": "detect"
		}
	}
};
