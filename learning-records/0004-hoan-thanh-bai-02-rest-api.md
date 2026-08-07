# Hoàn thành Bài 02 — REST API (resource, URL design)

Người học đã hoàn thành Bài 02: viết xong server REST đầu tiên bằng Node thuần (`src/server.ts`), trả JSON qua `GET /api/courses` và `GET /api/courses/:id` với routing thủ công bằng regex + phân tích URL qua `URL`.

## Đã làm được (verify trên máy thật 08/06/2026)
- `GET /api/courses` → JSON 2 courses, HTTP 200
- `GET /api/courses/2` → JSON course id=2, HTTP 200
- `GET /api/courses/99` → `{"error":"Course not found"}`, HTTP 404
- `GET /api/unknown` → `{"error":"Route not found"}`, HTTP 404
- `npx tsc --noEmit` → exit 0 (TypeScript pass)

## Điểm nổi bật
- Tự viết routing thủ công bằng `new URL(req.url)` + regex `/^\/api\/courses\/(\d+)$/` — đã hiểu cách tách path khỏi URL và pattern item/collection của REST
- Trả JSON đúng `Content-Type: application/json` và status code đúng ngữ nghĩa (200 vs 404)

## Implications
- Người học đã nắm nền tảng routing thủ công — Bài 06/07 (HTTP server Node thuần, xử lý request/response) sẽ nhanh hơn vì khái niệm routing không còn xa lạ
- Bài 03 (JSON & API client) sẽ dùng chính `/api/courses` này với curl/Postman — mở rộng thêm POST tạo course
