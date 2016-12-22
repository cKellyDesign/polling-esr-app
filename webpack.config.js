var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './app-client.js', // sets entry js file to compile
	output: {
		path: './public',
		filename: 'bundle.js' // compile filename
	},
	module: {
		loaders: [
			{
				exlude: /(node_modules|app-server.js)/,
				loader: 'babel-loader',
				query: {
					presets: ['es2015','react'] // allows webpack to compile JSX
				}
			}
		]
	}
};