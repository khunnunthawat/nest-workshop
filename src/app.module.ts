import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockModule } from './stock/stock.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.entities.config';
import { AuthModule } from './auth/auth.module';
import { LoggerMiddleware } from './logger.middleware';
import { loggerFn } from './logger.fn.middleware';

@Module({
  imports: [StockModule, AuthModule, TypeOrmModule.forRoot(typeOrmConfig)], // ทำการเรียกใช้โฟรเดอร์ stock ในนั้น
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware, loggerFn).forRoutes('stock'); // ทำการระบุ path ให้มันว่าเราจะทำ MiddlewareConsumer ใน path นี้นะ
  }
}
