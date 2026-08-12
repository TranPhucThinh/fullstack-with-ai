# Hoàn thành Bài 14 — Auth cơ bản bằng Express (bcrypt, JWT)

Người học đã tự viết auth vào `src/server.ts`: register (hash bcrypt + bắt lỗi 23505 → 409), login (compare hash + trả JWT token), middleware `auth` bảo vệ route `/api/me`. Người học còn chủ động **tự phát hiện và fix lỗi type `userId`** bằng cách tạo `src/types/express.d.ts` (khai báo mở rộng `Express.Request.userId?`).

## Evidence

- Verify bằng chạy thật (Node v24.16.0, Express 5.2.1, bcrypt 6.0.0, jsonwebtoken 9.0.3, PostgreSQL 16):
  - `npx tsc --noEmit` → exit 0 (lỗi type userId đã hết).
  - POST /api/auth/register → 201 kèm user + token.
  - POST register cùng email → 409 "Email đã tồn tại" (bắt code 23505).
  - POST login sai mật khẩu → 401 "Sai email hoặc mật khẩu".
  - GET /api/me không token → 401 "Thiếu token".
  - GET /api/me có token hợp lệ → 200 trả user đúng (id/email/name).
- Đã đọc code thật: `src/types/express.d.ts` (declare global Express.Request), `src/server.ts` (auth middleware + register/login/me).

## Implications

- Người học đã đi từ "CRUD users không auth" tới "register/login/JWT + route được bảo vệ" — hiểu bản chất hash mật khẩu (bcrypt một chiều), JWT stateless, và ý nghĩa bảo mật của 401/409.
- Điểm mạnh: TỰ fix lỗi type bằng TS module augmentation (`src/types/express.d.ts`) — đúng cách senior khai báo mở rộng Express.Request mà không phá type của thư viện; sửa luôn lỗi `SELECT * FROM user` → `users` (bài soạn cũ có lỗi này — học viên đã sửa đúng).
- Điểm yếu cần theo dõi: JWT_SECRET vẫn hardcode trong code (bài 14 chưa yêu cầu; bài 29-33 auth nâng cao sẽ đưa vào .env); chưa có đăng xuất/refresh token; register chưa có validation password độ dài (để bài 22 DTO/ValidationPipe). Người học còn dùng `req.body ?? {}` thiếu ép kiểu — sẽ được ValidationPipe xử lý bài 22.
- Vùng phát triển gần: bài 15 "Tổng kết Express — e-learning chạy bằng Express thuần" — gom CRUD users/courses/enrollments + auth thành API hoàn chỉnh, trước khi chuyển sang TypeScript (bài 16-19) và NestJS.