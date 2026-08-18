import { Body, Controller, Get, Post } from '@nestjs/common'
import { CoursesService } from './courses.service.js'
import { CreateCourseDto } from './create-course.dto.js'

@Controller()
export class AppController {
  // KHÔNG gọi new CoursesService() — Nest tự inject instance đúng
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  getRoot(): { message: string } {
    return { message: 'E-Learning NestJS đã chạy' }
  }

  @Get('courses')
  getCourses() {
    return this.coursesService.findAll()
  }

  @Post('courses')
  createCourse(@Body() dto: CreateCourseDto) {
    return dto // tạm trả lại để thấy dữ liệu đã được validate + whitelist
  }
}
