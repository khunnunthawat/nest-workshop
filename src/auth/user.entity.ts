import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
// import * as bcrypt from 'bcrypt';

// map ข้อมูลกับตัว DB
// repo แทน database แทนผังของข้อมูล
// 1 table แทนด้วย 1 repo 1 entity
@Entity()
@Unique(['username'])
// ไว้แสดงว่ามี column อะไรบ้าง
// ในกรณีอยากเปลี่ยนชื่อ table ให้ใช้ @Entity({name: 'Stock'}) เรียกว่า Optional set name
// แล้วใน database จะทำการเพิ่ม table ที่เราระบุชื่อไป
export class User extends BaseEntity {
  @PrimaryGeneratedColumn() // เหมือน ai ใน sql
  id: number;

  @Column() // ทำการสร้างใน table
  username: string;

  @Column()
  password: string;

  // @UpdateDateColumn()
  // updated: Date;
}
