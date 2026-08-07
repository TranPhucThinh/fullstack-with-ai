# Glossary — Senior Backend Node.js/NestJS

Thuật ngữ được thêm vào khi người học đã dùng ĐÚNG (rule A23). Cập nhật cùng lúc với learning-record.

| Thuật ngữ | Định nghĩa (tiếng Việt) | Bài |
|-----------|--------------------------|-----|
| **tsx** | Trình chạy TypeScript trực tiếp trên Node, không cần bước biên dịch riêng; `tsx watch` tự reload khi sửa file | 00 |
| **rootDir** | Cấu hình tsconfig khai báo thư mục gốc của code nguồn — TS dựa vào đây để tái tạo cấu trúc thư mục trong `outDir` | 00 |
| **outDir** | Cấu hình tsconfig chỉ nơi chứa code biên dịch (thường là `dist/`) | 00 |
| **pg_isready** | Lệnh của PostgreSQL hỏi trực tiếp database "đã sẵn sàng nhận kết nối chưa" — bằng chứng thật, không phải đoán | 00 |
| **docker-compose.yml** | File khai báo các container của dự án dưới dạng mã (infrastructure-as-code) — clone repo là chạy được ngay | 00 |
| **HTTP status code** | Mã 3 chữ số server trả về cho mỗi request, ví dụ `200` = thành công | 00 (sâu hơn ở 01) |
| **HTTP message** | Đơn vị trao đổi giữa client và server: request (request line + headers + body) và response (status line + headers + body) | 01 |
| **HTTP method** | Động từ mô tả hành động client muốn server làm: GET (lấy), POST (tạo), PUT (thay thế), DELETE (xóa) | 01 |
| **Content-Type** | Header báo kiểu dữ liệu của body — quyết định cách client đọc nội dung (vd `application/json`, `text/plain`) | 01 |
| **REST API** | Phong cách thiết kế API dựa trên tài nguyên (resource) + HTTP method — URL có ý nghĩa, dễ đoán, nhất quán | 02 |
| **resource (tài nguyên)** | Đối tượng trung tâm của REST API — mỗi thứ hệ thống quản lý (khóa học, người dùng, đơn hàng) là một resource, có URL riêng và được thao tác bằng HTTP method chuẩn | 02 |
| **JSON** | Định dạng trao đổi dữ liệu chính của REST API, server trả về dạng `application/json`, client đọc và xử lý bằng `JSON.parse`/`JSON.stringify` | 02 |
| **URL routing** | Kỹ thuật phân tích request URL để quyết định xử lý — dùng `new URL(req.url)` + regex để bắt path params như `:id` | 02 |
