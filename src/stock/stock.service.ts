import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateStockDto } from './dto/create-stock-dto';
import { Product } from './product.entity';
import { ProductRepository } from './product.repository';
import * as fsExtra from 'fs-extra'; // เป็น lir ใช้ในการลบไฟล์ทิ้ง

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Product) private productRepository: ProductRepository,
  ) {}
  createProduct(createStockDto: CreateStockDto) {
    return this.productRepository.createProduct(createStockDto);
  }
  getProduct(keyword: string) {
    if (keyword) {
      const qurey = this.productRepository.createQueryBuilder('product'); // ทำการเรียกใช้ methoad createQueryBuilder แล้วตามด้วยชื่อ Table ใน database
      qurey.andWhere('product.name LIKE :keyword', { keyword: `%${keyword}%` }); // filter หา keyword โดยการใช้ qurey.andWhere ในการหาคำ
      return qurey.getMany(); // .getMany() เป็นการเรียกใช้ข้อมูลที่ป้อนก่อนหน้านี้
    } else {
      return this.productRepository.find();
    }
    // return this.productRepository.find();
    // ถ้ามีการรอให้้ใช้ await แล้วค่อยส่งกลับไป
  }
  async getProductById(id: number) {
    const found = await this.productRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Product ${id} is not found!`);
    }
    return found;
  }
  async deleteProduct(id: number) {
    // found id ที่เจอ
    // found ที่บรรจุก็คือชื่อรูปภาพ
    const found = await this.getProductById(id);
    const { image } = found;
    await fsExtra.remove(`upload/${image}`); // ลบรูปก่อนแล้วค่อยไปต่อที่ลบ id
    return await this.productRepository.delete(id);
  }
  async updateProduct(id: number, createStockDto: CreateStockDto) {
    const product = await this.getProductById(id);
    const { name, price, stock } = createStockDto;
    product.name = name;
    product.price = price;
    product.stock = stock;
    await product.save(); // เป็นคำสั่ง insert คล้ายกับใน sql
    return product;
  }
}
