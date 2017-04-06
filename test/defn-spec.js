const { runTests } = require('./test-helpers')
const { defn, l } = require('../index')

function echoSpec() {
  l([defn, 'foo', () => 'bar'])

  const output = l(['foo'])
  if (output !== 'bar') {
    throw new Error(`Expected ${output} to equal 'bar'`)
  }
}

module.exports = function(callback) {
  const tests = [
    echoSpec,
  ]
  runTests(tests, callback)
}
