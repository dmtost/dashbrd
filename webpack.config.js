const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require('path');

const mode = process.env.NODE_ENV || "development";
const devMode = mode === "development";
const target = devMode ? 'wev' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {

  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  mode: 'development',
  entry: path.resolve(__dirname, 'src', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    filename: 'index.[contenthash].js'
  },
  plugins: [new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'src', 'index.html')
  }),
  new MiniCssExtractPlugin({
    filename: 'index.[contenthash].css'
  })
  ],
  module: {
    rules: [{
      test: /\.html$/i,
      loader: "html-loader",
    },
    {
      test: /\.(c|sc|sa)ss$/i,
      use: [devMode ? "style-loader" : MiniCssExtractPlugin.loader,
        "css-loader",
        'sass-loader'
      ],
    },
    ],
  },
}