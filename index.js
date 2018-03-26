module.exports = function(
  lib
) {
  if (lib === 'vue') {
    return require('./vue-config')()
  }
}