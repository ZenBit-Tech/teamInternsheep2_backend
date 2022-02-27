import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/users.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendResetPasswordMail(email:string, request){
    try {
      const user = await User.findOne({where: {
        email: email,
      }
    })
    if (user) {

      request.session.passwordReset = {
        sessionName:"reset-user-password",
        email:email,
        expires:new Date(Date.now() + 600000),
        maxAge:600000  
      }

      this.mailerService.sendMail({
        to: `${email}`,
        from: process.env.MAIL_DEFAULT_FROM,
        subject: 'Hello!',
        text: 'Use this password',
        html: `<div>
                <h1>Hello ${email}!</h1>
                <p>A request has been received to change the password for your account.</p>
                <a href="https://www.google.com" target="_blank">
                  <button>Reset password</button>
                </a>
              </div>`,
      })
      return "Mail successfully sent."
    } else {
      throw "Email not registered."
    }
    } catch (error) {
      return error
    }
  }
  }