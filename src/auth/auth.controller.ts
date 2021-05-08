import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCredentialDto } from './dto/user-credential.ato';

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
  }
}
