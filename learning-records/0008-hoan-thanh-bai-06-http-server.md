# Hoàn thành Bài 06 — HTTP server bằng Node thuần (http module)

Người học đã hoàn thành Bài 06: hiểu req/res là đối tượng gì trong node:http, phân biệt res.write/res.end, và viết 2 demo inspect request thật.

## Đã làm được (verify trên máy thật Node v24.16.0)
- `demo/inspect-http.mjs` — server in ra `req.method`, `req.url`, `req.headers`, `req.headers.host` đúng khi curl
- `demo/response-options.mjs` — trả HTTP 404 + 3 phần body (write, write, end), thể hiện res là stream ghi
- Hiểu `req` = http.IncomingMessage (extends stream.Readable) — method/url/headers, body qua data/end
- Hiểu `res` = http.ServerResponse (extends OutgoingMessage) — statusCode, setHeader, writeHead, write, end
- Nhận ra `createServer(listener)` là shorthand của EventEmitter `'request'`

## Verify trên sandbox + máy thật
- Chạy thật: curl 4010 → in đúng method/url/headers; curl -i 4011 → HTTP/1.1 404 + Phần 1/Phần 2/Xong!
- Document chính chủ: Node.js v24 docs — IncomingMessage, ServerResponse, Anatomy of an HTTP Transaction

## Điểm cần chú ý cho bài sau
- Người học đã thấy `req.url` là chuỗi chưa phân rã (path + query lẫn nhau), body phải gom bằng stream
- Bài 07 sẽ dạy routing thủ công có cấu trúc: bảng route, parse query, gom body, trả JSON — nền để hiểu Express

## Implications
- Đã nắm tầng thấp nhất của web server — giờ có thể mổ xẻ cách Express làm routing trên cùng nền này
- Sẵn sàng cho Bài 07 (xử lý request/response thủ công)
