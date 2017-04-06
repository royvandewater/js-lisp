const { assertEqual, runTests } = require('./test-helpers')
const { defn, l } = require('../index')

function echoSpec() {
  l([defn, 'foo', () => 'bar'])

  const output = l(['foo'])
  assertEqual(output, 'bar')
}

module.exports = function(callback) {
  const tests = [
    echoSpec,
  ]
  runTests(tests, callback)
}
