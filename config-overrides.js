/* eslint-disable no-undef */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const webpack = require('webpack');
module.exports = function override(config) {
	const fallback = config.resolve.fallback || {};
	Object.assign(fallback, {
		url: require.resolve('url'),
		crypto: require.resolve('crypto-browserify'),
		stream: require.resolve('stream-browserify'),
		assert: require.resolve('assert'),
		http: require.resolve('stream-http'),
		https: require.resolve('https-browserify'),
		os: require.resolve('os-browserify'),
	});
	/**
	 * Ignore warnings raised by source-map-loader
	 * If you are using create-react-app version >=5 you may run into issues building. This is because NodeJS polyfills are not included in the latest version of create-react-app.
	 * See:
	 * - https://github.com/web3/web3.js#troubleshooting-and-known-issues
	 * - https://github.com/facebook/create-react-app/pull/11752
	 */
	config.ignoreWarnings = [/Failed to parse source map/];
	config.resolve.fallback = fallback;
	config.plugins = (config.plugins || []).concat([
		new webpack.ProvidePlugin({
			process: 'process/browser',
			Buffer: ['buffer', 'Buffer'],
		}),
	]);

	// react-dnd
	config.module.rules.unshift({
		test: /\.m?js$/,
		resolve: {
			fullySpecified: false, // disable the behaviour
		},
	});

	// react-dnd
	config.resolve.alias = {
		...config.resolve.alias,
		'react/jsx-runtime.js': 'react/jsx-runtime',
		'react/jsx-dev-runtime.js': 'react/jsx-dev-runtime',
	};

	return config;
};
