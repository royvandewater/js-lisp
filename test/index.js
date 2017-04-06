const { runTests } = require('./test-helpers')
const defnSpec = require('./defn-spec')
const lispSpec = require('./lisp-spec')

runTests([lispSpec, defnSpec], (error) => {
  if ( error ) {
    throw error
  }
  process.exit(0)
})
