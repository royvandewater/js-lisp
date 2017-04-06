function assertEqual(actual, expected, callback) {
  if ('function' === typeof callback) return assertEqualAsync(actual, expected, callback)
  return assertEqualSync(actual, expected)
}

function assertEqualAsync(actual, expected, callback) {
  if (actual === expected) return callback()
  return callback(new Error(`Expected '${actual}' to equal '${expected}'`))
}

function assertEqualSync(actual, expected) {
  if (actual === expected) return
  throw new Error(`Expected '${actual}' to equal '${expected}'`)
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

module.exports = { assertEqual, runTests }
