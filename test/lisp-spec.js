const { assertEqual, runTests } = require('./test-helpers')
const { lisp, l } = require('../index')

function jsonStringifySpec() {
  const output = lisp([JSON.stringify, {foo: 'bar'}])

  assertEqual(output, '{"foo":"bar"}')
}

function jsonStringifyShortSpec() {
  const output = l([JSON.stringify, {foo: 'bar'}])

  assertEqual(output, '{"foo":"bar"}')
}

function encodeURIComponentSpec() {
  const output = l([encodeURIComponent, ' '])

  assertEqual(output, '%20')
}

function encodeURIComponentUsingStringSpec() {
  const output = l(['encodeURIComponent', ' '])

  assertEqual(output, '%20')
}

function asyncSpec(callback) {
  const asyncFn = (arg, _callback) => {
    const respond = () => _callback(arg)
    setTimeout(respond, 0)
  }

  l([asyncFn, 5, (actual) => {
    assertEqual(actual, 5, callback)
  }])
}

function calledWithNonArraySpec() {
  try {
    l('hi')
  } catch (error) {
    return assertEqual(error.message, 'Argument must be an array, received: hi')
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
