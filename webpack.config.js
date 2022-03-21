const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  // if the project is based on js files set entry to index.js
  // common
  entry: './src/index.tsx',

  resolve: {
    extensions: ['.tsx', '.js', '.ts'],
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['ts-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(m?js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['@babel/plugin-transform-runtime', '@babel/plugin-proposal-logical-assignment-operators'],
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
              cacheCompression: false,
              compact: false,
            },
          },
          // 'eslint-loader',
        ],
      },

      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // style-loader : is used to generate inline styling from css files.
          // 'style-loader',
          // MiniCssExtractPlugin.loader: is used to generate css separate css files into smaller ones. It can be controlled by injecting some property to link tag of css resource.
          MiniCssExtractPlugin.loader,
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
          // 'postcss-loader',
          // 'sass-loader',
        ],
      },

      {
        test: /\.(jpe?g|png|gif|svg|webp|ico)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/[name]-[contenthash].[ext]',
          limit: 10000,
        },
      },

      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        loader: 'url-loader',
        type: 'asset/resource',
      },
    ],
  },

  plugins: [
    new Dotenv(),

    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
      attributes: {
        rel: 'preload',
        as: 'style',
      },
    }),

    // new InterpolateHtmlPlugin({ PUBLIC_URL: '/' }),

    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'initial',
      as(entry) {
        if (/\.css$/.test(entry)) return 'style';
        if (/\.woff$/.test(entry)) return 'font';
        if (/\.png$/.test(entry)) return 'image';
        return 'script';
      },
    }),

    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      // publicPath: publicUrlOrPath,
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main.filter((fileName) => !fileName.endsWith('.map'));

        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        };
      },
    }),

    // Moment.js is an extremely popular library that bundles large locale files
    // by default due to how webpack interprets its code. This is a practical
    // solution that requires the user to opt into importing specific locales.
    // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
    // You can remove this if you don't use Moment.js:
    // new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
};
