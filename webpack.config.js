const path = require('path')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
module.exports = {
  mode: 'production',
  entry: './src/js/script.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }, plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery'",
      "window.$": "jquery"
    }),new MiniCssExtractPlugin()
  ],
  module: {
    rules: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',

        test: /\.js$/
      },
      {
        exclude: /node_modules/,
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ]
  }, optimization: {
    minimize: true,
    minimizer: [ new CssMinimizerPlugin({
      parallel: true
    }), new TerserPlugin({
      parallel: true
    })]
  }

}