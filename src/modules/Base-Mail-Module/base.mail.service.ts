import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class BaseMailService {
  constructor(private readonly mailerService: MailerService) {}
  
  public MailSender(email:string){
    this
      .mailerService
      .sendMail({
        to: 'sanjino56@gmail.com', // list of receivers
        from: 'noreply@nestjs.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        text: 'welcome', // plaintext body
        html: '<b>welcome</b>', // HTML body content
      })
      .then((success) => {
        return success
      })
      .catch((err) => {
        return err
      });
  }

}