import webpack from 'webpack';
import __dirname from './src/util/dirname.js';
import path from 'node:path';

export default (env, argv) => {
	const isProd = argv.mode === 'production';

	return {
		mode: isProd ? 'production' : 'development',
		entry: './src/react/index.jsx',
		output: {
			path: path.resolve(__dirname, 'public/js'),
			filename: '[name].bundle.js',
			chunkFilename: '[name].chunk.js',
			clean: true,
		},
		devtool: isProd ? false : 'source-map',
		optimization: {
			minimize: isProd,
			splitChunks: {
				cacheGroups: {
					vendor: {
						test: /[\\/]node_modules[\\/]/,
						name: 'vendors',
						chunks: 'all',
					},
				},
			},
		},
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
					},
				},
			],
		},
		resolve: {
			extensions: ['.js', '.jsx'],
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.ENV': JSON.stringify(argv.mode),
			}),
		],
	};
};
