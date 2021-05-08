import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// map ข้อมูลกับตัว DB
// repo แทน database แทนผังของข้อมูล
// 1 table แทนด้วย 1 repo 1 entity
@Entity() // ไว้แสดงว่ามี column อะไรบ้าง
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn() // เหมือน ai ใน sql
  id: number;

  @Column() // ทำการสร้างใน table
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;
}
