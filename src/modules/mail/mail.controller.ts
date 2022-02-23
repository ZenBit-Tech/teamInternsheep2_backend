import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from "./mail.service";

@Controller()
export class MailController {
    constructor(
        private mailService: MailService
    ) {}

    @Post('mail/send-reset-password-mail')
        send(@Body() data){
            return this.mailService.sendResetPasswordMail(data.email)
        }
}
