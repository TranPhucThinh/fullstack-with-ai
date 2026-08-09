// Mổ xẻ req: in ra method, url, headers rồi trả response
import { createServer } from 'node:http'

const server = createServer((req, res) => {
  console.log('=== REQUEST VỪA NHẬN ===')
  console.log('method', req.method)
  console.log('url', req.url)
  console.log('headers', req.headers)
  console.log('host   :', req.headers.host)

  // Trả response đơn giản — statusCode + header + end
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/plain')
  res.end('Xin chào từ http module!')
})

server.listen(4010, () => {
  console.log('✅ Server chạy tại http://localhost:4010')
})
