# Glossary — Senior Backend Node.js/NestJS

Thuật ngữ được thêm vào khi người học đã dùng ĐÚNG (rule A23). Cập nhật cùng lúc với learning-record.

| Thuật ngữ | Định nghĩa (tiếng Việt) | Bài |
| **event loop** | Vòng lặp vô hạn của Node chia thành nhiều phase (timers, poll, check) — mỗi phase xử lý một loại callback riêng, microtask ưu tiên cao hơn | 04 |
| **non-blocking I/O** | Cơ chế Node không chờ I/O hoàn thành — gửi yêu cầu xuống libuv rồi đi làm việc khác, khi I/O xong thì callback được đưa vào event loop | 04 |
| **libuv** | Thư viện C xử lý I/O bất đồng bộ — dùng thread pool (cho file/DNS) và epoll/kqueue (cho network) | 04 |
| **microtask** | Hàng đợi ưu tiên cao trong event loop — Promise.then, process.nextTick chạy trước timer/check phase | 04 |
| **setImmediate** | Hàm Node đưa callback vào phase check của event loop — chạy sau I/O hiện tại | 04 |
|-----------|--------------------------|-----|
| **tsx** | Trình chạy TypeScript trực tiếp trên Node, không cần bước biên dịch riêng; `tsx watch` tự reload khi sửa file | 00 |
| **rootDir** | Cấu hình tsconfig khai báo thư mục gốc của code nguồn — TS dựa vào đây để tái tạo cấu trúc thư mục trong `outDir` | 00 |
| **outDir** | Cấu hình tsconfig chỉ nơi chứa code biên dịch (thường là `dist/`) | 00 |
| **pg_isready** | Lệnh của PostgreSQL hỏi trực tiếp database "đã sẵn sàng nhận kết nối chưa" — bằng chứng thật, không phải đoán | 00 |
| **docker-compose.yml** | File khai báo các container của dự án dưới dạng mã (infrastructure-as-code) — clone repo là chạy được ngay | 00 |
| **HTTP status code** | Mã 3 chữ số server trả về cho mỗi request, ví dụ `200` = thành công | 00 (sâu hơn ở 01) |
| **HTTP message** | Đơn vị trao đổi giữa client và server: request (request line + headers + body) và response (status line + headers + body) | 01 |
| **HTTP method** | Động từ mô tả hành động client muốn server làm: GET (lấy), POST (tạo), PUT (thay thế), DELETE (xóa) | 01 |
| **Content-Type** | Header báo kiểu dữ liệu của body — quyết định cách client đọc nội dung (vd `application/json`, `text/plain`) | 01 |
| **REST API** | Phong cách thiết kế API dựa trên tài nguyên (resource) + HTTP method — URL có ý nghĩa, dễ đoán, nhất quán | 02 |
| **resource (tài nguyên)** | Đối tượng trung tâm của REST API — mỗi thứ hệ thống quản lý (khóa học, người dùng, đơn hàng) là một resource, có URL riêng và được thao tác bằng HTTP method chuẩn | 02 |
| **JSON** | Định dạng trao đổi dữ liệu chính của REST API, server trả về dạng `application/json`, client đọc và xử lý bằng `JSON.parse`/`JSON.stringify` | 02 |
| **URL routing** | Kỹ thuật phân tích request URL để quyết định xử lý — dùng `new URL(req.url)` + regex để bắt path params như `:id` | 02 |
| **CommonJS (CJS)** | Hệ thống module cũ của Node (2009) dùng `require`/`module.exports`, nạp đồng bộ — vẫn tồn tại song song với ESM vì nhiều thư viện cũ chưa chuyển | 05 |
| **ES Modules (ESM)** | Chuẩn module chính thức của JavaScript (ES6, 2015) dùng `import`/`export`, nạp bất đồng bộ — file `.mjs` hoặc `"type":"module"` kích hoạt | 05 |
| **package.json** | File cấu hình trái tim của dự án npm: khai `type` (module system), scripts, dependencies/devDependencies | 05 |
| **devDependencies** | Gói chỉ cần khi phát triển (typescript, @types/node) — không cần trên server production | 05 |
| **dependencies** | Gói cần để chạy ở production (vd tsx) | 05 |
|**ESM local import đuôi .js** | Trong Node ESM, import file local phải ghi đủ đuôi `.js` (tương ứng `.ts` sau khi biên dịch) — khác bundler, hay gây lỗi khi chuyển ngữ cảnh | 05 |
| **IncomingMessage (req)** | Đối tượng đại diện request trong node:http — extends stream.Readable, chứa method, url, headers; body đọc theo chunk qua sự kiện data/end | 06 |
| **ServerResponse (res)** | Đối tượng đại diện response trong node:http — extends OutgoingMessage (stream ghi), dùng statusCode/setHeader/writeHead/write/end | 06 |
| **createServer(listener)** | Hàm node:http tạo server — listener là shorthand của EventEmitter `request`, chạy mỗi lần có request | 06 |
| **res.end()** | Kết thúc response (bắt buộc gọi, đúng một lần) — quên gọi khiến client treo; gọi 2 lần lỗi write-after-end | 06 |
| **res.write()** | Ghi thêm một phần body (gọi nhiều lần) — dùng cho stream dữ liệu lớn, khác res.end (kết thúc) | 06 |
| **routing table (bảng route)** | Cấu trúc khai báo tập trung `{ method, pattern, handler }` để định tuyến thay vì if/else — tiền đề của router trong Express và controllers trong NestJS | 07 |
| **URLSearchParams** | API web parse chuỗi query `?a=1&b=2` thành cặp key/value — nền tảng của `req.query` trong Express | 07 |
| **validation (kiểm tra dữ liệu đầu vào)** | Bước kiểm tra dữ liệu request trước khi xử lý — thiếu title trả 400 thay vì tạo dữ liệu khuyết | 07 |
| **status 400 Bad Request** | Mã lỗi client gửi request không hợp lệ — server từ chối xử lý, không tạo dữ liệu | 07 |
| **status 404 Not Found** | Mã lỗi tài nguyên không tồn tại — trả về khi GET id không có trong dữ liệu | 07 |
| **status 201 Created** | Mã thành công khi tạo mới resource — kèm body chứa object vừa tạo | 07 |
| **fs/promises** | API đọc/ghi file theo phong cách Promise (dùng await) — một trong 3 phong cách fs: promises, callback, sync | 08 |
| **Buffer** | Kiểu dữ liệu Node chứa byte nhị phân — `readFile` không kèm encoding trả về Buffer thay vì string | 08 |
| **import.meta.url** | URL của chính module đang chạy — kết hợp `fileURLToPath` + `path.join` để định vị file tương đối với code thay vì cwd | 08 |
| **ENOENT** | Mã lỗi "file không tồn tại" (Error NO ENTry) — `fs/promises` reject Promise với lỗi này; luôn try/catch quanh fs bất đồng bộ | 08 |
| **stream** | Cơ chế Node truyền dữ liệu từng phần (chunk) thay vì nạp cả khối — 4 loại: Readable, Writable, Duplex, Transform | 08 |
| **Readable stream** | Nguồn dữ liệu — đọc ra từng chunk; ví dụ `fs.createReadStream`, `req` (IncomingMessage), `process.stdin` | 08 |
| **Writable stream** | Đích dữ liệu — ghi vào; ví dụ `res` (ServerResponse), `fs.createWriteStream`, `process.stdout` | 08 |
| **highWaterMark** | Ngưỡng bộ đệm của stream (mặc định 64KB với createReadStream) — quyết định cỡ mỗi chunk; là threshold, không phải limit | 08 |
| **pipe()** | Nối stream đọc với stream ghi — dữ liệu chảy dần, không nạp hết vào RAM; ví dụ `readStream.pipe(res)` | 08 |
| **process.env** | Object chứa biến môi trường của tiến trình — tách cấu hình khỏi code: cùng một code, nhiều môi trường | 08 |
| **process.argv** | Mảng tham số dòng lệnh — phần tử 0 là đường dẫn node, 1 là file script, còn lại là tham số | 08 |
| **process.exitCode** | Mã thoát để shell biết thành công (0) hay thất bại (≠0) — đặt thay vì gọi `process.exit()` để stdout flush kịp | 08 |
| **EADDRINUSE** | Lỗi "địa chỉ đang được dùng" khi cổng đã bị tiến trình khác chiếm — xử lý: đổi cổng hoặc dừng tiến trình cũ | 08 |
| **`.env`** | File lưu biến môi trường local của dự án — không commit lên git; đây là nơi đặt PORT, secret, URL database | 08 |
| **app.METHOD()** | API Express định nghĩa route: `app.get()`, `app.post()`, `app.put()`, `app.delete()`... — đóng gói bảng route `{ method, pattern, handler }` tự viết tay | 09 |
| **route parameter** | Đoạn URL có tên bắt giá trị, khai báo bằng `:name` trong path — giá trị nằm ở `req.params.name`; thay cho regex + `match[1]` | 09 |
| **req.params** | Object chứa các route parameter đã bắt từ URL — ví dụ `/users/:id` → `req.params.id` | 09 |
| **req.query** | Object chứa query string đã parse — thay cho hàm `parseQuery` tự viết (URLSearchParams) | 09 |
| **express.json()** | Middleware đọc body từ stream rồi parse JSON — sau nó body nằm ở `req.body`; đóng gói hàm `readBody` tự viết | 09 |
| **res.json()** | Phương thức trả JSON: set Content-Type + stringify + kết thúc response — đóng gói hàm `sendJson` tự viết | 09 |
| **middleware** | Hàm `(req, res, next)` làm xong việc rồi gọi `next()` để chuyển request sang bước kế — đường ống cho các bước dùng chung (log, auth, body) áp dụng mọi route | 09 |
| **app.use()** | Đăng ký middleware vào đường ống xử lý mọi request theo thứ tự khai báo — `app.use(express.json())` đặt body vào `req.body` trước khi tới route handler | 10 |
| **req.body** | Object chứa body đã parse JSON (nhờ `express.json()`) — undefined nếu quên middleware; dùng `req.body ?? {}` để phòng undefined | 10 |
| **res.status().json()** | Chuỗi method chainable: set status code rồi gửi JSON — `res.json()` mặc định 200; muốn 400/404/201 phải gọi `.status(...)` trước | 10 |
| **middleware log tự viết** | Middleware `(req, res, next)` do lập trình viên tạo — in log (timestamp + method + url) rồi gọi `next()`; đặt TRƯỚC route để chạy cho mọi request | 11 |
| **next()** | Hàm Express chuyển request sang middleware/handler tiếp theo — bắt buộc gọi nếu middleware không tự kết thúc response, nếu không request bị treo | 11 |
| **error-handling middleware** | Middleware đặc biệt có ĐÚNG 4 tham số `(err, req, res, next)` — Express nhận biết bằng số tham số; bắt lỗi từ handler và trả response (vd JSON 500) | 11 |
| **CORS (Cross-Origin Resource Sharing)** | Cơ chế cho phép trình duyệt gọi API từ domain khác qua header `Access-Control-Allow-Origin` — middleware `cors()` đặt đầu để header phủ mọi response | 11 |
| **Access-Control-Allow-Origin** | Header do server trả để trình duyệt cho phép JS đọc response từ origin khác — `*` nghĩa là cho phép mọi origin (đủ cho dev, production cần giới hạn) | 11 |
| **throw trong route handler** | Ném lỗi đồng bộ từ handler — Express 5 tự chuyển tới error-handling middleware; không có middleware này sẽ trả HTML lỗi mặc định | 11 |
| **pg (node-postgres)** | Thư viện Node chính thức kết nối PostgreSQL — `new pg.Pool()` quản lý pool kết nối dùng chung, tự đọc PG* env vars | 12 |
| **Pool (connection pool)** | "Bể bơi" kết nối database giữ sẵn và dùng chung — tránh mở kết nối TCP mới mỗi query, chuẩn production | 12 |
| **loadEnvFile()** | API Node (từ v20.12/v21.7) nạp file `.env` vào process.env — thay thế dotenv trong dự án Node thuần | 12 |
| **parameterized query** | Truy vấn SQL truyền giá trị qua tham số `$1, $2` thay vì nối chuỗi — database tự escape, chống SQL injection | 12 |
| **SQL injection** | Lỗ hổng bảo mật khi input người dùng được nối thẳng vào SQL — attacker có thể chạy lệnh tùy ý (vd xóa bảng); phòng bằng parameterized query | 12 |
| **SERIAL** | Kiểu cột PostgreSQL tự tăng id — mỗi dòng mới tự nhận số tiếp theo | 12 |
| **PRIMARY KEY** | Khóa chính xác định duy nhất mỗi dòng trong bảng — không trùng, không NULL | 12 |
| **UNIQUE constraint** | Ràng buộc cột không được trùng lặp — vd email mỗi user phải khác nhau | 12 |
| **RETURNING** | Mệnh đề SQL trả về dòng vừa thêm/sửa — dùng để lấy id (SERIAL) và dữ liệu mới ngay sau INSERT/UPDATE | 12 |
| **rowCount** | Số dòng bị ảnh hưởng bởi query (vd DELETE) — dùng để biết có xóa được hay không (0 = không tồn tại) | 12 |
| **error 23505** | Mã lỗi PostgreSQL vi phạm UNIQUE constraint (vd email trùng) — ứng dụng cần bắt và trả 409/400 thay vì 500 | 12 |
| **ERD (Entity-Relationship Diagram)** | Bản vẽ các bảng và quan hệ giữa chúng — đọc trước khi viết SQL để hình dung rõ cấu trúc dữ liệu | 13 |
| **normalization (chuẩn hóa)** | Tách dữ liệu thành nhiều bảng để mỗi dữ liệu lưu đúng một nơi — tránh trùng lặp (redundancy) và dị thường cập nhật (update anomaly) | 13 |
| **quan hệ 1–1 (one-to-one)** | 1 dòng bảng A khớp đúng 1 dòng bảng B — biểu diễn bằng khóa ngoại + UNIQUE | 13 |
| **quan hệ 1–nhiều (one-to-many)** | 1 dòng bảng A có nhiều dòng bảng B — khóa ngoại đặt ở bảng "nhiều" | 13 |
| **quan hệ nhiều–nhiều (many-to-many)** | Nhiều dòng A ↔ nhiều dòng B — cần bảng trung gian (junction table) để phá thành hai quan hệ 1-nhiều | 13 |
| **foreign key (khóa ngoại)** | Constraint ép giá trị cột phải tồn tại trong bảng khác (`REFERENCES`) — database tự chặn insert dữ liệu lỏng lẻo, bảo vệ toàn vẹn dữ liệu | 13 |
| **junction table (bảng trung gian)** | Bảng nối hai bảng trong quan hệ nhiều-nhiều — chứa khóa ngoại trỏ tới cả hai bảng (vd enrollments) | 13 |
| **CHECK constraint** | Ràng buộc giới hạn giá trị cột (vd `price >= 0`) — database tự chặn giá trị không hợp lệ | 13 |
| **UNIQUE tổ hợp** | Unique trên tổ hợp nhiều cột `UNIQUE (a, b)` — chống trùng cặp (vd một user chỉ đăng ký một khóa 1 lần) | 13 |
| **JOIN** | Mệnh đề SQL gộp nhiều bảng theo quan hệ — nối bảng này với bảng kia qua khóa ngoại để trả câu hỏi nghiệp vụ | 13 |
| **hashing (hàm băm)** | Hàm một chiều biến mật khẩu thành chuỗi hash — không suy ngược ra mật khẩu gốc; bcrypt chậm có salt, chống brute-force | 14 |
| **bcrypt** | Thư viện hash mật khẩu phổ biến trong Node — `bcrypt.hash(pw, cost)` tạo hash, `bcrypt.compare(pw, hash)` so sánh | 14 |
| **cost factor** | Tham số độ khó của bcrypt (vd 10) — quyết định thuật toán chậm tới mức nào; càng cao càng an toàn nhưng tốn CPU | 14 |
| **JWT (JSON Web Token)** | Chuẩn token gồm `header.payload.signature` ký bằng secret — server verify được token có bị sửa; stateless, không cần lưu session | 14 |
| **jwt.sign()** | Khởi tạo token: nhận payload (vd { userId }) + secret + expiresIn → ra chuỗi token gửi cho client | 14 |
| **jwt.verify()** | Kiểm tra token: chữ ký đúng + chưa hết hạn thì trả payload, sai secret ném lỗi | 14 |
| **Bearer token** | Cách gửi token trong HTTP header: `Authorization: Bearer <token>` — chuẩn phổ biến cho API auth | 14 |
| **error 23505 → 409** | Bắt mã lỗi UNIQUE của PostgreSQL (email trùng) và trả 409 Conflict thay vì 500 — xử lý lỗi database có chủ đích | 14 |
| **status 401 Unauthorized** | Lỗi chưa xác thực: thiếu token, token sai/hết hạn, hoặc sai email/mật khẩu — trả chung một thông điệp để chống user enumeration | 14 |
| **module augmentation** | Kỹ thuật TS mở rộng type có sẵn của thư viện (vd thêm `Express.Request.userId`) qua file `.d.ts` + `declare global` — không sửa code thư viện | 14 |
