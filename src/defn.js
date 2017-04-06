const CACHE = require('./cache')

module.exports = function(name, fn) {
  CACHE[name] = fn
}
