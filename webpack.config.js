const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  devtool: 'inline-source-map',

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
    contentBase: './build',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.css/,
        loader: ['css-loader', 'style-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      // if you want to provide your own file, add this line of code to detect the path of the file.
      // otherwise let it empty.
      template: path.resolve('./index.html'),
    }),
  ],
};
