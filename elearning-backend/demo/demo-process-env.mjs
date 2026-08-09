// Demo 4: process + env — argv, cwd, env, exit code
console.log('argv =', process.argv)
console.log('cwd  =', process.cwd())
console.log('NODE_ENV =', process.env.NODE_ENV ?? '(chưa đặt)')
console.log('SELF_PORT =', process.env.SELF_PORT ?? '(chưa đặt)')