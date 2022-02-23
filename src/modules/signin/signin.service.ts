import { Injectable } from '@nestjs/common';
import { SigninFormDto } from "../dto/signin.user.dto";
import { User } from '../users/users.entity';
import {getConnection} from 'typeorm';
import * as bcrypt from 'bcrypt'
require('dotenv').config()

@Injectable()
export class SigninService {

  async signInByEmail(formData: SigninFormDto){
      const user = await User.findOne({where: {
          email: formData.email,
        }
      })
       const isMatch = await bcrypt.compare( formData.password ,user.password)
        if (user && isMatch) {
          delete user.password;
          return user;
        }else{
          return "Incorrect email or password"
        }
      }
  

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

    async updateUserPassword(formData) {
      const hash = await bcrypt.hash(formData.password, Number(process.env.SALT_OR_ROUNDS))
      if (hash) {
        try {
          await getConnection()
              .createQueryBuilder()
              .update(User)
              .set({password: hash})
              .where({email: formData.email})
              .execute(); 
          return "success"  
        } catch (error) {
            return error
        }
      }else{
        return "error"
      }
  }
}
