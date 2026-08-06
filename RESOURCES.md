# Senior Backend (Node.js/NestJS) Resources

## Knowledge

- [NestJS Official Docs](https://docs.nestjs.com/)
  Nguồn chân lý #1 cho framework. Use for: mọi khái niệm NestJS — module, DI, guard, interceptor, pipe, provider, testing. Luôn tra bản mới nhất, không tin trí nhớ.
- [Node.js v20 API Docs](https://nodejs.org/docs/latest-v20.x/api/)
  Nguồn chính thống cho runtime Node 20 (máy người học đang dùng LTS). Use for: event loop, streams, crypto, process, worker_threads.
- [Node.js — Official Guides](https://nodejs.org/en/learn)
  Bài viết dạy khái niệm nền tảng (blocking/non-blocking, event loop, modules).
- [TypeScript Official Docs](https://www.typescriptlang.org/docs/)
  Nguồn chính thống cho TS — decorators, generics, utility types. NestJS xây trên TS nên cần vững.
- [PostgreSQL Official Docs](https://www.postgresql.org/docs/)
  Nguồn chân lý cho database — indexing, transactions, isolation levels, JSONB. Tra khi thiết kế schema dự án e-learning.
- [TypeORM Official Docs](https://typeorm.io/)
  ORM dùng với NestJS (@nestjs/typeorm). Use for: entities, relations, migrations, query builder.
- [Passport.js Official Docs](http://www.passportjs.org/)
  Nền tảng auth của Passport strategies trong NestJS (@nestjs/passport). Use for: hiểu bản chất strategy trước khi dùng guard.
- [JWT.io](https://jwt.io/)
  Debug & hiểu cấu trúc JWT (header/payload/signature). Use for: bài auth.
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
  Chuẩn bảo mật auth từ OWASP. Use for: quyết định password storage, session, token policy. Senior phải biết bảo mật.
- [OWASP API Security Top 10](https://owasp.org/API-Security/)
  Top 10 lỗ hổng API — checklist review bảo mật cho dự án. Use for: bài bảo mật & review code.
- [12-Factor App](https://12factor.net/)
  Nguyên tắc thiết kế ứng dụng production. Use for: config, logging, env, statelessness — nền tảng tư duy senior.
- [Martin Fowler — patterns of distributed systems](https://martinfowler.com/articles/patterns-of-distributed-systems/)
  Pattern hệ thống phân tán. Use for: bài nâng cao (queue, retry, idempotency, saga) khi dự án mở rộng.
- [PostgreSQL: Effective Indexing](https://use-the-index-luke.com/)
  Sách online về index SQL — giải thích vì sao index hoạt động. Use for: tối ưu query dự án e-learning thật.

## Wisdom (Communities)

- [r/nodejs](https://www.reddit.com/r/nodejs/)
  Subreddit lớn cho Node.js. Use for: xu hướng, tranh luận kiến trúc, hỏi khi bí.
- [r/NestJS](https://www.reddit.com/r/NestJS/)
  Cộng đồng NestJS. Use for: hỏi pattern NestJS cụ thể.
- [Node.js Discord](https://discord.com/invite/nodejs)
  Official Discord Node.js. Use for: hỏi nhanh, thấy cách senior trả lời.
- [NestJS Discord](https://discord.gg/nestjs)
  Official Discord NestJS. Use for: hỏi framework, đọc cách maintainer phản hồi.
- Đồng nghiệp tại công ty (code review thật)
  Nơi kiểm chứng kỹ năng review code — quan trọng nhất vì mission là thăng tiến nội bộ.

## Gaps

- Chưa có nguồn chính chủ riêng cho: Stripe payment integration (sẽ tra docs.stripe.com khi tới bài thanh toán), email sending (Resend/SendGrid — tra khi tới bài reset password). Bổ sung đúng thời điểm.
- Chưa kiểm chứng bản NestJS mới nhất tại thời điểm khóa học — sẽ tra docs.nestjs.com khi soạn bài 01.