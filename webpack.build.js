const webpack = require('webpack');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const bourbon = require('node-bourbon').includePaths;
const config = require('./webpack.config.js');

config.devtool = 'source-map';
config.entry = {
  'sanji-ui': './component/index.js'
};
config.output.filename = 'sanji-navbar-ui.js';
config.output.libraryTarget = 'umd';
config.output.library = 'sjNavbar';
config.externals = ['angular', 'sanji-core-ui'];

config.module.rules = [
  { test: /\.js$/, use: 'ng-annotate-loader', exclude: /(node_modules)/, enforce: 'post' },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader!postcss-loader!sass-loader?includePaths[]=' + bourbon
    })
  }
].concat(config.module.rules);

config.plugins.push(
  new ExtractTextPlugin('sanji-navbar-ui.css'),
  new LodashModuleReplacementPlugin(),
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
    quiet: true,
    options: {
      postcss: [autoprefixer({ browsers: ['last 2 versions'] })]
    }
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      screw_ie8: true,
      warnings: false,
      dead_code: true
    }
  })
);
module.exports = config;
