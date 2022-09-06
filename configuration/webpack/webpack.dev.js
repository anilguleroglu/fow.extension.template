const path = require('path');

const cwd = process.cwd();

const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

module.exports = {
    target: 'web',

    mode: 'development',

    devtool: 'source-map',

    entry: ['react-hot-loader/patch', path.join(cwd, 'src/devIndex.js')],

    resolve: {
        extensions: ['.js', '.jsx', '.ts'],
        alias: {
            react: path.resolve('./node_modules/react'),
        },
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.ts?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(gif|jpe?g|tiff|png|webp|bmp|woff|ttf|svg|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            outputPath: 'images',
                        },
                    },
                ],
            },
        ],
    },

    plugins: [
        new ErrorOverlayPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(cwd, 'src/index.html'),
            inject: true,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProgressPlugin(),
    ],

    devServer: {
        hot: true,
        port: 9090,
        historyApiFallback: true,
    },
};
