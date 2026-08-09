# Hoàn thành Bài 07 — Xử lý request/response thủ công (routing table, query, body, validation)

Người học đã nâng cấp dự án e-learning từ if/else trong createServer lên một bộ router thủ công có cấu trúc: bảng route khai báo `{ method, pattern, handler }`, parse query bằng URLSearchParams, gom body bằng async iteration trên stream, và validation trả 400 khi POST thiếu title. Sự kiện fail chính xác: quan sát được phản hồi HTTP thật (400/404/201) và typecheck exit 0 — không phải tiếp xúc suông.

## Evidence

- Đã đọc code thật trong `elearning-backend/src/server.ts`: type RouteHandler, mảng routes, parseQuery, readBody, sendJson, vòng `for await (const chunk of req)`, validation `!data.title`.
- Verify bằng chạy `npx tsc --noEmit` (exit 0) và curl toàn bộ 6 trường hợp trên máy thật: GET list 200, query limit lọc 1 course, GET :id 2 trả 200, GET :id 99 trả 404, POST thiếu title trả 400, POST hợp lệ trả 201 — kết quả đúng như kỳ vọng.

## Implications

- Người học đã nắm ba mảnh còn thiếu của tầng HTTP thuần: query parsing, body từ stream, và lý do cần validation ngay từ tầng request. Đây chính là nền để hiểu mỗi thành phần Express/NestJS sau này (req.query, express.json(), ValidationPipe) giải quyết bài toán gì.
- Người học còn chưa hệ thống hoá "stream là gì, vì sao dữ liệu tới theo chunk" — bài 08 (File system, streams, process, env) là vùng phát triển gần của họ, bắc cầu trực tiếp từ `for await (const chunk of req)` đã thấy.
