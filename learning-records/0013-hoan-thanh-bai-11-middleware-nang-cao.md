# Hoàn thành Bài 11 — Middleware nâng cao (error, logging, CORS)

Người học đã hoàn thành bài 11: viết middleware log tự viết, hiểu error-handling middleware (4 tham số), và bật CORS cho frontend. `src/server.ts` chạy XANH với typecheck exit 0 và đủ 3 kiểm tra: log middleware in ra, header Access-Control-Allow-Origin xuất hiện, /api/boom trả JSON 500 mà server không crash.

## Evidence

- Đã đọc code thật trong `elearning-backend/src/server.ts`: import cors + NextFunction, `app.use(cors())` đặt đầu, `app.use(express.json())`, middleware log tự viết `(req, res, next)` có timestamp + method + url + `next()`, các route giữ từ bài 10, route test `/api/boom` ném lỗi, error-handling middleware 4 tham số `(err, req, res, next)` ghi log lỗi rồi trả JSON 500.
- Verify bằng chạy thật (Node v24.16.0, Express 5.2.1, cors 2.8.6):
  - `npx tsc --noEmit` → exit 0.
  - Log in đúng: `[2026-08-09T15:28:38.384Z] GET /api/courses` và `GET /api/boom` — middleware chạy cho mọi request theo thứ tự.
  - `curl -s -D - ... /api/courses | grep -i access-control` → `Access-Control-Allow-Origin: *`.
  - `curl /api/boom` → `{"error":"Internal Server Error"}` HTTP 500, terminal in `Lỗi: Có lỗi xảy ra!`, server vẫn phản hồi 200 cho các request tiếp theo (không crash).

## Implications

- Người học đã chuyển từ dùng middleware có sẵn (express.json) sang tự viết — nắm được vì sao phải gọi `next()` (nếu không request treo) và vì sao thứ tự middleware quan trọng (đặt cors() đầu, error-handler cuối).
- Điểm mạnh: hiểu đúng dấu hiệu nhận biết error-handler là 4 tham số, đặt cors() trước để header CORS phủ mọi response kể cả lỗi.
- Điểm yếu cần theo dõi: (1) `courses` vẫn là mảng trong bộ nhớ — bài 12 thay bằng PostgreSQL; (2) middleware log chưa tách hàm riêng/có cấu trúc — khi dự án lớn sẽ cần logger production (bài logging sau); (3) chưa thực hành xóa express.json() để thấy lỗi req.body undefined.
- Vùng phát triển gần: bài 12 "Kết nối PostgreSQL (pg) — SQL thật, CRUD users" — thay mảng trong bộ nhớ bằng database thật, giải điểm yếu số 1.
