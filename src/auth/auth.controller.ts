import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user-credential.ato';

@Controller('auth')
export class AuthController {
  constructor(private authenService: AuthService) {}

  @Post('/singup')
  signUp(@Body() userCredentialDto: UserCredentialDto) {
    console.log('singUp', userCredentialDto);
  }

  @Post('/singin')
  signIn(@Body() userCredentialDto: UserCredentialDto) {
    console.log('singIn', userCredentialDto);
  }
}
