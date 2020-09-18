const path = require('path');
const webpack = require('webpack');
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CLIENT_DIR = "./src/front-end";
const SERVER_DIR = "./src/back-end";
const BUILD_DIR = path.join(__dirname)+"/static/";

module.exports = [
	{
		name: 'client',
		target: 'web',
		entry: CLIENT_DIR+'/client.jsx',
		output: {
			path: BUILD_DIR,
			filename: 'client.js',
			publicPath: '/static/',
		},
		resolve: {
			extensions: ['.js', '.jsx']
		},
		devtool: 'source-map',
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules\/)/,
					use: [
						{
							loader: 'babel-loader',
						}
					]
				},
				{
					test: /\.scss$/,
					use: [
						{
							loader: 'style-loader',
						},
						{
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
								localIdentName: '[hash:base64:10]',
								sourceMap: true,
								minimize:true
							}
						},
						{
							loader: 'sass-loader'
						}
					]
				},
				{
					test: /\.css$/,
					use: [
						{
							loader: 'style-loader',
						},
						{
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
								localIdentName: '[hash:base64:10]',
								sourceMap: true
							}
						}
					]
				},
				{
					test: /\.(gif|png|jpg)$/,
					use: [
						'file-loader',
						{
							loader: 'image-webpack-loader',
							options: {
								bypassOnDebug: true,
							}
						}
					],
				},
				{
            test: /\.svg$/,
            exclude: /node_modules/,
            loader: 'svg-react-loader',
            query: {
                classIdPrefix: '[name]-[hash:8]__',
                filters: [
                    function (value) {
                        // ...
                        this.update(value);
                    }
                ],
                propsMap: {
                    fillRule: 'fill-rule',
                    foo: 'bar'
                },
                xmlnsTest: /^xmlns.*$/
            }
        }
		],
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false,
				screw_ie8: true,
				drop_console: true,
				drop_debugger: true
			}
		}),
		new webpack.optimize.OccurrenceOrderPlugin(),
		new webpack.optimize.DedupePlugin()
	]
},
{
	name: 'server',
	target: 'node',
	entry: SERVER_DIR+'/serverRenderer.jsx',
	output: {
		path: BUILD_DIR,
		filename: 'server.js',
		libraryTarget: 'commonjs2',
		publicPath: '/static/',
	},
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.jsx']
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules\/)/,
				use: [
					{
						loader: 'babel-loader',
					}
				]
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "isomorphic-style-loader",
					use: [
						{
							loader: 'css-loader',
							options: {
								modules: true,
								importLoaders: 1,
								localIdentName: '[hash:base64:10]',
								sourceMap: true
							}
						},
						{
							loader: 'sass-loader'
						}
					]
				})
			},
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "isomorphic-style-loader",
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize:true
							}
						}
					]
				})
			},
			{
				test: /\.(png|jpe?g)$/,
				use: ['file-loader?name=img/[name].[ext]']
			},
			{
            test: /\.svg$/,
            exclude: /node_modules/,
            loader: 'svg-react-loader',
            query: {
                classIdPrefix: '[name]-[hash:8]__',
                filters: [
                    function (value) {
                        // ...
                        this.update(value);
                    }
                ],
                propsMap: {
                    fillRule: 'fill-rule',
                    foo: 'bar'
                },
                xmlnsTest: /^xmlns.*$/
            }
        }
	]
},
plugins: [
	new ExtractTextPlugin({
		filename: 'styles.css',
		allChunks: true
	}),
	new OptimizeCssAssetsPlugin({
		cssProcessorOptions: { discardComments: { removeAll: true } }
	}),
]
}
];
