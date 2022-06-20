
//@ts-check
'use strict';

//@ts-check
/** @typedef {import('webpack').Configuration} WebpackConfig **/

const path = require('path');
const webpack = require('webpack');

module.exports = /** @type WebpackConfig */ {
	mode: 'none', // this leaves the source code as close as possible to the original (when packaging we set this to 'production')
	target: 'webworker', // extensions run in a webworker context
	entry: {
		'extension': './src/extension.ts'
	},
	resolve: {
		mainFields: ['module', 'main'],
		extensions: ['.ts', '.js'], // support ts-files and js-files
		alias: {
		},
		fallback: {
			'assert': require.resolve('assert'),
      'path': require.resolve('path-browserify')
		}
	},
	module: {
		rules: [{
			test: /\.ts$/,
			exclude: /node_modules/,
			use: [
				{
					loader: 'ts-loader'
				}
			]
		}]
	},
	plugins: [
		new webpack.ProvidePlugin({
			process: 'process/browser',
		}),
	],
	externals: {
		'vscode': 'commonjs vscode', // ignored because it doesn't exist
	},
	performance: {
		hints: false
	},
	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'build/vsc-extension/src'),
		libraryTarget: 'commonjs'
	},
	devtool: 'nosources-source-map'
};