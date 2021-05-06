// DTO = data transfer object ไว้เรียกใช้ data ของ object นั้น
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateStockDto {
  @IsNotEmpty() // @IsNotEmpty() คือ ห้ามส่งค่าว่างมานะ ถ้าส่งค่าว่างเมื่อไร error แน่
  @MinLength(10, {
    // here, $constraint1 will be replaced with "10", and $value with actual supplied value
    message: 'Name is too short.',
  })
  name: string;
  @IsNotEmpty()
  price: number;
  @IsNotEmpty()
  stock: number;
}
