console.log('1. Code đồng bộ — chạy ngay ở phase hiện tại')

setTimeout(() => console.log('2. setTimeout(0) — phase timers'), 0)
setImmediate(() => console.log('3. setImmediate — phase check'))

Promise.resolve().then(() => console.log('4. Promise.then — microtask'))

process.nextTick(() => console.log('5. process.nextTick — microtask'))

console.log('6. Code đồng bộ — cũng chạy ngay')
