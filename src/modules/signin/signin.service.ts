import { Injectable } from '@nestjs/common';
import { SigninFormDataDto } from "../dto/signin.user.dto";
import { User } from '../users/users.entity';
import {getConnection} from 'typeorm';

@Injectable()
export class SigninService {

  //Finds user by email and returns user info from database
  async signInByEmail(formData: SigninFormDataDto){
      const user = await User.findOne({where: {
          email: formData.email,
        }
      })
      if (user && user.password === formData.password) {
        delete user.password;
        return user;
      }else{
        return "Incorrect email or password"
      }
  }

  //Finds user by google authorization and returns user info from database
  async googleLogin(req) {
      if (!req.user) {
        return 'No user from google';
      }else{
        const user = await User.findOne({where: {
          email: req.user.email,
        }
      })
      if (user) {
        delete user.password;
        return user;
      }else{
        return "Incorrect user account"
      }
      }
    }

    //Updates user password
    async updateUserPassword(formData) {
      try {
          await getConnection()
              .createQueryBuilder()
              .update(User)
              .set({password: formData.password})
              .where({email: formData.email})
              .execute(); 
          return "success"  
      } catch (error) {
          return error
      }
  }
}
