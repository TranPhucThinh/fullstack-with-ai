# Hoàn thành Bài 17 — TypeScript nâng cao (decorators, utility types)

Người học đã tự viết decorator `@time` (đo thời gian chạy method bằng `Date.now()`) vào `src/ts17-decorators-demo.ts`, gắn cùng `@log` lên `add()`. Đây là bằng chứng hiểu cơ chế decorator — không phải học vẹt cú pháp `@`.

## Evidence

- Đọc code thật `src/ts17-decorators-demo.ts`: `function time(target, propertyKey, descriptor)` đúng signature legacy `(target, propertyKey, descriptor)`; bọc `descriptor.value` bằng hàm mới; dùng `Date.now()` đo start/end; gắn `@log` + `@time` lên `add()`.
- Verify bằng chạy thật (Node v24.16.0, TypeScript 7.0.2, tsx 4.23.9):
  - `npx tsc --noEmit` → exit 0.
  - `npx tsx src/ts17-decorators-demo.ts` → `→ add(2, 3)` · `← add Chạy mất: 0 ms` · `← add = 5` · `registry có CalcService: true` · `OK: decorators + utility types xanh`.

## Implications

- Người học tự viết được method decorator đúng signature + cơ chế bọc `descriptor.value` — nền trực tiếp cho hiểu `@Get()`/`@Post()` của NestJS.
- Điểm đáng chốt (để hỏi lại ở bài review): **thứ tự chồng decorator là bottom-up** — `@time` bọc `add` trước, `@log` bọc ngoài; output phản ánh đúng (log `→` chạy trước, rồi `@time` in ms, rồi log `←`). Chưa chắc người học tự nhận ra — ghi để kiểm chứng hiểu sâu.
- Utility types (`Partial`/`Pick`/`Omit`/`Readonly`) đã nắm ở mức dùng được — sẽ thực chiến với `PartialType()`/`OmitType()` ở bài 22 (DTO NestJS).
- Vùng phát triển gần: **Bài 18 — Chạy TS với Node (tsx vs tsc build, tsconfig deep-dive)** rồi **Bài 19 — vì sao NestJS chọn TS + DI** (đóng Module 3).
