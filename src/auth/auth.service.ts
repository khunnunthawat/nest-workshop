import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserCredentialDto } from './dto/user-credential.ato';
import { JwtService } from '@nestjs/jwt';
// import { User } from './user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
    private jwtService: JwtService,
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

  async signIn(userCredentialDto: UserCredentialDto) {
    // return this.userRepository.verifyUserPassword(userCredentialDto);
    const username = await this.userRepository.verifyUserPassword(
      userCredentialDto,
    );
    // เงื่อนไขถ้าไม่มีอยู่จริง
    if (!username) {
      throw new UnauthorizedException('Invalid username or password');
    }
    const payload = { username };
    const token = await this.jwtService.sign(payload);
    return { token }; // มันจะทำการส่ง token แทนที่จะส่ง username นั้นเอง
  }
}
