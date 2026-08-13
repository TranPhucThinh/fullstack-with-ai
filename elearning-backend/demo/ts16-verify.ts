// Verify Bài 16 — TypeScript cơ bản: type, interface, generics
// Chạy: npx tsx demo/ts16-verify.ts

// 1. Type alias — đặt tên cho kiểu
type UserId = number
type Role = 'admin' | 'teacher' | 'student' // union type

// 2. Interface — mô tả hình dạng object
interface User {
  id: UserId
  email: string
  name: string
  role: Role
}

// 3. Generics — hàm dùng chung cho nhiều kiểu
function first<T>(arr: T[]): T | undefined {
  return arr[0]
}

// 4. Áp dụng
const users: User[] = [
  { id: 1, email: 'a@ex.com', name: 'An', role: 'student' },
  { id: 2, email: 'b@ex.com', name: 'Binh', role: 'teacher' },
]

const firstUser = first(users) // T = User
const firstNum = first([10, 20, 30]) // T = number

console.log('firstUser:', firstUser?.name)
console.log('firstNum:', firstNum)

// 5. Type check — nếu sai type sẽ lỗi compile
// @ts-expect-error — role 'superadmin' không hợp lệ
const bad: User = { id: 3, email: 'c@ex.com', name: 'C', role: 'superadmin' }

console.log('OK: TS type/interface/generics xanh')