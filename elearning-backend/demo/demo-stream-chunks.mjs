// Demo 2: stream Readable — đọc theo CHUNK (phù hợp file lớn, không cần nạp hết vào RAM)
import { createReadStream } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
// highWaterMark: 64KB mặc định (bài học: cỡ chunk do mình chọn)
const stream = createReadStream(path.join(__dirname, 'SW.js'), { highWaterMark: 64 * 1024 })

let chunkIndex = 0
let totalBytes = 0

// 'data' event: mỗi lần có chunk sẵn sàng thì callback chạy
stream.on('data', (chunk) => {
  chunkIndex++
  totalBytes += chunk.length
  console.log(`chunk ${chunkIndex}: ${chunk.length} bytes`)
})

// 'end' event: đã đọc xong toàn bộ file
stream.on('end', () => {
  console.log(`Xong! Tổng ${totalBytes} bytes qua ${chunkIndex} chunks`)
})
