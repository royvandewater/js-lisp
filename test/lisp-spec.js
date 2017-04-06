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

function runTest(fn, callback) {
  if(fn.length == 1) {
    return fn(callback)
  }

  try {
    fn()
  } catch (error) {
    return callback(error)
  }

  callback()
}

function runTests(tests, callback) {
  if (tests.length == 0) return callback()

  const [test, ...rest] = tests

  runTest(test, (error) => {
    if (error) return callback(error)

    return runTests(rest, callback)
  })
}

module.exports = function(callback) {
  const tests = [
    jsonStringifySpec,
    jsonStringifyShortSpec,
    asyncSpec,
  ]
  runTests(tests, callback)
}
