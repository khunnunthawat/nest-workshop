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
    // payload ให้ใช้ข้อมูลเท่าที่จำเป็นจริงๆไม่งั้น server อาจจะทำงานหนักได้
    const payload = { username }; // เป็นการสร้าง token และไม่ควรใส่ข้อมูลที่เป็นความลับเข้าไปด้วย
    const token = await this.jwtService.sign(payload); // token ดูได้แต่ไม่สามารถเปลี่ยนแปลงข้อมูลได้
    return { token }; // มันจะทำการส่ง token แทนที่จะส่ง username นั้นเอง
  }
}

// https://jwt.io/  เช็ค token
