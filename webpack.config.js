const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATHS = {
    SOURCE: path.join(__dirname, 'src'),
    BUILD: path.join(__dirname, 'build')
};

module.exports = {
    // Entry accepts a path or an object of entries. We'll be using the
    // latter form given it's convenient with more complex configurations.
    entry: [
        'webpack-dev-server/client?http://0.0.0.0:8080',
        'webpack/hot/only-dev-server',
        path.join(PATHS.SOURCE, 'index.js')
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'react-hot!babel'
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style',
                  'css?modules&camelCase&importLoaders=1' +
                  '&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
            },
            {
                test: /\.json$/,
                exclude: /node_modules/,
                loader: 'json'
            }
        ]
    },
    devServer: {
        contentBase: './build',
        hot: true,
        proxy: {
            '/api/*': {
                target: 'http://127.0.0.1:3000',
                secure: false,
            },
        },
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    output: {
        path: PATHS.BUILD,
        publicPath: '/assets/',
        filename: 'bundle.js'
    },
    plugins: [
        new ExtractTextPlugin('app.css', { allChunks: true }),
        new webpack.HotModuleReplacementPlugin()
    ]

};
