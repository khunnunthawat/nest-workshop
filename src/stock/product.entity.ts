import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// map ข้อมูลกับตัว DB
// 1 table แทนด้วย 1 repo 1 entity
// entity กำหนดว่าจะมี column อะไรบ้าง
@Entity()
export class Product extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column()
  stock: number;
}
