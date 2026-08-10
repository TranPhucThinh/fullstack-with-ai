# Hoàn thành Bài 13 — Thiết kế database e-learning (ERD, khóa ngoại, quan hệ, JOIN)

Người học đã thiết kế và tạo database e-learning đúng chuẩn quan hệ: tách bảng `users`, `courses`, `enrollments` (junction table), dùng khóa ngoại để ép toàn vẹn dữ liệu, unique tổ hợp chống trùng enrollment, và truy vấn bằng JOIN 3 bảng để trả câu hỏi nghiệp vụ.

## Evidence

- Verify bằng chạy thật trên PostgreSQL 16 (container `elearning-postgres`, docker exec psql):
  - 3 bảng tồn tại: `users`, `courses`, `enrollments`.
  - `courses`: 2 khóa (NestJS cơ bản 500000, Design Pattern 800000).
  - `enrollments`: 3 bản ghi đúng quan hệ (user 1 → course 1; user 2 → course 1 & course 2).
  - JOIN "user 1 học khóa nào" trả đúng: `Khanh Nguyen | NestJS cơ bản`; user 2 đang học cả 2 khóa.

## Implications

- Người học đã đi từ "bảng users đơn lẻ" tới "hệ quan hệ.users/courses/enrollments" — hiểu và thực hành được: vì sao tách bảng (tránh redundancy/anomaly), 3 kiểu quan hệ, khóa ngoại (REFERENCES), unique tổ hợp, junction table, JOIN.
- Điểm mạnh: tạo đủ 3 bảng với constraint đúng (CHECK, REFERENCES, UNIQUE tổ hợp), insert dữ liệu đúng quan hệ, JOIN 3 bảng chạy đúng nghiệp vụ.
- Điểm yếu cần theo dõi: chưa thấy mô tả rõ học viên tự chạy case "vi phạm khóa ngoại" (lỗi REFERENCES) trên máy thật — nhưng cấu trúc/constraint đúng, dữ liệu hợp lệ; mục này sẽ được củng cố ở bài 14 khi bắt lỗi trùng email (23505/23503). Cũng chưa có migration/versioning cho schema — sẽ là mục lớn ở Module 4 (TypeORM migrations, bài 23).
- Vùng phát triển gần: bài 14 "Auth cơ bản bằng Express — bcrypt, JWT" — đăng ký/đăng nhập, hash mật khẩu, token, và bắt lỗi email trùng (409) thay vì 500 (yếu điểm đã ghi từ bài 12).