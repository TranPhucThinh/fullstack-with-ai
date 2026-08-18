# Hoàn thành Bài 22 — DTO · ValidationPipe · class-validator

Người học đã thêm `CreateCourseDto` (class có validator decorators), bật `ValidationPipe({ whitelist: true })` toàn cục, và thêm `POST /courses` nhận `@Body() dto: CreateCourseDto`. Đây là lần đầu tiên Nest tự validate body ở tầng pipe thay vì if/else trong controller.

## Evidence

- Đọc code thật `src/nest/`:
  - `create-course.dto.ts`: `@IsString()` + `@IsNotEmpty()` cho `title!`, `@IsOptional()` + `@IsNumber()` + `@Min(0)` + `@Max(100_000_000)` cho `price?`.
  - `main.ts`: `app.useGlobalPipes(new ValidationPipe({ whitelist: true }))`.
  - `app.controller.ts`: `@Post('courses')` nhận `@Body() dto: CreateCourseDto`.
- Người học gửi output thật 4 case curl:
  - POST hợp lệ → 201 Created, trả DTO.
  - Thiếu title → 400 `"title should not be empty"`.
  - price âm → 400 `"price must not be less than 0"`.
  - Gửi `roleAdmin` + `hackField` → bị whitelist loại bỏ, trả 201 chỉ title+price.

## Implications

- Đã hiểu **vì sao DTO phải là class**: class-validator cần decorators, interface bị xóa khi build.
- Đã hiểu **whitelist chống mass-assignment**: field lạ (vd `roleAdmin`) bị loại trước khi tới controller — bảo vệ khỏi tấn công gán field nhạy cảm.
- Nắm được luồng: pipe transform body thành DTO instance → validate → chỉ dữ liệu hợp lệ tới controller.
- Vùng phát triển gần: **Bài 23 — TypeORM + PostgreSQL trong NestJS** — nối database thật: entity, repository, migration. `POST /courses` sẽ thực sự lưu vào bảng `courses` thay vì trả lại DTO.