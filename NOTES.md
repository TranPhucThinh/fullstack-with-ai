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

## Đang làm việc — Bài 17 (TS nâng cao — decorators, utility types)

- ✅ **Bài 08 HOÀN THÀNH** (verify 6 demo + env PORT chạy xanh; LR-0010 + GLOSSARY đã ghi; đã commit+push).
- ✅ **Bài 09 HOÀN THÀNH** (học viên đã đọc xong; LR-0011 + GLOSSARY thuật ngữ bài 09 đã ghi).
- ✅ **Bài 10 HOÀN THÀNH** (học viên tự viết `src/server.ts` bằng Express 5.2.1; typecheck exit 0 + 6 endpoint curl XANH trên cổng 4000; LR-0012 + GLOSSARY thuật ngữ bài 10 đã ghi; đã commit+push code bài tập của học viên).
- ✅ **Bài 11 HOÀN THÀNH** (`src/server.ts` học viên viết đã chạy XANH: log in ra, Access-Control-Allow-Origin: *, /api/boom trả JSON 500 không crash; LR-0013 + GLOSSARY đã ghi; sẽ commit + push code bài tập cùng bài 11).
- ✅ **Bài 12 HOÀN THÀNH** (học viên tự viết `src/db.ts` + `src/server.ts` CRUD users bằng pg.Pool + SQL thật; typecheck exit 0 + full CRUD curl XANH trên PostgreSQL 16: POST 201, GET, PUT, DELETE 204/404, ép kiểu id tránh 500; LR-0014 + GLOSSARY đã ghi; code học viên sẽ commit cùng bài 12).
- ✅ **Cheat-sheet MỐC**: tạo `reference/node-express-cheatsheet.html` (Bài 05–11) — vì đã qua 5+ bài kể từ cheat-sheet gần nhất (rule A22).
- Thực chiến: học viên gặp EADDRINUSE cổng 5000 do ControlCenter macOS chiếm → tự đổi `.env` sang `PORT=4000`. Đã ghi vào LR-0010.
- Điểm yếu cần theo dõi: (1) `courses` là module-level array bị mutate giữa lần chạy tsx watch — bài 12 giải bằng PostgreSQL; (2) chưa thực hành xóa express.json() để thử lỗi; (3) chưa có thực hành xử lý lỗi stream (pipeline()).
- ✅ **Bài 13 HOÀN THÀNH** (học viên tự tạo bảng courses/enrollments + insert + JOIN trên PostgreSQL 16 thật; verify: 3 bảng users/courses/enrollments, 2 khóa, 3 enrollment, JOIN "user 1 học khóa nào" đúng; LR-0015 + GLOSSARY thuật ngữ bài 13 đã ghi; index.html cập nhật Bài 13 → done).
- ✅ **Bài 14 HOÀN THÀNH** (học viên tự viết auth vào src/server.ts + FIX lỗi type userId bằng src/types/express.d.ts — module augmentation; sửa luôn lỗi `FROM user` → `users`; verify typecheck exit 0 + 6 case curl XANH: register 201, register trùng 409, login sai 401, me không token 401, me có token 200; LR-0016 + GLOSSARY 10 thuật ngữ bài 14 đã ghi; index.html Bài 14 → done; commit a23c907 đã push).
- Điểm mạnh mới: tự fix lỗi type bằng TS module augmentation — đúng cách senior; chủ động sửa lỗi SQL trong code mẫu.
- ✅ **Bài 15 HOÀN THÀNH** (học viên tự thêm CRUD courses/enrollments/me-courses vào src/server.ts — gom thành API e-learning hoàn chỉnh; verify typecheck exit 0 + flow curl XANH: register 201, register trùng 409, login 200, create course có token 201 / không token 401, enroll 201, me/courses 200 JOIN; LR-0017 + GLOSSARY 3 thuật ngữ bài 15 đã ghi; index.html Bài 15 → done; commit d75e584 đã push).
- ✅ **Bài 16 HOÀN THÀNH** (học viên tự thêm `interface CreateCourseBody` + `req.body as CreateCourseBody` vào src/server.ts; verify `npx tsc --noEmit` exit 0 + `tsx demo/ts16-verify.ts` XANH: type alias/union/interface/generics đúng; LR-0018 + GLOSSARY 5 thuật ngữ bài 16 đã ghi).
- Tiếp theo: soạn Bài 17 "TS nâng cao — decorators (nền tảng NestJS), utility types" — bài cuối Module 3 trước khi sang NestJS.
- Lưu ý: `.gitignore` đã bổ sung `elearning-backend/demo/SW.js` + `copy.txt` (file phát sinh demo 08).