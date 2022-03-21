const { merge } = require('webpack-merge');
const path = require('path');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CommonWebpackConfig = require('./webpack.config');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = merge(CommonWebpackConfig, {
  mode: 'production',
  devtool: undefined,
  bail: true,

  output: {
    path: path.resolve(__dirname + '/dist'),
    // this property affect only the files loaded at initial load.
    filename: '[name].[contenthash:8].bundle.js',
    // publicPath: '/',
    // this property affects the files loaded dynamically.
    chunkFilename: '[name].[contenthash:8].chunk.js',
    pathinfo: false,
    publicPath: 'auto',
    // remove the old generated files, and let the /dist folder clean.
    clean: true,
  },

  optimization: {
    // split the runtime chunck from the main bundle because for every build it will have modification made inside it.
    //Therefore this is usefull for preventing unnecessary compilation and recaching.
    runtimeChunk: 'single',

    // this line of code will prevent generating a new ID [caching pusrpose] to vendors, while making any change to main bundle file.
    moduleIds: 'deterministic',

    minimize: true,
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),

      new TerserJSPlugin({
        // These 2 lines of code, will allow to keep the class and file names instead of cyphering them in production mode.
        // And this is usefull for production mode, if we want to make a profiling to the app in an optimized version of the app.
        terserOptions: {
          keep_classnames: true,
          keep_fnames: true,
        },
      }),

      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            'default',
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
    ],

    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },

        // Extract the style based on the entry point.
        // If there is  multi entry points, we can specify each entry with its css file, Like down below:
        // MainStyles: {
        //   type: 'css/mini-extract',
        //   name: 'styles_main',
        //   chunks: (chunk) => {
        //     return chunk.name === 'main';
        //   },
        //   enforce: true,
        // },
      },
    },
  },

  plugins: [
    new HtmlWebpackPlugin({
      // if you want to provide your own file, add this line of code to detect the path of the file.
      // otherwise let it empty.
      template: path.resolve('./index.html'),

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
    }),

    new CopyPlugin({
      patterns: [
        {
          from: 'public',
          to: 'public',
        },
      ],
    }),

    new InterpolateHtmlPlugin({ PUBLIC_URL: '/public/' }),

    new WorkboxWebpackPlugin.GenerateSW({
      clientsClaim: true,
      exclude: [/\.map$/, /asset-manifest\.json$/],
      // importWorkboxFrom: 'cdn',
      // navigateFallback: publicUrlOrPath + 'index.html',
      // navigateFallbackBlacklist: [
      //   // Exclude URLs starting with /_, as they're likely an API call
      //   new RegExp('^/_'),
      //   // Exclude any URLs whose last part seems to be a file extension
      //   // as they're likely a resource and not a SPA route.
      //   // URLs containing a "?" character won't be blacklisted as they're likely
      //   // a route with query params (e.g. auth callbacks).
      //   new RegExp('/[^/?]+\\.[^/]+$'),
      // ],
    }),
  ],
});
