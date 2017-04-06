const lispSpec = require('./lisp-spec')

lispSpec((error) => {
  if ( error ) {
    throw error
  }
  process.exit(0)
})
