# Hoàn thành Bài 21 — Controller · Service · Provider — DI thật trong NestJS

Người học đã chuyển từ container mini tự viết (Bài 19) sang DI thật của NestJS: thêm `CoursesService` (@Injectable), đăng ký vào `AppModule.providers`, và để `AppController` inject qua constructor. Đây là lần đầu tiên Nest container tự resolve dependency từ metadata TypeScript.

## Evidence

- Đọc code thật `src/nest/`:
  - `courses.service.ts`: `@Injectable()` đánh dấu provider, `findAll()` trả mảng khóa học từ dữ liệu tạm.
  - `app.module.ts`: `providers: [CoursesService]` — provider token là chính class.
  - `app.controller.ts`: `constructor(private readonly coursesService: CoursesService)` — Nest tự inject, không gọi `new`.
- `tsconfig.json` đã thêm `emitDecoratorMetadata: true`; `package.json` đổi `dev:nest` sang `tsc && node --watch dist/nest/main.js` (tsx/esbuild không emit `design:paramtypes` nên DI lỗi).
- Theo quy ước tối ưu phiên, không verify thật bằng curl.

## Implications

- Đã hiểu **vì sao chỉ viết constructor là đủ**: `design:paramtypes` do tsc sinh ra cho Nest biết kiểu cần inject; token = class chứ không phải chuỗi gõ tay (an toàn hơn container mini).
- Đã hiểu **vì sao không dùng tsx cho Nest**: esbuild không emit decorator metadata → service `undefined` → 500.
- Nắm được luồng: `@Injectable()` đánh dấu provider → đăng ký vào module → container tự nối constructor khi tạo controller.
- Vùng phát triển gần: **Bài 22 — DTO · ValidationPipe · class-validator** — xác thực body `POST /courses` ở đúng tầng thay vì tự if/else trong controller.