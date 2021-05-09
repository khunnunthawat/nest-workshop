import { StockService } from './stock.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
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
import { LoggerInterceptor } from 'src/logger.interceptor';

// นิยามว่าหน้านี้จะทำการรับผิดชอบใน path http://localhost:3000/stock
@Controller('stock')
@UseInterceptors(LoggerInterceptor)
// http Method
export class StockController {
  // constructor(
  //   @InjectRepository(Product) private productRepository: ProductRepository,
  // ) {}
  // InjectRepository ดึง entity มาให้ productRepository

  constructor(private stockService: StockService) {}
  // ทำการเรียก stock.service.ts มาใช้

  @Get()
  getStock(@Query('keyword') keyword: string) {
    // throw new NotFoundException();
    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     error: 'This is a custom message',
    //   },
    //   HttpStatus.FORBIDDEN,
    // );
    // @Req() req เรียกใช้ในการเช็ค Middleware
    // console.log('Added by Middleware : ' + req.timestamp);
    return this.stockService.getProduct(keyword);
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
    // ต้องให้มันหยุดรอจนเสร็จแล้ววิ่งไปทำข้างล่างต่อ จึงต้องใช้ await
    const product = await this.stockService.createProduct(createStockDto);
    // const fileExtension = extname(file.filename);
    const imageFile = product.id + extname(file.filename);
    fsExtra.move(file.path, `upload/${imageFile}`);
    product.image = imageFile;
    await product.save();
    // product.id ได้มาจากการสร้างชุดใหม่ขึ้นมา
    return product;
  }

  @Get('/:id')
  getStockById(@Param('id') id: number) {
    return this.stockService.getProductById(id);
  }

  @Delete('/:id')
  deleteStockById(@Param('id') id: number) {
    return this.stockService.deleteProduct(id);
  }

  @Put('/:id')
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
        },
      }),
    }),
  )
  async UpdateStockById(
    @UploadedFile() file,
    @Param('id') id: number,
    @Body() createStockDto: CreateStockDto,
  ) {
    const product = await this.stockService.updateProduct(id, createStockDto);
    if (file) {
      fsExtra.remove(`upload/${product.image}`);
      const imageFile = id + extname(file.filename);
      fsExtra.move(file.path, `upload/${imageFile}`); // ลบไฟล์เก่าแล้วทำการใส่ไฟล์ใหม่เข้าไป
      product.image = imageFile; // แล้วมันจะทำการเอาชื่อไฟล์ใหม่ใส่เข้าไปใน product.image ก่อนแล้ว save
      await product.save();
    }
    return product;
  }

  // UpdateStockById(
  //   @Param('id') id: number,
  //   @Body() createStockDto: CreateStockDto,
  // ) {
  //   // const { name, price, stock } = createStockDto;
  //   // console.log(`${name}, ${price}, ${stock}`);
  //   return this.stockService.updateProduct(id, createStockDto);
  //   // return `Update id is ${id}, ${name}, ${price}, ${stock}`;
  // }
}
