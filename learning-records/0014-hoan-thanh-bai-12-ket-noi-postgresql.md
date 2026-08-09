# Hoàn thành Bài 12 — Kết nối PostgreSQL (pg), SQL thật, CRUD users

Người học đã chuyển dự án e-learning từ mảng trong bộ nhớ sang PostgreSQL thật: tạo file `src/db.ts` với `pg.Pool` + `loadEnvFile()`, tạo bảng `users` bằng SQL, và viết CRUD users qua Express + `pool.query()` với parameterized query chống SQL injection. Verify thật: typecheck exit 0, full CRUD (POST 201, GET list/id, PUT 200, DELETE 204, 404 khi id sai/không tồn tại) chạy XANH trên PostgreSQL 16.

## Evidence

- Đã đọc code thật `elearning-backend/src/server.ts` + `src/db.ts`: import pg + loadEnvFile, `new pg.Pool()`, các route async dùng `pool.query`, `Number.isInteger(id)` trước khi query, `$1/$2` parameterized, `RETURNING`, `rowCount` cho DELETE.
- Verify bằng chạy thật (Node v24.16.0, Express 5.2.1, pg 8.23.0, PostgreSQL 16):
  - `npx tsc --noEmit` → exit 0.
  - POST 2 users → 201 kèm id; GET list ra đúng; GET :id đúng; GET :id không hợp lệ (`/abc`) → 404 (không phải 500); PUT cập nhật đúng; POST thiếu field → 400; DELETE id tồn tại → 204; DELETE id không tồn tại → 404.
  - SELECT trong database xác nhận dữ liệu thật đã lưu/cập nhật/xóa.

## Implications

- Người học đã đi từ "dữ liệu trong mảng" tới "database thật" — hiểu vai trò của SQL, pool, parameterized query. Đây là nền cho mọi bài database tiếp theo.
- Điểm mạnh: tách `db.ts` riêng, ép kiểu id tránh SQL error 500, dùng `rowCount` đúng cho DELETE, hiểu vì sao `$1` chống SQL injection.
- Điểm yếu cần theo dõi: (1) chưa có error-handling middleware cho lỗi database (vd email trùng sẽ 500, chưa 409); (2) chưa có migration/versioning cho schema; bài 13 sẽ thiết kế database đầy đủ hơn (users/courses/enrollments), bài 14 auth sẽ xử lý lỗi trùng email.
- Vùng phát triển gần: bài 13 "Thiết kế database e-learning — ERD, bảng users/courses" — giờ đã có bảng users, cần thiết kế quan hệ (khóa ngoại, 1-nhiều, nhiều-nhiều) và bổ sung courses/enrollments.
