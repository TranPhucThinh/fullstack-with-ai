# Hoàn thành Bài 20 — NestJS app đầu tiên: bootstrap và root module

Người học đã tự dựng NestJS app tối thiểu trong `src/nest/` (main.ts, app.module.ts, app.controller.ts) và xác nhận chạy thật: `npm run dev:nest` + `curl http://localhost:3000/` trả đúng `{ "message": "E-Learning NestJS đã chạy" }`. Đây là bước chuyển từ container mini tự viết (Bài 19) sang DI thật của NestJS.

## Evidence

- Đọc code thật `src/nest/`:
  - `main.ts` import `reflect-metadata`, gọi `NestFactory.create(AppModule)`, `listen(3000)`, catch lỗi set `exitCode = 1`.
  - `app.module.ts` dùng `@Module({ controllers: [AppController] })` — root module khai báo node đầu tiên của application graph.
  - `app.controller.ts` dùng `@Controller()` + `@Get()` trả object `{ message: 'E-Learning NestJS đã chạy' }`.
  - `package.json` có script `dev:nest: "tsx watch src/nest/main.ts"`.
- Người học xác nhận đã chạy và nhận đúng kết quả mong đợi (theo quy ước tối ưu phiên, không verify thật).

## Implications

- Đã nắm được luồng bootstrap `main → module → controller`: NestFactory nhận root module, container đọc metadata `@Module()`, tạo instance controller, gắn route lên HTTP adapter.
- Đã hiểu root module là "composition root" — nơi nối hệ thống, không chứa nghiệp vụ.
- Điểm cần kiểm chứng ở bài sau: controller hiện chưa có dependency; bài 21 sẽ thêm service và quan sát container tự resolve qua constructor — đây là lúc DI thật của NestJS (class token + metadata) thay thế token chuỗi của container mini.
- Vùng phát triển gần: **Bài 21 — Controller, Service, Provider**, vòng đời request và cách Nest biết phải đưa instance nào vào constructor.