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
## Đang làm việc — Bài 12 (Kết nối PostgreSQL - SQL thật, CRUD users)

- ✅ **Bài 08 HOÀN THÀNH** (verify 6 demo + env PORT chạy xanh; LR-0010 + GLOSSARY đã ghi; đã commit+push).
- ✅ **Bài 09 HOÀN THÀNH** (học viên đã đọc xong; LR-0011 + GLOSSARY thuật ngữ bài 09 đã ghi).
- ✅ **Bài 10 HOÀN THÀNH** (học viên tự viết `src/server.ts` bằng Express 5.2.1; typecheck exit 0 + 6 endpoint curl XANH trên cổng 4000; LR-0012 + GLOSSARY thuật ngữ bài 10 đã ghi; đã commit+push code bài tập của học viên).
- ✅ **Bài 11 HOÀN THÀNH** (`src/server.ts` học viên viết đã chạy XANH: log in ra, Access-Control-Allow-Origin: *, /api/boom trả JSON 500 không crash; LR-0013 + GLOSSARY đã ghi; sẽ commit + push code bài tập cùng bài 11).
- Thực chiến: học viên gặp EADDRINUSE cổng 5000 do ControlCenter macOS chiếm → tự đổi `.env` sang `PORT=4000`. Đã ghi vào LR-0010.
- Điểm yếu cần theo dõi: (1) `courses` là module-level array bị mutate giữa lần chạy tsx watch — bài 12 giải bằng PostgreSQL; (2) chưa thực hành xóa express.json() để thử lỗi; (3) chưa có thực hành xử lý lỗi stream (pipeline()).
- Tiếp theo: soạn `lessons/0012-ket-noi-postgresql.html` — dùng Docker container PostgreSQL (đã có docker-compose bài 00), cài `pg`, CRUD users bằng SQL thật.
- Lưu ý: `.gitignore` đã bổ sung `elearning-backend/demo/SW.js` + `copy.txt` (file phát sinh demo 08).
