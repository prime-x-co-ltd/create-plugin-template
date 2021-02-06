const path = require('path')
const Dotenv = require('dotenv-webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const KintonePlugin = require('@kintone/webpack-plugin-kintone-plugin')

module.exports = {
	// mode: 'development',
	mode: 'production',
	entry: {
		config: './src/config/index.tsx',
		desktop: './src/desktop/index.tsx',
		api: './src/config/kintoneAPI.ts',
	},
	output: {
		path: path.resolve(__dirname, 'contents/js'),
		filename: '[name].js',
	},
	devServer: {
		contentBase: path.resolve(__dirname, 'public'),
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /(\.js|\.jsx)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env', '@babel/react'],
							plugins: ['@babel/plugin-transform-runtime'],
						},
					},
				],
			},
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
		mainFields: ['module', 'main'],
	},
	plugins: [
		new HtmlWebpackPlugin({
			// filename: path.resolve(__dirname, 'contents/html/config.html'),
			template: path.resolve(__dirname, 'public/config.html'),
		}),
		new Dotenv(),
		new KintonePlugin({
			manifestJSONPath:
				'./contents/manifest.json' /* 参照するmanifest.json */,
			privateKeyPath: './dist/contents.ppk' /* 参照するprivate-key */,
			pluginZipPath: './dist/contents.zip' /* 生成するzipのpath */,
		}),
	],
}
