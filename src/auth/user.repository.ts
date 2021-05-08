import { EntityRepository, Repository } from 'typeorm';
import { User } from './user.entity';
import { UserCredentialDto } from './dto/user-credential.ato';
// import * as bcrypt from 'bcrypt';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userCredentialDto: UserCredentialDto) {
    const { username, password } = userCredentialDto;

    const user = new User();
    user.username = username;
    user.password = password;

    try {
      await user.save();
    } catch (error) {
      console.log(error);
      if (error.code === '23502') {
        throw new ConflictException(
          'Error, because this username already exist!',
        );
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
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
