import { Controller, Post, Body } from '@nestjs/common';
import { MailService } from "./mail.service";

@Controller()
export class MailController {
    constructor(
        private mailService: MailService
    ) {}
    //Controller to send a mail
    @Post('mail/send-reset-password-mail')
        create(@Body() data){
            return this.mailService.sendPasswordMail(data.email)
        }
}
