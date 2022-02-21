import { Controller, Body, Post } from '@nestjs/common';
import { SigninFormDataDto } from "../../dto/signin.user.dto";
import { Observable } from 'rxjs';
import { SigninService } from './signin.service';

@Controller('auth/signin')
export class SigninController {
  constructor(private readonly SigninService: SigninService) {}
  @Post()
    create(@Body() formData:SigninFormDataDto){
      return this.SigninService.authenticationByEmail(formData);
    }
}
