export interface Course {
  id: number
  title: string
  price: number
}

// Dữ liệu khóa học tạm — chưa có database, bài 12 sẽ thay bằng PostgreSQL
export const courses: Course[] = [
  { id: 1, title: 'NestJS cơ bản', price: 500000 },
  { id: 2, title: 'Design Pattern cho Backend', price: 800000 },
]

export function createCourseId(): number {
  return courses.length > 0
    ? Math.max(...courses.map((c) => c.id)) + 1
    : 1
}