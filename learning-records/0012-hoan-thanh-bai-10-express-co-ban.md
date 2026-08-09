# Hoàn thành Bài 10 — Express cơ bản (routing, middleware)

Người học đã chuyển dự án e-learning từ server Node thuần (bài 07–08) sang Express 5.x: viết lại `src/server.ts` bằng `app.get/app.post`, dùng `req.query`, `req.params`, `req.body`, `res.json()`, `res.status()`, và middleware `express.json()`. Typecheck exit 0 và toàn bộ 6 endpoint curl chạy XANH trên cổng 4000 thật — đúng kỳ vọng.

## Evidence

- Đã đọc code thật `elearning-backend/src/server.ts` (học viên tự viết): import express + type Request/Response, `app.use(express.json())`, 3 route handler GET list/limit, GET :id, POST + validation, `app.listen(PORT)` đọc từ env.
- Verify bằng chạy thật trên máy (Node v24.16.0, Express 5.2.1):
  - `npx tsc --noEmit` → exit 0 (code TypeScript sạch).
  - `npm run dev` → log "✅ Express running at http://localhost:4000".
  - curl 6 trường hợp trên cổng 4000 thật: GET list 2 courses, GET ?limit=1 còn 1, GET /:id=2 đúng, GET /:id=99 → `{"error":"Course not found"}`, POST thiếu title → 400, POST hợp lệ → `{"id":3,...}` (201).

## Implications

- Người học đã nắm vững sự tương ứng code tay ↔ Express đã học ở bài 09, và giờ viết được ứng dụng Express thật chạy được — đúng mục tiêu "hiểu bản chất trước khi dùng".
- Điểm mạnh: viết code sạch, có dòng trống hợp lý, dùng đúng `req.body ?? {}` để phòng undefined, `Number(price)` để ép kiểu, `res.status().json()` — phản ánh hiểu chainable methods.
- Điểm yếu cần theo dõi: khi POST hợp lệ nhiều lần, `courses` (module-level array) bị mutate và giữ giữa các lần chạy `tsx watch` — chưa có database, bài 12 sẽ giải quyết bằng PostgreSQL. Cũng chưa thấy thực hành xóa `express.json()` để thử lỗi (bài 10 có gợi ý) — sẽ nhắc khi phù hợp.
- Vùng phát triển gần: bài 11 "Middleware nâng cao — error, logging, CORS" — người học đã dùng middleware có sẵn (express.json), giờ viết middleware của riêng mình và hiểu error-handling.