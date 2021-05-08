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
  getProduct() {
    return this.productRepository.find();
    // ถ้ามีการรอให้้ใช้ await แล้วค่อยส่งกลับไป
  }
  async getProductVyId(id: string) {
    const found = await this.productRepository.findOne(id);
  }
}
