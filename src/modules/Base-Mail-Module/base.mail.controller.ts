import { Controller, Post, Body } from '@nestjs/common';
import { BaseMailService } from "./base.mail.service";

@Controller('mail')
export class BaseMailController {
    constructor(
        private baseMailService: BaseMailService
    ) {}
    @Post('send-reset-password-mail')
        create(@Body() email:string){
            return this.baseMailService.MailSender(email)
        }
}
