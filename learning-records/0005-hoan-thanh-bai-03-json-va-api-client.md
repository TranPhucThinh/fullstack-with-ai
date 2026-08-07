# Hoàn thành Bài 03 — JSON & API client (curl/Postman)

Người học đã hoàn thành Bài 03: thêm POST /api/courses vào server, hiểu JSON là định dạng trao đổi dữ liệu trung gian, biết gom body thủ công trong Node thuần qua `req.on('data')` + `req.on('end')`, và dùng curl với `-X POST -H -d`.

## Đã làm được (verify sandbox sạch)
- POST tạo course → JSON course mới, HTTP 201
- GET list → 3 courses (gồm course mới), HTTP 200
- POST thiếu title → `title: undefined` bị JSON.stringify lược bỏ (lỗi cố ý: thiếu validation)
- `npx tsc --noEmit` → exit 0

## Điểm yếu cần chú ý
- Thiếu validation trên body — server chấp nhận dữ liệu thiếu trường, tạo object khuyết. Đây là lỗi production phổ biến, sẽ được giải quyết khi tới Express (middleware) và NestJS (ValidationPipe)

## Implications
- Bài 04 (event loop) sẽ giải thích vì sao `req.on('data')` hoạt động kiểu event-based — mở rộng tư duy non-blocking
- Kết thúc Module 0 (HTTP & Web) — người học đã nắm HTTP, REST, JSON, có server REST chạy được với GET + POST
