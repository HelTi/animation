const path = require('path');
const webpack = require('webpack');

const Uglify = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ROOT_PATH = path.resolve(__dirname);

module.exports = {
  /*entry: './src/index.js',*/
  devtool: '#source-map',
  entry: {
    'index': './src/js/index.js',
  },
  output: {
    filename: 'static/js/[name][hash].js',
    chunkFilename: 'static/js/[id].chunk.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true //css压缩
              }
            }
          ]
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'], {
      root: ROOT_PATH,
      verbose: true,
      dry: false,
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({
      filename: 'static/css/[name].css',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin(
      {
        "filename": "index.html",
        "template": "./index1.html",
      }
    ),
  ],
  devServer: {
    contentBase: './',
    host: 'localhost',
    compress: true,
    port: 3000,
    inline: true
  }
};

