# Hoàn thành Bài 08 — File system, streams, process, env

Người học đã hoàn thành trọn Module 1 (Node.js từ gốc). Bài này nối hai mảnh còn thiếu của tầng Node nền tảng: (1) stream — vì sao dữ liệu tới theo chunk, mở rộng từ `for await (const chunk of req)` đã thấy ở bài 07; (2) cách cấu hình dự án bằng `process.env` thay vì hardcode. Toàn bộ 6 demo chạy XANH trên máy thật, và đã áp dụng env PORT vào `src/server.ts`.

## Evidence

- Đã đọc code thật trong `elearning-backend/src/server.ts`: dòng `const PORT = Number(process.env.PORT ?? 4000)` — PORT đọc từ env, mặc định 4000.
- Đã đọc `.env` được người dùng tự tạo chứa `PORT=5000`, sau đó người dùng tự đổi thành `PORT=4000` để xử lý xung đột cổng.
- Verify bằng chạy thật cả 6 demo + áp dụng dự án (Node v24.16.0):
  - Demo 1 (fs/promises): `readFile`/`writeFile`, tạo `copy.txt` viết hoa, đường dẫn bền qua `fileURLToPath(import.meta.url)`.
  - Demo 2 (stream chunks): file 2MB đọc thành 32 chunks × 65536 bytes, tổng 2097152 — thấy rõ `highWaterMark` là ngưỡng bộ đệm.
  - Demo 3 (http stream): `createReadStream.pipe(res)` + Content-Length, curl ra `HTTP/1.1 200 OK`, `Content-Length: 2097152` — không nạp cả file vào RAM.
  - Demo 4 (process env): `argv`, `cwd()`, `NODE_ENV=production`, `SELF_PORT=4012` hiển thị đúng.
  - Demo 5 (exit code): exit=1 khi thiếu flag, exit=0 khi đủ — dùng `process.exitCode` không gọi `process.exit()`.
  - Demo 6 (bắt lỗi): đọc file không tồn tại bắt được `ENOENT`, chương trình vẫn chạy tiếp, không crash.
  - Áp dụng dự án: `PORT=4321 npm run dev` → server lắng nghe 4321 và curl trả list courses; `npm run dev` với `.env` PORT=4000 → log "✅ Server running at http://localhost:4000".

## Thực chiến: xử lý lỗi EADDRINUSE (cổng bị chiếm)

Trong lúc chấm bài phát hiện cổng 5000 trong `.env` bị tiến trình hệ thống macOS **ControlCenter (PID 1080)** chiếm giữ → `npm run dev` báo `EADDRINUSE: address already in use`. Đây không phải lỗi code — là bài toán thực tế mọi backend dev gặp. Người học đã tự đổi `.env` sang `PORT=4000` và server chạy lại bình thường. Đây là một win thực chiến: hiểu rằng cổng là tài nguyên chia sẻ, và env là cách tách cấu hình khỏi code.

## Implications

- Người học đã nắm trọn tầng Node nền tảng cần thiết trước khi sang framework: event loop, module system, HTTP server thuần, routing/query/body/validation thủ công, fs/stream/process/env. Đủ nền để hiểu bản chất mỗi thành phần Express/NestJS.
- Điểm mạnh: hiểu vì sao stream chảy theo chunk, vì sao cần Content-Length khi pipe, vì sao tách cấu hình khỏi code qua env. Biết `process.exitCode` thay vì `process.exit()` — chi tiết production mà ít junior chú ý.
- Điểm yếu cần theo dõi: chưa có thực hành đọc/ghi file LỚN qua stream với xử lý lỗi stream (sự kiện `error` của Readable/pipe) — mới dừng ở pipe đơn giản chưa có `pipeline()`. Đây sẽ là điểm nhấn khi gặp upload file ở bài sau.
- Vùng phát triển gần: bài 09 "Vì sao cần framework?" — người học đã tự xây đủ routing/query/body/env, giờ đối chiếu với Express để thấy mỗi thành phần đóng gói sẵn giải quyết đúng bài toán nào. Đây là mảnh ghép cuối của Module 1 trước khi sang Express.