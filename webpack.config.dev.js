const { merge } = require('webpack-merge');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const CommonWebpackConfig = require('./webpack.config');

module.exports = merge(CommonWebpackConfig, {
  mode: 'development',
  devtool: 'source-map',
  bail: false,

  output: {
    // this property affect only the files loaded at initial load.
    filename: '[name].[contenthash:8].bundle.js',
    // publicPath: '/',
    // this property affects the files loaded dynamically.
    chunkFilename: '[name].[contenthash:8].chunk.js',
    pathinfo: true,
    publicPath: 'auto',
  },

  devServer: {
    port: 'auto',
    historyApiFallback: true,
    open: true,
    hot: true,

    client: {
      overlay: {
        errors: true,
        warnings: true,
      },
      progress: true,
      reconnect: true,
    },

    static: {
      directory: path.join(__dirname, 'public'),

      staticOptions: {
        redirect: true,
        immutable: true,
        maxAge: 31104000000,
      },
    },
  },

  optimization: {
    // split the runtime chunck from the main bundle because for every build it will have modification made inside it.
    //Therefore this is usefull for preventing unnecessary compilation and recaching.
    runtimeChunk: 'single',

    // this line of code will prevent generating a new ID [caching pusrpose] to vendors, while making any change to main bundle file.
    moduleIds: 'deterministic',
    minimize: false,

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

  plugins: [
    new HtmlWebpackPlugin({
      // if you want to provide your own file, add this line of code to detect the path of the file.
      // otherwise let it empty.
      template: path.resolve('./index.html'),
    }),

    new InterpolateHtmlPlugin({ PUBLIC_URL: '/' }),
  ],
});
