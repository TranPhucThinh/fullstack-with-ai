import { createServer } from 'node:http' // lấy hàm tạo web server từ module http của Node

// Tạo server: mỗi khi có request tới, hàm này được gọi
const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' })
  res.end('E-Learning API đang chạy! 🚀')
})

const PORT = 4000 // cổng mặc định — đổi được khi cần
const HOST = '0.0.0.0' // lắng nghe mọi kết nối, không chỉ localhost

// Bật server, in ra URL để mở trình duyệt
server.listen(PORT, HOST, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
