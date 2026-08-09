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

## QUY ƯỚC MỚI — Package cài sẵn (học viên quyết định 09/08/2026)
- **Từ nay: AI CỨ CÀI package cần thiết cho bài vào dự án** (kể cả verify trước). Người học **KHÔNG cần** bước "dạy cài đặt" trong bài — họ TỰ BIẾT cài.
- Trong bài, thay vì khối lệnh `npm install ...`, chỉ **nêu package đã có sẵn** (tên + version đã verify) và nếu clone mới thì `npm install` là đủ.
- Điều này áp dụng cho MỌI package tương tự từ nay (pg, @types/pg, jest, bcrypt, jsonwebtoken, ...) — không phải giữ trạng thái "sạch" rồi bắt học viên tự cài.
- Ghi verifier đã cài: `pg@8.23.0`, `@types/pg@8.21.0` (đã verify CRUD XANH trên PostgreSQL 16).

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
- ✅ **Bài 12 HOÀN THÀNH** (học viên tự viết `src/db.ts` + `src/server.ts` CRUD users bằng pg.Pool + SQL thật; typecheck exit 0 + full CRUD curl XANH trên PostgreSQL 16: POST 201, GET, PUT, DELETE 204/404, ép kiểu id tránh 500; LR-0014 + GLOSSARY đã ghi; code học viên sẽ commit cùng bài 12).
- ✅ **Cheat-sheet MỐC**: tạo `reference/node-express-cheatsheet.html` (Bài 05–11) — vì đã qua 5+ bài kể từ cheat-sheet gần nhất (rule A22).
- Thực chiến: học viên gặp EADDRINUSE cổng 5000 do ControlCenter macOS chiếm → tự đổi `.env` sang `PORT=4000`. Đã ghi vào LR-0010.
- Điểm yếu cần theo dõi: (1) `courses` là module-level array bị mutate giữa lần chạy tsx watch — bài 12 giải bằng PostgreSQL; (2) chưa thực hành xóa express.json() để thử lỗi; (3) chưa có thực hành xử lý lỗi stream (pipeline()).
- Tiếp theo: học viên thực hành Bài 12 (đã soạn + verify). Sau khi học viên hoàn thành: ghi LR-0014 + bổ sung GLOSSARY thuật ngữ bài 12 (pg, Pool, parameterized query, SERIAL/PRIMARY KEY/UNIQUE, SQL injection) — quy tắc A23.
- Lưu ý: `.gitignore` đã bổ sung `elearning-backend/demo/SW.js` + `copy.txt` (file phát sinh demo 08).
