# Hoàn thành Bài 00 — Dựng môi trường + khung dự án e-learning

Người học đã hoàn thành toàn bộ Bài 00: dựng xong khung dự án `elearning-backend/` chạy được với server Node (TS) + PostgreSQL trong Docker.

## Đã làm được (verify trên máy thật 08/06/2026)
- Tạo `elearning-backend/` với `package.json` (`"type": "module"`, scripts `dev`/`start`), `tsconfig.json` (strict, NodeNext), `src/server.ts` (server HTTP thuần Node, cổng 4000)
- Cài `tsx` (chạy TS trực tiếp) + `@types/node`
- Server chạy, `curl` trả **HTTP 200**
- `docker-compose.yml` khai báo PostgreSQL 16, `docker compose up -d` chạy, `pg_isready` trả `accepting connections`
- Tạo `.gitignore` (chặn `node_modules/`, `dist/`, `.env`)

## Điểm yếu / lỗi gặp phải (quan trọng cho bài sau)
1. **Lỗi `tsconfig.json` thiếu `rootDir`**: khi mở file trong editor, TS 7 báo "The common source directory of 'tsconfig.json' is './src'. The 'rootDir' setting must be explicitly set". Đã sửa bằng thêm `"rootDir": "./src"`. → Người học cần hiểu `rootDir`/`outDir` để không vấp lại.
2. **`npx tsc` tải nhầm gói rác `tsc@2.0.4`** (deprecated, không phải TypeScript compiler) vì dự án chưa cài package `typescript`. Đã cài `typescript@7.0.2` làm devDependency. → Bài học: gõ đúng tên gói đầy đủ, không tin `npx` tải tự động.

## Implications
- Người học đã có môi trường chạy được — sẵn sàng cho Module 0 (HTTP & Web)
- Bài 01 (HTTP là gì) nên tận dụng server `src/server.ts` đang chạy để minh họa request/response thực tế
- Nhắc lại `rootDir`/`outDir` khi cần (nếu người học vấp lại ở bài sau)