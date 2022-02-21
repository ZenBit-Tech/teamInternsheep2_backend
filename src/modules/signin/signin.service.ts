import { Injectable } from '@nestjs/common';
import { SigninFormDataDto } from "../../dto/signin.user.dto";
import { User } from '../users/users.entity';

@Injectable()
export class SigninService {
  async authenticationByEmail(formData: SigninFormDataDto){
    try {
      const user = await User.findOne({where: {
          email: formData.email,
        }
      })
      if (user.password === formData.password) {
        delete user.password;
        return user;
      }else{
        throw new Error("Wrong password or email");
      }
    } catch (error) {
      return error
    }
  }
}