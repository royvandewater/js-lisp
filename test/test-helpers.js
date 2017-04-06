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

module.exports = { runTests }
