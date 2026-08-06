# Hoàn thành Bài 01 — HTTP là gì (request/response, method, status code, header)

Người học đã hoàn thành Bài 01: đọc được HTTP message bằng mắt qua `curl -v`, phân biệt request/response, 4 method chính, nhóm status code, headers.

## Đã làm được
- Chạy `curl -sv http://localhost:4000` và đọc được request line (`GET / HTTP/1.1`), headers, status line (`HTTP/1.1 200 OK`)
- Phân biệt 3 phần request (request line, headers, body) và 3 phần response (status line, headers, body)
- Nắm 4 method chính (GET/POST/PUT/DELETE) + ý nghĩa từng nhóm status code (2xx/3xx/4xx/5xx)
- Hiểu vì sao `Content-Type` quyết định cách client đọc body

## Điểm cần chú ý cho bài sau
- Chưa có dấu hiệu yếu — khái niệm HTTP nắm tốt, sẵn sàng cho REST (Bài 02)
- Bài 02 sẽ thay `src/server.ts` bằng server REST trả JSON qua `/api/courses` — mẩu chạy được đầu tiên có routing thật

## Verify code mẫu Bài 02 (sandbox sạch, dùng đúng package.json + package-lock.json của người học)
- `npx tsc --noEmit` → exit 0
- `GET /api/courses` → JSON 2 courses, HTTP 200
- `GET /api/courses/2` → JSON course id=2, HTTP 200
- `GET /api/courses/99` → `{"error":"Course not found"}`, HTTP 404
- `GET /api/unknown` → `{"error":"Route not found"}`, HTTP 404