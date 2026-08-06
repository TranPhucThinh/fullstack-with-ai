# Mission: Senior Backend Engineer — Node.js / NestJS

## Why
Đang làm dev tại công ty, muốn thăng tiến lên **senior backend**. Senior không chỉ viết API cho chạy — mà phải ra quyết định kiến trúc, thiết kế hệ thống production-grade, review code, và tự chủ được toàn bộ một feature từ database đến API. Mục tiêu: đạt được năng lực đó qua việc xây dựng **dự án e-learning thực tế chạy song song từng bài**.

## Success looks like
- Tự thiết kế và build một backend NestJS production-grade hoàn chỉnh cho e-learning (auth, thanh toán, giỏ hàng, khóa học) — không cần nhìn tutorial
- Giải thích được **vì sao** chọn kiến trúc này thay vì kia (module, database design, auth strategy, caching, queue...) — ngang tầm phỏng vấn senior
- Viết test (unit + e2e) bao phủ nghiệp vụ quan trọng, CI chạy tự động
- Xử lý được các vấn đề production: lỗi, log, monitoring, performance, bảo mật, migration
- Có thể review code đồng nghiệp và chỉ ra lỗi kiến trúc/performance/security — kỹ năng cốt lõi của senior

## Constraints
- Học bằng tiếng Việt, **coi như chưa biết gì về backend — học từ gốc lên**: HTTP, Node.js thuần, Express từ nền tảng, RỒI mới tới NestJS
- **Học + làm dự án song song** — mỗi bài đóng góp một mẩu CHẠY ĐƯỢC vào dự án e-learning, không học lý thuyết suông
- Hiểu bản chất & vì sao, ghét học vẹt — muốn biết "dưới nền NestJS là gì" trước khi dùng
- Máy: macOS, Node v20.19.3 LTS, Docker 29 (daemon chạy), git, pnpm, npm, Homebrew; chưa có PostgreSQL (dùng Docker container)
- Giới hạn thời gian làm việc tại công ty → mỗi phiên nên vừa sức, có win rõ ràng

## Parallel project
có — dự án **E-Learning Platform** (backend NestJS): người dùng, đăng ký/đăng nhập/đăng xuất/quên-đổi mật khẩu, khóa học & bài giảng, giỏ hàng, mua hàng, thanh toán, quản lý đơn hàng, enrollment. Mỗi bài học thêm một mẩu chạy được vào dự án này.

## Out of scope
- Frontend (React/Next...) — chỉ làm backend, tối đa viết script/Postman để test API
- DevOps chuyên sâu (K8s, Terraform...) — chỉ tới mức Docker + CI cơ bản phục vụ dự án
- Các framework backend khác (Express nâng cao, Fastify...) — trừ khi cần để so sánh bản chất NestJS