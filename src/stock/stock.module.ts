import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { StockService } from './stock.service';
import { AuthModule } from 'src/auth/auth.module';

// Meta Data
// Module นี้ประกอบไปด้วยอะไรบ้างแล้วก็อ้างถึงตัว StockController
@Module({
  // ใน Module เราจะใช้ table กี่ตัว ก็แทนด้วยตัว ProductRepository ของนั้นๆไป
  // เป็นการ import table
  // ถ้ามีหลาย table ก็ต้องสร้างหลาย Repository
  imports: [TypeOrmModule.forFeature([ProductRepository]), AuthModule],
  controllers: [StockController],
  providers: [StockService],
})
export class StockModule {}
