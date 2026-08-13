# Hoàn thành Bài 16 — TypeScript cơ bản (type, interface, generics)

Người học đã tự áp dụng TypeScript vào dự án: thêm `interface CreateCourseBody` vào `src/server.ts` và ép kiểu `req.body as CreateCourseBody` thay cho `req.body ?? {}` kiểu lỏng trước đó — đúng thứ bài 16 dạy (thay `any` bằng type đúng). Demo `demo/ts16-verify.ts` (type alias, union, interface, generics) chạy xanh.

## Evidence

- Đã đọc code thật `src/server.ts`: `interface CreateCourseBody { title: string; price?: number; description?: string }` + dòng `const { title, price, description } = req.body as CreateCourseBody` trong `POST /api/courses`.
- Verify bằng chạy thật (Node v24.16.0, TypeScript 7.0.2):
  - `npx tsc --noEmit` → exit 0 (interface/ép kiểu đúng type, không lỗi).
  - `npx tsx demo/ts16-verify.ts` → `firstUser: An` · `firstNum: 10` · `OK: TS type/interface/generics xanh` (generic `first<T>` trả đúng kiểu; `@ts-expect-error` bắt đúng chỗ `role: 'superadmin'` sai union).

## Implications

- Người học đã hiểu 5 khái niệm nền của TS: type alias, union type, interface, generics, type assertion (`as`) — và thấy trực tiếp chúng "bắt lỗi lúc compile" (không chờ chạy mới lỗi).
- Điểm mạnh: tự nối được cầu "TS → NestJS" (biết union `Role` là nền cho RBAC, interface là nền cho DTO/Entity) — đúng mục tiêu Module 3.
- Điểm cần củng cố: `as CreateCourseBody` chỉ là ép kiểu tĩnh — CHƯA validate runtime (gửi `price: "abc"` vẫn lọt). Đã ghi nhận → bài 22 DTO/ValidationPipe sẽ xử lý.
- Vùng phát triển gần: **Bài 17 — TS nâng cao (decorators, utility types)** — decorators là thứ biến TS thành NestJS (`@Controller()`, `@Injectable()`), utility types (`Partial`, `Pick`, `Omit`) giúp viết type linh hoạt hơn. Đây là bước cuối trước khi sang Module 4 (NestJS).
