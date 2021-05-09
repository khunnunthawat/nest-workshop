import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { loggerFn } from './logger.fn.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // การ Add middleware แบบ global
  // ถ้าเราทำการ add ตรงนี้แล้ว ตรง app.module ไม่ต้องใส่แล้ว loggerFn
  // app.use(loggerFn);
  await app.listen(3000);
}
bootstrap();
