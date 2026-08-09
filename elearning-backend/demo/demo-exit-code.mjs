// Demo 5: exit code — process.exitCode để shell biết lệnh thành công hay thất bại
import process from 'node:process'

const required = process.env.REQUIRED_FLAG // biến tùy chọn cần có

if (!required) {
  console.error('Thiếu REQUIRED_FLAG — không chạy được')
  process.exitCode = 1 // KHÔNG gọi process.exit() — để stdout/stderr được flush
} else {
  console.log(`Nhận được flag: ${required}`)
}