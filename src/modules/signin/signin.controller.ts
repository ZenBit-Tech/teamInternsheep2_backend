import { Controller, Body, Post, Get, Req, UseGuards, Request, Patch} from '@nestjs/common';
import { SigninFormDataDto } from "../dto/signin.user.dto";
import { SigninService } from './signin.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class SigninController {
  constructor(private readonly SigninService: SigninService) {}

  //Google authorization controllers start {
  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  googleAuthRedirect(@Req() req) {
    return this.SigninService.googleLogin(req)
  }

  //Google authorization controllers end }

  //Controller to find user by email
  @Post('auth/signin')
    create(@Body() formData:SigninFormDataDto){
      return this.SigninService.signInByEmail(formData);
  }

  //Controller to update user password
  @Patch('update-password')
  update(@Body() formData) {
      return this.SigninService.updateUserPassword(formData);
}
}
