import { createServer } from 'node:http' // lấy hàm tạo web server từ module http của Node
import { courses, createCourseId } from './courses.js'

// Tạo server: mỗi khi có request tới, hàm này được gọi
const server = createServer((req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host}`) // phân tích URL
  const path = url.pathname // lấy đường dẫn (path) từ URL

// POST /api/courses — tạo khóa học mới (thêm vào mảng, chưa có database)
  if (req.method === 'POST' && path === '/api/courses') {
    let body = '' // gom body từ stream — Node http không tự parse
    req.on('data', (chunk) => { body += chunk })
    req.on('end', () => {
      const data = JSON.parse(body) // parse chuỗi JSON thành object
      const newId = createCourseId() // tạo id mới cho khóa học
      const course = { id: newId, title: data.title, price: data.price }
      courses.push(course)

      res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end(JSON.stringify(course))
    })
    return
  }

  // Routing: so khớp path với từng tài nguyên
  if (req.method === 'GET' && path === '/api/courses') {
    // Trả danh sách khóa học dạng JSON
    res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
    res.end(JSON.stringify(courses))
    return
  }

  // Pattern /api/courses/:id — lấy id từ path bằng regex
  const match = path.match(/^\/api\/courses\/(\d+)$/)
  if (req.method === 'GET' && match) {
    const id = Number(match[1]) // lấy id từ regex
    const course = courses.find((c) => c.id === id) // tìm khóa học theo id
    if (course) {
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end(JSON.stringify(course))
    } else {
      // Không tìm thấy → 404 Not Found
      res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' })
      res.end(JSON.stringify({ error: 'Course not found' }))
    }

    return
  }

  // Mọi request khác → 404
  res.writeHead(404, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify({ error: 'Route not found' }))
})

const PORT = 4000 // cổng mặc định — đổi được khi cần
const HOST = '0.0.0.0' // lắng nghe mọi kết nối, không chỉ localhost

// Bật server, in ra URL để mở trình duyệt
server.listen(PORT, HOST, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
