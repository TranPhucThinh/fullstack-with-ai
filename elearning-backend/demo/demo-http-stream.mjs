// Demo 3: HTTP server + stream — không nạp hết file vào RAM, vừa đọc vừa trả
import { createServer } from 'node:http'
import { createReadStream } from 'node:fs'
import { stat } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url)) // thư mục chứa file này
const server = createServer(async (req, res) => {
  // Chỉ phục vụ đúng route /download
  if (req.method !== 'GET' || req.url !== '/download') {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' })
    res.end('Không tìm thấy')
    return
  }

  const filePath = join(here, 'SW.js') // chính file giả 2MB trong demo
  const { size } = await stat(filePath) // lấy kích thước file

  // Gửi header Content-Length TRƯỚC — client biết chính xác độ dài tải về
  res.writeHead(200, {
    'Content-Type': 'text/javascript; charset=utf-8',
    'Content-Length': size,
  })

  // Nối stream đọc file với response — dữ liệu chảy dần, không giữ 2MB trong RAM
  const readStream = createReadStream(filePath)
  readStream.pipe(res)
})

const PORT = 4012
server.listen(PORT, () =>
  console.log(`Server stream: http://localhost:${PORT}/download`),
)
