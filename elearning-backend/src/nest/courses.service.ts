import { Injectable } from '@nestjs/common'

export interface Course {
  id: number
  title: string
  price: number
}

const courses: Course[] = [
  { id: 1, title: 'NestJS cơ bản', price: 500000 },
  { id: 2, title: 'Design Pattern cho Backend', price: 800000 },
]

// @Injectable() đánh dấu class là provider mà container có thể quản lý
@Injectable()
export class CoursesService {
  findAll(): Course[] {
    return courses
  }
}
