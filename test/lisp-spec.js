const { lisp, l } = require('../index')

function jsonStringifySpec() {
  const output = lisp([JSON.stringify, {foo: 'bar'}])

  if (output !== '{"foo":"bar"}') {
    throw new Error(`Expected ${output} to equal '{"foo":"bar"}'`)
  }
}

function jsonStringifyShortSpec() {
  const output = l([JSON.stringify, {foo: 'bar'}])

  if (output !== '{"foo":"bar"}') {
    throw new Error(`Expected ${output} to equal '{"foo":"bar"}'`)
  }
}

function asyncSpec(callback) {
  const asyncFn = (arg, _callback) => {
    const respond = () => _callback(arg)
    setTimeout(respond, 0)
  }

  l([asyncFn, 5, (actual) => {
    if (actual !== 5) return callback(new Error(`Expect ${actual} to equal 5`))
    callback()
  }])
}

module.exports = function(callback) {
  try {
    jsonStringifySpec()
    jsonStringifyShortSpec()
  } catch (error) {
    return callback(error)
  }

  asyncSpec(callback)
}
