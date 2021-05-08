import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserCredentialDto } from './dto/user-credential.ato';
// import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  signUp(userCredentialDto: UserCredentialDto) {
    return this.userRepository.createUser(userCredentialDto);
    // const { username, password } = UserCredentailDto;
    // const user = new User();
    // user.username = username;
    // user.password = password;
    // await user.save();
    // return user;
  }
}
