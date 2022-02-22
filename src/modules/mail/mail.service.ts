import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

//Mail service
@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  
  async sendPasswordMail(email:string){
    return this.mailerService.sendMail({
      //Response letter template
      to: `${email}`,
      from: "<noreply@construct.net>",
      subject: 'Welcome to Holidays!',
      text: 'Use this password',
      html: `<div>
              <h1>Hello ${email}!</h1>
              <p>A request has been received to change the password for your account.</p>
              <a href="https://www.google.com" target="_blank">
                <button>Reset password</button>
              </a>
            </div>`,
    });
  }
  }