# Hoàn thành Bài 04 — Node.js là gì, event loop, non-blocking I/O

Người học đã hoàn thành Bài 04: hiểu Node.js = V8 + libuv, phân biệt blocking vs non-blocking I/O qua demo thực tế, và nắm cấu trúc event loop (timers → poll → check) với microtask queue.

## Đã làm được
- Viết và chạy `blocking-vs-nonblocking.mjs` — thấy rõ readFileSync chặn luồng chính, readFile thì không
- Viết và chạy `event-loop-order.mjs` — output: 1 → 6 → 4 → 5 → 3 → 2 (xác nhận microtask chạy trước timer/check)
- Hiểu cái giá của single-thread: non-blocking I/O chỉ giúp cho tác vụ I/O, CPU-bound vẫn block event loop

## Điểm nổi bật
- Code demo đã verify trên sandbox sạch với Node 24 — output thật khác với docs cũ về thứ tự Promise.then vs process.nextTick
- Đã cập nhật comment trong bài cho đúng với output thay vì copy từ docs

## Điểm yếu cần chú ý
- Thứ tự microtask (Promise.then vs process.nextTick) khác nhau giữa các version Node — cần nhấn mạnh "không phụ thuộc thứ tự microtask" trong tương lai

## Implications
- Bài 05 (Module system) sẽ dùng `import`/`export` — giải thích CJS/ESM song song
- Kết thúc Module 0, vào sâu Module 1 (Node.js từ gốc)
