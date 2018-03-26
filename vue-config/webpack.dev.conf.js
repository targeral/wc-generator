const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')
const Config = require('./config')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = function (
  config = Config
) {
  const baseWcConfig = baseWebpackConfig(false, config)
  const devWcWcConfig = merge(baseWcConfig, {
    plugins: [
      // new ProgressBarPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: config.dev.env
        }
      }),
      new ExtractTextPlugin({
        filename: '[name].css',
        disable: false,
        allChunks: true
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
      new webpack.NoEmitOnErrorsPlugin(),
      // https://github.com/ampedandwired/html-webpack-plugin
      new HtmlWebpackPlugin({
        filename: config.dev.filename,
        template: config.dev.template,
        inject: true
      }),
      new FriendlyErrorsPlugin()
    ]
  })
  return devWcWcConfig
}
