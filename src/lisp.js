const CACHE = require('./cache')

function assertArgs(list) {
  if ('object' !== typeof list && 'function' !== typeof list.map) {
    throw new Error(`Argument must be an array, received: ${list}`)
  }
}

function resolveFn(fn) {
  if ('function' === typeof fn) return fn

  if (CACHE[fn]) {
    return CACHE[fn]
  }

  if (global[fn]) {
    return global[fn]
  }

  throw new Error(`function not defined: "${fn}"`)
}

module.exports = function lisp([fn, ...args]){
  assertArgs(arguments[0])
  return resolveFn(fn).apply(this, args)
}
