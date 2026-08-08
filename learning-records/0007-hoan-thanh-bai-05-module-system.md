# Hoàn thành Bài 05 — Module system (CJS/ESM), npm, package.json

Người học đã hoàn thành Bài 05: hiểu hai hệ thống module của Node (CommonJS vs ESM), biết cái gì quyết định dùng cái nào (đuôi file + "type" trong package.json), và đã tách dữ liệu khóa học ra module riêng trong dự án.

## Đã làm được
- Phân biệt CommonJS (`require`/`module.exports`, nạp đồng bộ, 2009) và ESM (`import`/`export`, nạp bất đồng bộ, 2015)
- Hiểu quy tắc quyết định: `.mjs` luôn ESM, `.cjs` luôn CJS, `.js` do `"type"` trong package.json
- Đọc hiểu package.json: `"type": "module"` giải thích vì sao viết `import`; phân biệt `dependencies` vs `devDependencies`
- Nhận biết lỗi `Cannot use import statement outside a module` khi thiếu `"type": "module"`
- **Mẩu chạy được:** tách `src/courses.ts` (interface Course + courses + createCourseId) và import vào `src/server.ts` — dự án vẫn chạy nguyên vẹn với GET + POST

## Verify trên sandbox sạch (dùng đúng package.json + package-lock.json + tsconfig.json của người học)
- Môi trường: Node v24.16.0 (máy người học notes ghi v20 — cần lưu ý), npm 11, TypeScript 7.0.2, tsx 4.23.9
- `npx tsc --noEmit` → exit 0
- GET /api/courses → JSON 2 courses, HTTP 200
- GET /api/courses/2 → course id=2, HTTP 200
- GET /api/courses/99 → `{"error":"Course not found"}`, HTTP 404
- POST → `{"id":3,...}`, HTTP 201, GET list lại → 3 courses
- Demo ESM (`hello.mjs`) → "Xin chào, An!"; Demo CJS (`use-cjs.cjs`) → "Chào cjs, Bình!"

## Điểm cần chú ý
- **Node version trên máy thật khác note:** máy người học notes ghi `v20.19.3 LTS`, nhưng sandbox verify dùng node v24.16.0 (lệnh `node -v` trả v24). Cần cập nhật lại `NOTES.md` và kiểm chứng node thật của người học trước bài sau.
- Quy ước ESM import file local phải ghi đuôi `.js` (dù source là `.ts`) — điểm dễ nhầm khi chuyển từ bundler.

## Implications
- Bài 06 (HTTP server bằng Node thuần / http module) sẽ dùng `node:http` — giờ người học đã hiểu `import ... from 'node:http'` là module ESM như thế nào
- Từ giờ dự án có cấu trúc module rõ ràng (`src/courses.ts`) — nền tảng để bài sau thêm nhiều file hơn
