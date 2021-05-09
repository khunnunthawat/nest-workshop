import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UserRepository } from './user.repository';
import { UnauthorizedException } from '@nestjs/common';

export class AuthJwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'daytech', // key นี้ต้องเป็น key เดียวกับหน้า module ที่กำหนดไว้ secret: 'daytech'
    });
  }

  // ข้อมูลที่ส่งกลับมาจะเป็นข้อมูลที่decodeเรียบร้อยแล้วเป็นข้อมูลแบบ JSON
  async validate(payload) {
    const { username } = payload;
    const user = await this.userRepository.findOne({ username });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
    // การ return ตรงนี้จะเป็นการเพิ่ม filedๆนึ่งเข้าไปทำการ req
    // เราสามารถทำการดึงข้อมูลของ payload มาใช้งานได้เลย
  }
}
