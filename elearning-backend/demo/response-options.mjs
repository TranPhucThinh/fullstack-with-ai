import { createServer } from 'node:http'

const server = createServer((req, res) => {
  // Cách tách bạch: gán status + header riêng
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/plain; charset=utf-8')

  res.write('Phần 1 của body\n') // write: ghi thêm — gọi nhiều lần được
  res.write('Phần 2 của body\n')
  res.end('Xong!') // end: KẾT THÚC response, kèm mẩu cuối
})
server.listen(4011, () => console.log('✅ http://localhost:4011'))
