// File: demo/use-cjs.cjs
const { greet } = require('./greet.cjs') // CJS dùng require, không phải import
console.log(greet('Bình'))
