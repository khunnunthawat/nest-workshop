import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCredentialDto } from './dto/user-credential.ato';
import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userCredentialDto: UserCredentialDto) {
    const { username, password } = userCredentialDto;
    const salt = bcrypt.genSaltSync(); // ทำการซ้อน password

    const user = new User();
    user.username = username;
    user.salt = salt;
    user.password = await this.hashPassword(password, salt); // ทำการไปเรียกใช้ function ข้างล่าง

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      if (error.code === '23505') {
        throw new ConflictException(
          'Error, because this username already exist!',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
    return user;
  }

  async verifyUserPassword(userCredentialDto: UserCredentialDto) {
    const { username, password } = userCredentialDto;
    const user = await this.findOne({ username }); // ชื่อ key กับ value เหมือนกันก็ได้เลยใช้แบบนี้ เมื่อก่อนใช้ username: username
    // ทำการสร้าง function verifyPassword ใน entity
    if (user && (await user.verifyPassword(password))) {
      return user.username;
    } else {
      return null;
    }
  }

  async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }

  // async createUser(createUserCredentialDto: UserCredentialDto): Promise<User> {
  //   const { username, password } = createUserCredentialDto;
  //   const user = new User();
  //   user.username = username;
  //   user.password = password;
  //   await user.save();
  //   return user;
  // }
}
