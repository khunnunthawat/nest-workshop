import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStockDto } from './dto/create-stock-dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Product) private productRepository: ProductRepository,
  ) {}
  createProduct(createStockDto: CreateStockDto) {
    return this.productRepository.createProduct(createStockDto);
  }
  async getProduct() {
    return await this.productRepository.find();
    // ให้ทำการรอก่อน await แล้วค่อยส่งกลับไป
  }
}
