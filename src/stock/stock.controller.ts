import { StockService } from './stock.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock-dto';
import { ChangeStringCasePipe } from '../pipes/change-string-case.pipe';
import { FileInterceptor } from '@nestjs/platform-express';
// import { Product } from './product.entity';
// import { InjectRepository } from '@nestjs/typeorm';
// import { ProductRepository } from './product.repository';
import { diskStorage } from 'multer';
import * as fsExtra from 'fs-extra';
import { extname } from 'path';

// นิยามว่าหน้านี้จะทำการรับผิดชอบใน path http://localhost:3000/stock
@Controller('stock')
// http Method
export class StockController {
  // constructor(
  //   @InjectRepository(Product) private productRepository: ProductRepository,
  // ) {}
  // InjectRepository ดึง entity มาให้ productRepository

  constructor(private stockService: StockService) {}
  // ทำการเรียก stock.service.ts มาใช้

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
    return this.stockService.getProduct();
    // return this.productRepository.find();
    //คำสั่ง find จะ return ค่าออกมาเป็น Array
    // ถ้าเป็น findOne จะ return ตัวเดียว
  }
  // @Post()
  // addStock(@Body('name') name: string, @Body('price') price: number) {
  //   console.log(`name: ${name}, price: ${price}`);
  // }
  // @Post()
  // @UsePipes(ValidationPipe) // ใช้ในการตรวจสอบว่าข้อมูลที่เข้ามาครบมั้ย ValidationPipe
  // @UsePipes(new ChangeStringCasePipe())
  // addStock(@Body() createStockDto: CreateStockDto) {
  // เรียกใช้ฟังก์ชั่นจาก product.repository.ts
  // ที่ ProductRepository ได้สร้าง createProduct กับ createStockDto ไว้
  // return this.stockService.createProduct(createStockDto);

  // const { name, price, stock } = createStockDto;
  // console.log(`name: ${name}, price: ${price}, stock: ${stock}`);

  // const product = new Product();
  // product.name = name;
  // product.price = price;
  // product.stock = stock;
  // product.save(); // เป็นคำสั่ง insert คล้ายกับใน sql
  // }

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, cb) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
          return cb(null, `${randomName}${extname(file.originalname)}`);
          // cb = callback เพื่อบอกกลับไปว่าเราทำการจัดเก็บชื่อไฟล์สำเร็จแล้ว มันผ่านตอน UseInterceptors file
        },
      }),
    }),
  ) // ทำการระบุ key ให้มันตรงกับ @UploadedFile() *file*
  @UsePipes(ValidationPipe)
  @UsePipes(new ChangeStringCasePipe())
  async addStock(@UploadedFile() file, @Body() createStockDto: CreateStockDto) {
    // console.log(file);
    const product = await this.stockService.createProduct(createStockDto);
    // ต้องให้มันหยุดรอจนเสร็จแล้ววิ่งไปทำข้างล่างต่อ จึงต้องใช้ await
    const fileExtension = extname(file.filename);
    fsExtra.move(file.path, `upload/${product.id}` + fileExtension);
    // product.id ได้มาจากการสร้างชุดใหม่ขึ้นมา
    return product;
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
