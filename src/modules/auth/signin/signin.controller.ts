require('isomorphic-fetch');
import {
  Controller,
  Body,
  Post,
  Get,
  Req,
  UseGuards,
  Patch,
  Res,
} from '@nestjs/common';
import { SigninFormDto } from '../../dto/signin.user.dto';
import { SigninService } from './signin.service';
import { AuthGuard } from '@nestjs/passport';
import { ISignIn } from './signin.interface';

@Controller()
export class SigninController {
  constructor(private readonly SigninService: SigninService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req) {}

  @Get('google/redirect')
  @UseGuards(AuthGuard('google'))
  async googleAuthRedirect(@Req() req, @Res() res): Promise<ISignIn | string> {
    try {
      const user = await this.SigninService.googleLogin(req);
      if (user) {
        res.redirect(`${String(process.env.CLIENT_URL)}/google/successful`);
        return user;
      }
    } catch (e) {
      return e;
    }
  }

  @Post('auth/signin')
  authorize(@Body() formData: SigninFormDto): Promise<ISignIn | string> {
    return this.SigninService.signInByEmail(formData);
  }

  @Patch('update-password')
  update(
    @Body() formData: { email: string; password: string },
  ): Promise<string> {
    return this.SigninService.updateUserPassword(formData);
  }
}
