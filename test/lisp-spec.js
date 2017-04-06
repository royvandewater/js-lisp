const { runTests } = require('./test-helpers')
const { lisp, l } = require('../index')

function jsonStringifySpec() {
  const output = lisp([JSON.stringify, {foo: 'bar'}])

  if (output !== '{"foo":"bar"}') {
    throw new Error(`Expected '${output}' to equal '{"foo":"bar"}'`)
  }
}

function jsonStringifyShortSpec() {
  const output = l([JSON.stringify, {foo: 'bar'}])

  if (output !== '{"foo":"bar"}') {
    throw new Error(`Expected '${output}' to equal '{"foo":"bar"}'`)
  }
}

function encodeURIComponentSpec() {
  const output = l([encodeURIComponent, ' '])

  if (output !== '%20') {
    throw new Error(`Expected '${output}' to equal '%20'`)
  }
}

function encodeURIComponentUsingStringSpec() {
  const output = l(['encodeURIComponent', ' '])

  if (output !== '%20') {
    throw new Error(`Expected '${output}' to equal '%20'`)
  }
}

function asyncSpec(callback) {
  const asyncFn = (arg, _callback) => {
    const respond = () => _callback(arg)
    setTimeout(respond, 0)
  }

  l([asyncFn, 5, (actual) => {
    if (actual !== 5) return callback(new Error(`Expected '${actual}' to equal 5`))
    callback()
  }])
}

function calledWithNonArraySpec() {
  try {
    l('hi')
  } catch (error) {
    if (error.message !== `Argument must be an array, received: hi`) {
      throw new Error(`Expected '${error.message}' to equal 'Argument must be an array, received: hi'`)
    }
    return
  }

  throw new Error(`Expected function to throw 'Argument must be an array'. It did not throw.`)
}


module.exports = function(callback) {
  const tests = [
    jsonStringifySpec,
    jsonStringifyShortSpec,
    encodeURIComponentSpec,
    encodeURIComponentUsingStringSpec,
    asyncSpec,
    calledWithNonArraySpec,
  ]
  runTests(tests, callback)
}
