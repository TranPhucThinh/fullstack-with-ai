# Hoàn thành Bài 09 — Vì sao cần framework? Bài toán Express giải quyết

Người học đã hoàn thành bài cầu nối cuối Module 1: đối chiếu 1-1 từng thứ tự xây tay ở bài 07–08 với API Express, và nắm được ý tưởng middleware — lý do framework tồn tại. Đây là bài lý thuyết (không có code thực hành mới), kết thúc bằng quiz feedback tức thì.

## Evidence

- Đã đọc `lessons/0009-vi-sao-can-framework.html` và xác nhận hoàn thành (gồm 3 quiz kiểm tra nhanh).
- Nội dung nắm được (đối chiếu 1-1):
  - Bảng route `{ method, pattern, handler }` (bài 07) ↔ `app.get()/app.post()/...`
  - Regex `(\d+)` + `match[1]` ↔ route parameter `:id` → `req.params.id`
  - `parseQuery` (URLSearchParams) ↔ `req.query`
  - `readBody` (gom chunk + JSON.parse) ↔ middleware `express.json()` → `req.body`
  - `sendJson` (writeHead + end) ↔ `res.json()`
  - `process.env.PORT` (bài 08) ↔ cấu hình cổng app Express
- Hiểu middleware `(req, res, next)` là đường ống: các bước dùng chung (log, auth, body) viết một lần, xếp trước handler, áp dụng cho mọi route — giải bài toán "code dùng chung" mà bài 07–08 chưa giải.

## Implications

- Người học đã có đủ nền để dùng Express KHÔNG bị "ma thuật": biết mỗi API Express đang đóng gói bài toán gì đã tự làm tay. Đây chính là mục tiêu mission "hiểu bản chất trước khi dùng".
- Điểm mạnh: nắm được sự tương ứng 1-1, hiểu vì sao framework thắng (không phải nhanh hơn, mà là không viết lại + quy ước chung + hệ sinh thái middleware).
- Điểm yếu cần theo dõi: middleware mới dừng ở mức khái niệm, chưa viết/đọc thật. Bài 10 sẽ chuyển sang thực hành: cài Express, viết lại server bằng app.get/app.post/express.json()/res.json(), chạy thật.
- Vùng phát triển gần: bài 10 "Express cơ bản — routing, middleware" — người học sẽ thấy code tay bài 07–08 được thay bằng API Express và chạy được, củng cố sự tương ứng vừa học.