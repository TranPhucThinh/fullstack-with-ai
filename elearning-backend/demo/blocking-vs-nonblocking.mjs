import { readFileSync, readFile } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const filePath = path.join(__dirname, 'sample.txt')

// ===== BLOCKING =====
console.log('1. Bắt đầu đọc file (blocking)...')
const dataSync = readFileSync(filePath, 'utf-8')
console.log('2. Đọc xong:', dataSync.trim())
console.log('3. Dòng này chỉ chạy SAU khi đọc file xong')

console.log('---')

// ===== NON-BLOCKING =====
console.log('4. Bắt đầu đọc file (non-blocking)...')
readFile(filePath, 'utf-8', (err, data) => {
  console.log('6. Đọc xong (callback):', data.trim())
})
console.log('5. Dòng này chạy NGAY, không chờ đọc file!')
