import 'reflect-metadata'
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module.js'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // Global pipe: validate mọi body bằng class-validator trước khi tới controller
  app.useGlobalPipes(new ValidationPipe({ whitelist: true })) // chống mass-assignment
  await app.listen(3000)
  console.log('NestJS: http://localhost:3000')
}

bootstrap().catch((error: unknown) => {
  console.error(error)
  process.exitCode = 1
})
