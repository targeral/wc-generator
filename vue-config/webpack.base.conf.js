/**
 * webpack 公共配置
 * @author targeral
 */

const path = require('path')
const Config = require('./config')
const vueConfig = require('./vue-loader.config')
const postcssConfig = require('./postcssConfig')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const isProduction = process.env.NODE_ENV === 'production'

const resolve = dir => path.join(__dirname, '..', dir)

module.exports = function (
  modules = false,
  config = Config
) {
  // const pkg = require(path.join(process.cwd(), 'package.json'))
  const babelConfig = require('./getBabelCommonConfig')(modules)

  const jsRule = {
    test: /\.js$/,
    loader: 'babel-loader',
    include: /node_modules/,
    options: babelConfig
  }
  const vueRule = {
    test: /\.vue$/,
    loader: 'vue-loader',
    options: vueConfig
  }
  const eslintRule = {
    test: /\.(js|vue)$/,
    enforce: 'pre',
    loader: 'eslint-loader',
    include: [resolve('src')],
    exclude: /node_modules/,
    options: {
      formatter: require('eslint-friendly-formatter')
    }
  }
  const pictureRule = {
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000
    }
  }
  const fontRule = {
    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
    loader: 'url-loader',
    options: {
      limit: 10000
    }
  }
  const cssRule = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: Object.assign(
            {},
            postcssConfig,
            { sourceMap: true }
          )
        }
      ]
    })
  }
  const lessRule = {
    test: /\.less$/,
    use: ExtractTextPlugin.extract({
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: true
          }
        },
        {
          loader: 'postcss-loader',
          options: Object.assign(
            {},
            postcssConfig,
            { sourceMap: true }
          )
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: true,
            javascriptEnabled: true
          }
        }
      ]
    })
  }

  const wcConfig = {
    devtool: 'source-map',

    output: {
      path: config.build.assetsRoot,
      publicPath: isProduction ? config.build.assetsPublicPath : config.dev.assetsPublicPath,
      filename: '[name].js'
    },
    resolve: {
      modules: [
        resolve('src'),
        resolve('node_modules')
      ],
      extensions: [
        '.js',
        '.vue',
        '.less',
        '.css'
      ],
      alias: {
        'assets': resolve('src/assets'),
        vue: 'vue/dist/vue.commom.js',
        '@': resolve('/src'),
        '@components': resolve('/src/components')
      }
    },
    module: {
      rules: [
        vueRule,
        eslintRule,
        jsRule,
        pictureRule,
        fontRule,
        cssRule,
        lessRule
      ]
    }
  }

  return wcConfig
}
