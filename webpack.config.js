import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';
import webpack from 'webpack';

const webpackConf = {
  target: 'web',
  cache: true,
  entry: {
    a10s: path.join(__dirname, 'src', 'index.js'),
    common: ['react']
  },
  resolve: {
    root: path.join(__dirname, 'src'),
    extensions: ['', '.js'],
    modulesDirectories: ['node_modules', 'src']
  },
  output: {
    path: path.join(__dirname, 'target'),
    publicPath: '',
    filename: '[name].js'
  },

  module: {
    preLoaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'eslint' }
    ],
    loaders: [
      { test: /\.css$/, loader: 'css' },
      { test: /\.(png|jpg|jpeg)$/, loader: 'url?limit=25000' },
      { test: /\.less$/, loader: ExtractTextPlugin.extract('style', 'css!csslint!autoprefixer!less') },
      { test: /\.js?$/, exclude: /node_modules/, loader: 'babel?cacheDirectory' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
    new HtmlWebpackPlugin({ inject: true, template: 'src/index.html' }),
    new ExtractTextPlugin('[name].css', { allChunks: true }),
    new webpack.NoErrorsPlugin()
  ],
  externals: {
    three: 'THREE'
  },
  debug: true,
  devtool: 'eval-cheap-module-source-map',
  devServer: {
    contentBase: './target',
    historyApiFallback: true
  }
};

export default webpackConf;
