// Demo Bài 17 — TypeScript nâng cao: decorators + utility types
// Chạy: npx tsx src/ts17-decorators-demo.ts
// (nằm trong src/ để tsconfig experimentalDecorators có hiệu lực — xem giải thích trong bài)

// ===== PHẦN 1: DECORATORS (kiểu NestJS) =====

// Method decorator @log — bọc method, in args + kết quả mỗi lần gọi
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value
  descriptor.value = function (...args: any[]) {
    console.log(`→ ${propertyKey}(${args.join(', ')})`)
    const result = original.apply(this, args)
    console.log(`← ${propertyKey} = ${result}`)
    return result
  }
}

// Class decorator @Register — đăng ký class vào registry (giống NestJS đăng ký provider)
function Register(name: string) {
  return function (constructor: any) {
    const g = globalThis as any
    g.__registry = g.__registry ?? {}
    g.__registry[name] = constructor
  }
}

@Register('CalcService')
class CalcService {
  @log
  add(a: number, b: number): number {
    return a + b
  }
}

const svc = new CalcService()
console.log('add(2,3) =', svc.add(2, 3))
console.log('registry có CalcService:', Boolean((globalThis as any).__registry.CalcService))

// ===== PHẦN 2: UTILITY TYPES =====

interface Course {
  id: number
  title: string
  price: number
  description: string
  published: boolean
}

type NewCourse = Omit<Course, 'id' | 'published'> // bỏ id + published (server tự sinh)
type CoursePatch = Partial<Course>                 // mọi field optional (cập nhật 1 phần)
type CourseCard = Pick<Course, 'id' | 'title'>     // chỉ lấy 2 field (trả list)
type ReadonlyCourse = Readonly<Course>             // cấm sửa (defensive)

const draft: NewCourse = { title: 'NestJS', price: 100, description: 'học từ gốc' }
const patch: CoursePatch = { price: 50 }
const card: CourseCard = { id: 1, title: 'NestJS' }
const frozen: ReadonlyCourse = { id: 1, title: 'N', price: 1, description: 'd', published: true }
// @ts-expect-error — readonly: không được sửa
frozen.title = 'sửa lỗi compile'
// @ts-expect-error — NewCourse không có id (đã Omit)
const bad: NewCourse = { id: 99, title: 'x', price: 1, description: 'y' }

console.log('OK: decorators + utility types xanh')
