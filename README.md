# Fullstack with AI — Khóa học Senior Backend Node.js/NestJS

Workspace này là **trạng thái sống** của khóa học `/teach` — không phải chat session. Chat session có thể mất khi đổi thiết bị, nhưng **mọi thứ cần thiết để tiếp tục đều nằm trong các file dưới đây** (đã push lên GitHub).

## Cấu trúc workspace

| File/Thư mục | Vai trò |
|---|---|
| `MISSION.md` | Vì sao học, mục tiêu, ràng buộc, dự án song song |
| `NOTES.md` | Hồ sơ người học, máy thật, quy ước, git workflow |
| `RESOURCES.md` | Nguồn kiến thức chính chủ + cộng đồng |
| `GLOSSARY.md` | Thuật ngữ đã học (cập nhật cùng learning-record) |
| `learning-records/` | **Trí nhớ dài hạn** — đã học gì, yếu gì, quyết định gì |
| `lessons/index.html` | Mục lục lộ trình 66 bài + thanh tiến độ |
| `lessons/00NN-*.html` | Các bài học (mở bằng trình duyệt) |
| `lessons/lesson.css` + `lesson-enhance.js` | Design system chuẩn của khóa /teach |
| `elearning-backend/` | Dự án thực hành — lớn dần theo từng bài |

## Cách tiếp tục khi đổi thiết bị (mất session chat)

1. **Clone repo** về máy mới:
   ```bash
   git clone https://github.com/TranPhucThinh/fullstack-with-ai.git
   cd fullstack-with-ai
   ```
2. **Mở thư mục này trong VS Code**
3. **Mở session chat mới** với skill `/teach`
4. Nói với AI: *"Tiếp tục khóa học senior backend — đọc workspace và cho tôi biết tôi đang ở đâu"*
5. AI sẽ đọc `MISSION.md`, `NOTES.md`, `learning-records/`, `lessons/index.html` để **tái dựng toàn bộ trạng thái** — biết bạn đang ở bài nào, đã học gì, yếu gì, quy ước gì

> ⚠️ **Quan trọng:** đừng xóa workspace cũ trước khi chắc chắn đã push hết. Nếu máy cũ vẫn còn, hãy `git push` lần cuối trước khi chuyển.

## Quy trình git (đã chốt)

- **Push TRƯỚC mỗi bài mới**: commit + push bài học cũ (kể cả code bài tập) trước khi soạn bài tiếp theo
- Mỗi bài = 1 commit, message: `teach(backend): Bài NN - <tiêu đề>`
- `.agents/` (cấu hình skill) bị ignore — không commit

## Trạng thái hiện tại

- **0 / ~66 bài hoàn thành** — Bài 00 (dựng môi trường) đã soạn, sẵn sàng làm
- Xem chi tiết: mở `lessons/index.html` trong trình duyệt