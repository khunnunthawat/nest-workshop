###
  https://www.npmjs.com/~nestjscore
  nest g module stock --no-spec
  nest g controller stock --no-spec
  npm i class-transformer
  https://www.npmjs.com/package/class-validator#validation-errors
  npm i class-validator
  https://www.npmjs.com/package/change-case
  npm i change-case
  https://www.npmjs.com/package/pg
  https://www.npmjs.com/package/typeorm
  npm install typeorm --save
  npm install pg --save
  npm i @nestjs/typeorm
  npm install rxjs @nestjs/typeorm pg
  nest g service stock --no-spec
###

###
// Setup TypeOrm configuration
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ifal',
  database: 'workshop',
  entities: [__dirname + '/../**/*.entities.{js,ts}'],
  synchronize: true,
}
###

###
  FileUpload
  https://docs.nestjs.com/techniques/file-upload#file-upload
  @UseInterceptors(FileInterceptor('file'))
  npm i multer
  npm i fs-extra
  npm i path
  UpDate : https://github.com/typeorm/typeorm/blob/master/docs/entities.md#column-types-for-postgres
###

// Upload Image
uploadImage = async (files, doc) => {
  if (files.image != null) {
    var fileExtention = files.image.name.split(".")[1];
    doc.image = `${doc.id}.${fileExtention}`; // ถอดนามสกุลมา ต่อกับ id อีกที
    var newpath =
      path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;
    // console.log(newpath);
    if (fs.exists(newpath)) {
      // ถ้ามีอยู่แล้วต้องทำการลบรูปเก่าก่อนที่จะเพิ่มเข้าไปใหม่
      await fs.remove(newpath);
    }
    await fs.moveSync(files.image.path, newpath); // files.image.path ที่ตั้งต้นของ path แล้วทำการ newpath ไปยัง path ใหม่่นั้นเอง
    // moveSync คำสั่งย้ายรูปไปยัง path ใหม่ path.resolve(__dirname + "/uploaded/images/") + "/" + doc.image;

    // Update database
    let result = product.update(
      { image: doc.image },
      { where: { id: doc.id } }
    ); // ต้องมีเงื่อนไขโดยใช้ where id
    return result;
  }
};