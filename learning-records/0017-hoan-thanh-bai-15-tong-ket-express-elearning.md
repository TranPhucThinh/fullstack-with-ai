# Hoàn thành Bài 15 — Tổng kết Express: e-learning chạy bằng Express thuần

Người học đã gom toàn bộ thành một API e-learning hoàn chỉnh chạy bằng Express + PostgreSQL: CRUD users (bài 12), auth register/login/me + JWT (bài 14), và thêm mới CRUD courses (public GET, protected POST), enrollments (protected, bắt lỗi 23505/23503), route "khóa của tôi" dùng JOIN enrollments + courses.

## Evidence

- Đã đọc code thật `src/server.ts` (216 dòng): có `auth` middleware, `/api/me`, `/api/users` CRUD, `/api/courses` GET(+POST auth), `/api/enrollments` POST (bắt 23505 → 409, 23503 → 400), `/api/me/courses` JOIN, `/api/auth/register` (+409 email trùng), `/api/auth/login` (+401 sai).
- Verify bằng chạy thật (Node v24.16.0, Express 5.2.1, PG 16, server chạy :4000):
  - `npx tsc --noEmit` → exit 0.
  - register → 201 + token (user id 17).
  - register trùng email → 409.
  - login → token.
  - POST /api/courses có token → 201 (`{id:5, title:"Bai15 test",...}`); không token → 401 `Thiếu token`.
  - POST /api/enrollments → 201 (`{id:9, user_id:17, course_id:1,...}`).
  - GET /api/me/courses → 200 trả `[{id:1, title:"NestJS cơ bản", enrolled_at:...}]` — JOIN đúng.

## Implications

- Người học đã hoàn thành Project 1 (API Express + PostgreSQL + JWT) đầy đủ: resources users/courses/enrollments quan hệ nhiều-nhiều, route protected bằng middleware auth, xử lý lỗi database 23505/23503 có chủ đích.
- Điểm mạnh: tự build đủ nghiệp vụ courses/enrollments (đúng bài), hiểu vì sao POST /api/courses cần auth, bắt lỗi khóa ngoại 23503 → 400, JOIN "khóa của tôi" chính xác.
- Điểm yếu cần theo dõi: (1) JWT_SECRET vẫn hardcode (bài 14 ghi nhận — chờ bài auth nâng cao/bảo mật); (2) chưa có role phân quyền (ai được tạo khóa) — để Module 5 RBAC; (3) body thiếu ép kiểu/validation — để Bài 22 DTO/ValidationPipe; (4) tất cả route nằm trong 1 file server.ts — sẽ được tách thành Controller/Service khi chuyển NestJS (Bài 20-24).
- Vùng phát triển gần: **Bài 16 — Module 3 TypeScript cơ bản** (type, interface, generics) — vì NestJS xây trên TS, và dự án đang dùng nhiều `any`/req.body không ép kiểu. Đây là lúc chuyển từ "Express thuần + JS kiểu lỏng" sang "TS type an toàn" làm nền cho NestJS.