import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user-credential.ato';
import { GetUsername } from './get-username.decorator';

@Controller('auth')
export class AuthController {
  constructor(private authenService: AuthService) {}

  @Post('/singup')
  @UsePipes(ValidationPipe)
  signUp(@Body() userCredentialDto: UserCredentialDto) {
    console.log('singUp', userCredentialDto);
    return this.authenService.signUp(userCredentialDto);
  }

  @Post('/singin')
  signIn(@Body() userCredentialDto: UserCredentialDto) {
    console.log('singIn', userCredentialDto);
    return this.authenService.signIn(userCredentialDto);
  }

  // เป็นการปกกัน user การเข้าถึง
  @Get('/test')
  @UseGuards(AuthGuard())
  // ชื่อ route
  // ถ้าเกิดมีการยิงเข้ามาที่ path นี้ จะทำการเช็คว่าข้อมูลเป็นอย่างไรที่จะ return มาจาก AuthJwtStrategy ของ user ในหน้า auth.jwt.strategy.ts
  // GetUsername เป็น map ตัวแปร ตัวนึ่งกับ username ที่อยู่ใน req
  test(@Req() req, @GetUsername() username) {
    console.log(req);
    // return req.user.username;
    return username;
  }
}
