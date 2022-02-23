import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  
  async sendResetPasswordMail(email:string){
    return this.mailerService.sendMail({
      to: `${email}`,
      from: process.env.MAIL_DEFAULT_FROM,
      subject: 'Welcome!',
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