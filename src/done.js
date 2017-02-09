'use strict'

// setup
const wait = 10

// main
console.log(`Node upgrade complete, you're now on Node ${process.version}`)
console.log(`... this console will close in ${wait} seconds`)
setTimeout(() => {}, wait * 1000)
