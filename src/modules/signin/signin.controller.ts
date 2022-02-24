import { Controller, Body, Post, Get, Req, UseGuards, Patch} from '@nestjs/common';
import { SigninFormDto } from "../dto/signin.user.dto";
import { SigninService } from './signin.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class SigninController {
  constructor(private readonly SigninService: SigninService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.SigninService.googleLogin(req)
  }

  @Post('auth/signin')
    authorize(@Body() formData:SigninFormDto){
      return this.SigninService.signInByEmail(formData);
  }

  @Patch('update-password')
    update(@Body() formData) {
      return this.SigninService.updateUserPassword(formData);
}
}
