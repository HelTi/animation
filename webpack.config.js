const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  /*entry: './src/index.js',*/
  devtool: '#source-map',
  entry: {
    'index': './src/index.js',
    'touch': './src/touch.js',
    'slide': './src/slide.js',

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
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendors",
      chunks: ["index", "touch"],//提取公用模块
      minChunks: Infinity
    }),
    new ExtractTextPlugin({
      filename: 'static/css/[name].css',
      disable: false,
      allChunks: true
    }),
    new HtmlWebpackPlugin(
      {
        "filename":"index.html",
        "template":"./index.html",
        "chuckName":"index",
        "chunks" : ['vendors','index']
      }
    ),
    new HtmlWebpackPlugin(
      {
        "filename":"touch.html",
        "template":"./touch.html",
        "chuckName":"touch",
        "chunks" : ['vendors','touch']
      }
    ),
    new HtmlWebpackPlugin(
      {
        "filename":"slide.html",
        "template":"./slide.html",
        "chuckName":"slide",
        "chunks" : ['vendors','slide']
      }
    ),

  ],
  devServer: {
    contentBase: './',
    host: 'localhost',
    compress: true,
    port: 3000,
    inline: true,
    open: true
  }
};

