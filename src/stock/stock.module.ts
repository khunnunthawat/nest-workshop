import { Module } from '@nestjs/common';
import { StockController } from './stock.controller';

// Meta Data
// Module นี้ประกอบไปด้วยอะไรบ้างแล้วก็อ้างถึงตัว StockController
@Module({
  controllers: [StockController],
})
export class StockModule {}
