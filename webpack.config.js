const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.css$/,  // Add this rule(CSS)
                use: ['style-loader', 'css-loader', 'postcss-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    mode: 'development',
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map', // Set devtool based on NODE_ENV
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html', // Path to your template
            filename: 'index.html',
        }),
        new Dotenv({
            path: process.env.NODE_ENV === 'production' ? './.env.production' : './.env.development',
        })
    ]
};
