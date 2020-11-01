const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
const webpack = require('webpack');

module.exports = (_, argv) => {
  return {
    mode: argv.mode === 'production' ? 'production' : 'development',
    devtool: argv.mode === 'production' ? 'source-map' : 'source-map',
    bail: argv.mode === 'production' ? true : false,
    entry: './src/index.js',

    output: {
      path: __dirname + '/dist',
      publicPath: '/',
      filename: 'bundle.js',
    },

    devServer: {
      // this is for dev mode.
      //contentBase: './dist',
      // this is only for production mode.
      contentBase: './dist',
    },

    optimization: {
      minimize: argv.mode === 'production' ? true : false,
      minimizer: [new OptimizeCSSAssetsPlugin({}), new TerserJSPlugin()],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                plugins: ['@babel/plugin-transform-runtime'],
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                cacheCompression: false,
                compact: false,
              },
            },
            'eslint-loader',
          ],
        },

        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'awesome-typescript-loader',
        },

        {
          test: /\.css$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              // active these options, while you want to use css files as modules.
              // so the files will be imported like a js module.
              // eg: import classes from "./style.css".
              // access to the class using => classes.className.
              options: {
                // while using the style as modules, it would be recommended to use camelcase format to name classes.
                // modules: true,
              },
            },
          ],
        },

        {
          test: /\.(jpe?g|png|gif|svg)$/,
          loader: 'file-loader',
          options: {
            publicPath: 'assets',
            name: '[name]-[contenthash].[ext]',
            limit: 10000,
          },
        },
      ],
    },

    plugins: [
      new webpack.HashedModuleIdsPlugin(),
      new HtmlWebpackPlugin({
        // if you want to provide your own file, add this line of code to detect the path of the file.
        // otherwise let it empty.
        template: path.resolve('./index.html'),
        ...(argv.mode === 'production'
          ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true,
              },
            }
          : null),
      }),

      // import these files as cdn, in order to decrease the bundle size.
      // rather than supply them in bundle, they get served as cdn(link).
      new DynamicCdnWebpackPlugin({
        env: 'production',
        only: ['react', 'react-dom', 'react-redux', 'redux', 'react-router-dom', 'redux-thunk', 'axios'],
      }),

      new MiniCssExtractPlugin({
        filename: '[name][contenthash].css',
        chunkFilename: '[id].css',
      }),
    ],
  };
};
