/**
 * vue的webpack配置
 */
module.exports = function (mode = 'dev') {
  if (mode === 'dev') {
    return require('./webpack.dev.conf')();
  }
}