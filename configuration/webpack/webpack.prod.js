const path = require('path');
const glob = require('glob');

const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const entryFiles = glob
  .sync(path.resolve('src/components/*.jsx'))
  .reduce((prevValue, currValue) => {
    if (typeof prevValue === 'string') {
      return {
        [path.basename(prevValue, path.extname(prevValue))]: prevValue,
        [path.basename(currValue, path.extname(currValue))]: currValue,
      };
    }
    return {
      ...prevValue,
      [path.basename(currValue, path.extname(currValue))]: currValue,
    };
  });

module.exports = {
  target: 'web',

  mode: 'production',

  entry: entryFiles,

  output: {
    libraryTarget: 'commonjs',
    path: path.resolve('build/components'),
    filename: '[name].js',
    publicPath: '/build/components',
  },

  resolve: {
    symlinks: true,
    extensions: ['.js', '.jsx', '.ts'],
    alias: {
      react: path.resolve('./node_modules/react'),
    },
  },

  externals: [
    {
      react: {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react',
      },
    },
    {
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom',
      },
    },
    { 'styled-components': 'styled-components' },
    { process: 'process' },
    {
      '@fortawesome/fontawesome-svg-core':
        '@fortawesome/fontawesome-svg-core',
    },
    {
      '@fortawesome/free-solid-svg-icons':
        '@fortawesome/free-solid-svg-icons',
    },
    { '@fortawesome/react-fontawesome': '@fortawesome/react-fontawesome' },
    { 'framer-motion': 'framer-motion' },
    { '@fowapps/fow-ui': '@fowapps/fow-ui' },
  ],

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
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
            loader: 'url-loader',
          },
        ],
      },
    ],
  },

  plugins: [new CleanWebpackPlugin(), new webpack.ProgressPlugin()],
  stats: 'errors-warnings',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          format: {
            comments: false,
          },
        },
        extractComments: false,
      }),
    ],
  },
};
