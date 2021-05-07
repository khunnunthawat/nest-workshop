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
import { ChangeStringCasePipe } from '../pipes/change-string-case.pipe';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';

// นิยามว่าหน้านี้จะทำการรับผิดชอบใน path http://localhost:3000/stock
@Controller('stock')
// http Method
export class StockController {
  constructor(
    @InjectRepository(Product) private productRepository: ProductRepository,
  ) {}
  // InjectRepository ดึง entity มาให้ productRepository
  @Get()
  getStock() {
    // throw new NotFoundException();
    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     error: 'This is a custom message',
    //   },
    //   HttpStatus.FORBIDDEN,
    // );
    // return [1, 2, 3];
    return this.productRepository.find(); //คำสั่ง find จะ return ค่าออกมาเป็น Array
    // ถ้าเป็น findOne จะ return ตัวเดียว
  }
  // @Post()
  // addStock(@Body('name') name: string, @Body('price') price: number) {
  //   console.log(`name: ${name}, price: ${price}`);
  // }
  @Post()
  @UsePipes(ValidationPipe) // ใช้ในการตรวจสอบว่าข้อมูลที่เข้ามาครบมั้ย ValidationPipe
  @UsePipes(new ChangeStringCasePipe())
  addStock(@Body() createStockDto: CreateStockDto) {
    const { name, price, stock } = createStockDto;
    console.log(`name: ${name}, price: ${price}, stock: ${stock}`);
    const product = new Product();
    product.name = name;
    product.price = price;
    product.stock = stock;
    product.save(); // เป็นคำสั่ง insert คล้ายกับใน sql
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
