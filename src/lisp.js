const CACHE = require('./cache')

module.exports = function lisp(list){
  if ('object' !== typeof list && 'function' !== typeof list.map) {
    throw new Error(`Argument must be an array, received: ${list}`)
  }

  const [fn, ...args] = list

  if ('function' === typeof fn) return fn.apply(this, args)

  if (!CACHE[fn]) {
    throw new Error(`function not defined: "${fn}"`)
  }

  return CACHE[fn].apply(this, args)
}
