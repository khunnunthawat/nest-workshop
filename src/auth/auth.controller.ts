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
  signUp(@Body() userCredential: UserCredentialDto) {
    console.log('singUp', userCredential);
    return this.authenService.signUp(userCredential);
  }

  @Post('/singin')
  signIn(@Body() userCredential: UserCredentialDto) {
    console.log('singIn', userCredential);
  }
}
