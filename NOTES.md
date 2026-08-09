# Ghi chú phiên dạy

## Hồ sơ người học
- Học bằng tiếng Việt, có nền Node.js/Express cơ bản (đã viết vài API đơn giản), chưa biết NestJS
- Muốn hiểu bản chất & vì sao, ghét học vẹt
- Mục tiêu: thăng tiến senior backend tại công ty hiện tại
- Đã chọn chế độ DỰ ÁN SONG SONG: e-learning platform (backend NestJS)

## Máy thật (dò ngày 08/06/2026)
- macOS Tahoe, shell zsh
- Node v24.16.0 (LTS), npm 11.13.0, pnpm 10.33.0
- Docker 29.1.5 (daemon RUNNING) — dùng cho PostgreSQL
- git 2.50.1, Homebrew 6.0.2
- CHƯA có PostgreSQL native → dùng Docker container

## Quy ước
- Tạo thư mục dự án `elearning-backend/` tại workspace gốc
- Mỗi bài đóng góp mẩu CHẠY ĐƯỢC vào dự án
- Chấm bài = đọc file thật + chạy test thật

## Git workflow (người học yêu cầu 08/06/2026)
- Repo: https://github.com/TranPhucThinh/fullstack-with-ai.git (branch `main`)
- **Push TRƯỚC mỗi bài mới**: commit + push bài học cũ (kể cả code bài tập người học viết) trước khi soạn bài tiếp theo
- Đã push: commit `58cfb6b` phase khởi tạo (MISSION, lộ trình, Bài 00)
- `.agents/` (cấu hình skill) bị ignore — KHÔNG commit
- Git user: `thinh.18` / `thinh.tp@devtify.com`
- Message mẫu: `teach(backend): Bài NN - <tiêu đề>`
## Đang làm việc — Bài 11 (Middleware nâng cao — error, logging, CORS)

- ✅ **Bài 08 HOÀN THÀNH** (verify 6 demo + env PORT chạy xanh; LR-0010 + GLOSSARY đã ghi; đã commit+push).
- ✅ **Bài 09 HOÀN THÀNH** (học viên đã đọc xong; LR-0011 + GLOSSARY thuật ngữ bài 09 đã ghi).
- ✅ **Bài 10 ĐÃ SOẠN** (`0010-express-co-ban.html` — cài Express 5.2.1 + @types/express 5.0.6, viết lại server courses bằng app.METHOD/req.query/req.params/req.body/res.json; verify 6 endpoint curl XANH). Đã cập nhật index.html (bài 10 → now "sẵn sàng", progress 10/~66). Chờ học viên thực hành.
- Thực chiến: học viên gặp EADDRINUSE cổng 5000 do ControlCenter macOS chiếm → tự đổi `.env` sang `PORT=4000`. Đã ghi vào LR-0010.
- Điểm yếu cần theo dõi: chưa có thực hành xử lý lỗi stream (sự kiện `error`/`pipeline()`) — sẽ gặp khi bài upload file.
- Tiếp theo: soạn `lessons/0011-middleware-nang-cao.html` — middleware log tự viết, error-handling middleware (4 tham số), CORS.
- Lưu ý: `.gitignore` đã bổ sung `elearning-backend/demo/SW.js` + `copy.txt` (file phát sinh demo 08).
