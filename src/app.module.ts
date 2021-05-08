import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockModule } from './stock/stock.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.entities.config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [StockModule, AuthModule, TypeOrmModule.forRoot(typeOrmConfig)], // ทำการเรียกใช้โฟรเดอร์ stock ในนั้น
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
