// Demo 6: bắt lỗi ENOENT — đọc file không tồn tại nhưng KHÔNG crash
import { readFile } from 'node:fs/promises'

try {
  await readFile('./khong-ton-tai.txt', 'utf8')
} catch (err) {
  console.log('Bắt được lỗi, code:', err.code)
  console.log('Thông điệp:', err.message)
}
console.log('Chương trình vẫn chạy tiếp tới dòng này ✅')
