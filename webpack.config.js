const { resolve } = require("path");
const { merge } = require("webpack-merge");
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const _mergeConfig = require(`./config/webpack.${_mode}.js`);
const _modeflag = _mode === 'production' ? true : false;
const WebpackBar = require('webpackbar');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const webpackBaseConfig = {
  entry: {
    main: resolve(__dirname, "./src/main.tsx"),
  },
  output: {
    path: resolve(__dirname, "./dist"),
  },
  cache: {
    type: "filesystem",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: {
          loader: 'swc-loader',
        },
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
        type: 'asset/resource',
      },
      // 解析less
      {
        test: /\.less$/,
        use: [
          { loader: _modeflag ? MiniCssExtractPlugin.loader : "style-loader" },
          { loader: "css-loader" },
          { loader: "postcss-loader"},
          { 
            loader: "less-loader",
            options: {
              lessOptions: {
                javascriptEnabled: true,
              }
            },
          },
        ]
      },
      // 解析sass
      {
        test: /\.s[ac]ss$/,
        use: [
          _modeflag ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "sass-loader",
          "postcss-loader",
        ]
      },
      // 解析css
      {
        test: /\.css$/,
        use: [
          _modeflag ? MiniCssExtractPlugin.loader : "style-loader",
          "css-loader",
          "postcss-loader",
        ]
      },
      {
        test: /\.(png|jpg|svg)$/,
        type: 'asset',
      },
    ]
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: 3,
      cacheGroups: {},
    },
  },
  resolve: {
    // fallback: { url: false, os: false },
    alias: {
      '@components': resolve('src/components'),
      '@hooks': resolve('src/hooks'),
      '@pages': resolve('/src/pages'),
      '@layouts': resolve('src/layouts'),
      '@assets': resolve('src/assets'),
      '@states': resolve('src/states'),
      '@service': resolve('src/service'),
      '@utils': resolve('src/utils'),
      '@lib': resolve('src/lib'),
      '@constants': resolve('src/constants'),
    },
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.css'],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
      chunkFilename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
      ignoreOrder: false,
    }),
    new CleanWebpackPlugin(),
    new WebpackBar(),
    new Dotenv(),
  ]
}

module.exports = merge(webpackBaseConfig, _mergeConfig);
