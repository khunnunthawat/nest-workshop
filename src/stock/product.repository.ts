import { EntityRepository, Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateStockDto } from './dto/create-stock-dto';

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {
  async createProduct(createStockDto: CreateStockDto): Promise<Product> {
    const { name, price, stock } = createStockDto;
    console.log(`name: ${name}, price: ${price}, stock: ${stock}`);

    const product = new Product();
    product.name = name;
    product.price = price;
    product.stock = stock;
    await product.save();
    // เป็นคำสั่ง insert คล้ายกับใน sql
    // การทำงานแบบ Promise<Product> มันจะเป็น async
    // จึงต้องเรียกใช้ await ขึ้นมาเพื่อหยุดรอ
    // เพราะให้มั่นใจว่ามันทำงานเสร็จสิ้นแล้วในการ save()

    return product;
    // แล้วค่อยทำการรีเทริน์ค่า product ออกไป
  }
}
