# Hoàn thành Bài 19 — Vì sao NestJS chọn TypeScript + Dependency Injection

Người học đã tự dựng một DI container mini trong `src/di-demo.ts`: đăng ký factory theo token, resolve dependency lồng nhau và cache instance theo singleton scope. Đây là bằng chứng đã đi từ khái niệm “đối tượng không tự tạo dependency” sang cơ chế chạy được.

## Evidence

- Đọc code thật `src/di-demo.ts`:
  - `register<T>()` lưu factory theo token và trả `this` để chain.
  - `resolve<T>()` ưu tiên singleton cache, báo lỗi rõ khi thiếu provider, rồi tạo và cache instance.
  - Factory `courseService` nhận container và resolve `database` thay vì tự `new` hoặc import dependency trực tiếp.
  - Kết quả cuối được gọi qua `container.resolve<CourseService>('courseService')`.
- Theo quy ước hiện tại của người học, phiên này chỉ review diff; không chạy typecheck/test.

## Implications

- Đã nắm được lõi Dependency Injection ở mức cơ chế, không chỉ thuộc định nghĩa.
- Đã phân biệt được trách nhiệm của object với trách nhiệm của container: object dùng dependency; container tạo, nối và quản lý vòng đời dependency.
- Điểm cần kiểm chứng ở bài sau: generic `resolve<T>()` hiện dựa vào type assertion, nên token chuỗi và kiểu `T` có thể nói dối nhau; NestJS dùng class token + metadata để giảm việc nối thủ công này.
- Vùng phát triển gần: **Bài 20 — NestJS là gì**, ánh xạ container mini sang provider/controller/module thật và hiểu vai trò của module trong dependency graph.
