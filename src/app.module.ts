import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [StockModule], // ทำการเรียกใช้โฟรเดอร์ stock ในนั้น
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
