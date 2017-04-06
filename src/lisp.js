module.exports = function lisp([fn, ...args]){
  return fn.apply(this, args)
}
