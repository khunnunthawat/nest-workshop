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