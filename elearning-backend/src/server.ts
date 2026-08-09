import { createServer, IncomingMessage, ServerResponse } from 'node:http' // lấy hàm tạo web server từ module http của Node
import { courses, createCourseId } from './courses.js'

type RouteHandler = (
  req: IncomingMessage,
  res: ServerResponse,
  match: RegExpMatchArray,
  query: Record<string, string>,
) => Promise<void> | void

// Handler: GET /api/courses?limit=1 — trả danh sách (hỗ trợ limit)
function listCourses(
  req: IncomingMessage,
  res: ServerResponse,
  match: RegExpMatchArray,
  query: Record<string, string>,
): void {
  const limit = Number(query.limit ?? courses.length)
  sendJson(res, 200, courses.slice(0, limit))
}

// Handler: GET /api/courses/:id
function getCourse(
  req: IncomingMessage,
  res: ServerResponse,
  match: RegExpMatchArray,
  query: Record<string, string>,
): void {
  const course = courses.find((c) => c.id === Number(match[1]))
  if (course) sendJson(res, 200, course)
  else sendJson(res, 404, { error: 'Course not found' })
}

// Handler: POST /api/courses — validation thiếu title -> 400
async function createCourse(
  req: IncomingMessage,
  res: ServerResponse,
  match: RegExpMatchArray,
  query: Record<string, string>,
): Promise<void> {
  const data = await readBody(req)
  if (!data.title || typeof data.title !== 'string') {
    sendJson(res, 400, { error: 'title là bắt buộc (string)' })
    return
  }
  const id = courses.length ? Math.max(...courses.map((c) => c.id)) + 1 : 1
  const course = { id, title: data.title, price: data.price as number }
  courses.push(course)
  sendJson(res, 201, course)
}

// BẢNG ROUTE: { method, pattern (regex bắt path param), handler }
const routes: { method: string; pattern: RegExp; handler: RouteHandler }[] = [
  {
    method: 'GET',
    pattern: /^\/api\/courses$/,
    handler: listCourses,
  },
  {
    method: 'GET',
    pattern: /^\/api\/courses\/(\d+)$/,
    handler: getCourse,
  },
  {
    method: 'POST',
    pattern: /^\/api\/courses$/,
    handler: createCourse,
  },
]

// Parse query string thành object: 'limit=1&tag=node' -> { limit:'1', tag:'node' }
const parseQuery = (queryString: string): Record<string, string> => {
  const result: Record<string, string> = {}
  for (const [key, value] of new URLSearchParams(queryString))
    result[key] = value

  return result
}

// Gom toàn bộ body từ stream Readable (req) — dừng khi hết chunk
const readBody = async (
  req: IncomingMessage,
): Promise<Record<string, unknown>> => {
  let body = ''
  for await (const chunk of req) {
    body += chunk
  }
  return body ? JSON.parse(body) : {}
}

// Trả JSON + status chuẩn
function sendJson(res: ServerResponse, status: number, data: unknown): void {
  res.writeHead(status, { 'Content-Type': 'application/json; charset=utf-8' })
  res.end(JSON.stringify(data))
}

// Tạo server: mỗi khi có request tới, hàm này được gọi
const server = createServer(async (req, res) => {
  const url = new URL(req.url ?? '/', `http://${req.headers.host}`)
  const path = url.pathname
  const query = parseQuery(url.search.slice(1))

  for (const route of routes) {
    if (req.method === route.method) {
      const match = path.match(route.pattern)
      if (match) {
        await route.handler(req, res, match, query)
        return
      }
    }
  }
  sendJson(res, 404, { error: 'Route not found' })
})

const PORT = 4000 // cổng mặc định — đổi được khi cần
const HOST = '0.0.0.0' // lắng nghe mọi kết nối, không chỉ localhost

// Bật server, in ra URL để mở trình duyệt
server.listen(PORT, HOST, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`)
})
