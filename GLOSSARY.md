# Glossary — Senior Backend Node.js/NestJS

Thuật ngữ được thêm vào khi người học đã dùng ĐÚNG (rule A23). Cập nhật cùng lúc với learning-record.

| Thuật ngữ | Định nghĩa (tiếng Việt) | Bài |
| **event loop** | Vòng lặp vô hạn của Node chia thành nhiều phase (timers, poll, check) — mỗi phase xử lý một loại callback riêng, microtask ưu tiên cao hơn | 04 |
| **non-blocking I/O** | Cơ chế Node không chờ I/O hoàn thành — gửi yêu cầu xuống libuv rồi đi làm việc khác, khi I/O xong thì callback được đưa vào event loop | 04 |
| **libuv** | Thư viện C xử lý I/O bất đồng bộ — dùng thread pool (cho file/DNS) và epoll/kqueue (cho network) | 04 |
| **microtask** | Hàng đợi ưu tiên cao trong event loop — Promise.then, process.nextTick chạy trước timer/check phase | 04 |
| **setImmediate** | Hàm Node đưa callback vào phase check của event loop — chạy sau I/O hiện tại | 04 |
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
| **CommonJS (CJS)** | Hệ thống module cũ của Node (2009) dùng `require`/`module.exports`, nạp đồng bộ — vẫn tồn tại song song với ESM vì nhiều thư viện cũ chưa chuyển | 05 |
| **ES Modules (ESM)** | Chuẩn module chính thức của JavaScript (ES6, 2015) dùng `import`/`export`, nạp bất đồng bộ — file `.mjs` hoặc `"type":"module"` kích hoạt | 05 |
| **package.json** | File cấu hình trái tim của dự án npm: khai `type` (module system), scripts, dependencies/devDependencies | 05 |
| **devDependencies** | Gói chỉ cần khi phát triển (typescript, @types/node) — không cần trên server production | 05 |
| **dependencies** | Gói cần để chạy ở production (vd tsx) | 05 |
|**ESM local import đuôi .js** | Trong Node ESM, import file local phải ghi đủ đuôi `.js` (tương ứng `.ts` sau khi biên dịch) — khác bundler, hay gây lỗi khi chuyển ngữ cảnh | 05 |
