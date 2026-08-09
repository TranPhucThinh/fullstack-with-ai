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
## Đang làm việc — Bài 10 (Express cơ bản — routing, middleware)

- ✅ **Bài 08 HOÀN THÀNH** (verify 6 demo + env PORT chạy xanh; LR-0010 + GLOSSARY đã ghi; đã commit+push).
- ✅ **Bài 09 HOÀN THÀNH soạn** (`0009-vi-sao-can-framework.html` — bài cầu nối: đối chiếu routing table/query/body/env ↔ Express API; trích docs Express 5.x routing). Đã cập nhật index.html (bài 08/09 → done, progress 9/~66). Chờ học viên đọc.
- Thực chiến: học viên gặp EADDRINUSE cổng 5000 do ControlCenter macOS chiếm → tự đổi `.env` sang `PORT=4000`. Đã ghi vào LR-0010.
- Điểm yếu cần theo dõi: chưa có thực hành xử lý lỗi stream (sự kiện `error`/`pipeline()`) — sẽ gặp khi bài upload file.
- Tiếp theo: soạn `lessons/0010-express-co-ban.html` — cài Express vào dự án, viết lại server bằng app.get/app.post/express.json()/res.json(), chạy thật.
- Lưu ý: `.gitignore` đã bổ sung `elearning-backend/demo/SW.js` + `copy.txt` (file phát sinh demo 08).
