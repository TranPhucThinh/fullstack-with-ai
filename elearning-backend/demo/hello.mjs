// File: demo/hello.mjs
// .mjs → LUÔN là ESM, dù "type" trong package.json là gì

export const greet = (name) => `Xin chào, ${name}!`

// Chỉ chạy khi file này được chạy TRỰC TIẾP, không chạy khi được import
if (import.meta.url === `file://${process.argv[1]}`) {
  console.log(greet('An'))
}
