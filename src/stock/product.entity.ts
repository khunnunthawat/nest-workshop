import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// map ข้อมูลกับตัว DB
// repo แทน database แทนผังของข้อมูล
// 1 table แทนด้วย 1 repo 1 entity
@Entity()
// ไว้แสดงว่ามี column อะไรบ้าง
// ในกรณีอยากเปลี่ยนชื่อ table ให้ใช้ @Entity({name: 'Stock'}) เรียกว่า Optional set name
// แล้วใน database จะทำการเพิ่ม table ที่เราระบุชื่อไป
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
