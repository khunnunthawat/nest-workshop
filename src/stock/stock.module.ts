import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';

// Meta Data
// Module นี้ประกอบไปด้วยอะไรบ้างแล้วก็อ้างถึงตัว StockController
@Module({
  imports: [TypeOrmModule.forFeature([ProductRepository])], //เป็นการ import table
  controllers: [StockController],
})
export class StockModule {}
