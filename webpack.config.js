/*
To run in debug mode, enter in terminal: `webpack` 
To run in production mode, enter in terminal: `NODE_ENV=production webpack`
*/

// Checks if node environment in production (debug mode)
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
	// Context is set to current directory
	context: __dirname + "/app",
	
	// If not in production, execute sourcemap
	devtool: debug ? "inline-sourcemap" : null,
	entry: "./js/app.js",
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js"
	},
	module: {
		loaders: [
			{
				test: [/\.js$/, /\.es6$/],
				loader: 'babel',
				query: {
					presets: ['es2015']
				},
				exclude: /node_modules/
			},
			{
				test: /\.html$/,
				loader: 'raw'
			},
			{
				test: /\.scss$/,
				loaders: [
					'style',
					'css',
					'autoprefixer?browsers=last 2 versions',
					'sass?outputStyle=expanded'
				]
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.es6', '.scss']
	},
	// If in production, execute minification
	plugins: debug ? [] : [
		// Removes duplicate code
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
	]
}