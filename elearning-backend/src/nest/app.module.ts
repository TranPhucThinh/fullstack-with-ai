import { Module } from '@nestjs/common'
import { AppController } from './app.controller.js'
import { CoursesService } from './courses.service.js'

@Module({
  controllers: [AppController],
  providers: [CoursesService], // provider token = class CoursesService
})
export class AppModule {}
