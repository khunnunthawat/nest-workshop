import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock-dto';

// นิยามว่าหน้านี้จะทำการรับผิดชอบใน path http://localhost:3000/stock
@Controller('stock')
// http Method
export class StockController {
  @Get()
  getStock() {
    return [1, 2, 3];
  }
  // @Post()
  // addStock(@Body('name') name: string, @Body('price') price: number) {
  //   console.log(`name: ${name}, price: ${price}`);
  // }
  @UsePipes(ValidationPipe) // ใช้ในการตรวจสอบว่าข้อมูลที่เข้ามาครบมั้ย ValidationPipe
  @Post()
  addStock(@Body() createStockDto: CreateStockDto) {
    const { name, price, stock } = createStockDto;
    console.log(`name: ${name}, price: ${price}, stock: ${stock}`);
  }
  @Get('/:id')
  getStockById(@Param('id') id: number) {
    return `Get id is ${id}`;
  }
  @Delete('/:id')
  deleteStockById(@Param('id') id: number) {
    return `Delete id is ${id}`;
  }
  @Put('/:id')
  UpdateStockById(
    @Param('id') id: number,
    @Body() createStockDto: CreateStockDto,
  ) {
    const { name, price, stock } = createStockDto;
    console.log(`${name}, ${price}, ${stock}`);
    return `Update id is ${id}, ${name}, ${price}, ${stock}`;
  }
}
