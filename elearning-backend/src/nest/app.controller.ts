import { Controller, Get } from '@nestjs/common'
import { CoursesService } from './courses.service.js'

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
}
