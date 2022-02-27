import { Injectable } from '@nestjs/common';
import { SigninFormDto } from "../dto/signin.user.dto";
import { User } from '../users/users.entity';
import {getConnection} from 'typeorm';
import * as bcrypt from 'bcrypt'
require('dotenv').config()

@Injectable()
export class SigninService {
  async signInByEmail(formData: SigninFormDto):Promise<User | string>{
      try {
        const user = await User.findOne({where: {
          email: formData.email,
        }
      })
      if (!user) {
        throw "Incorrect email or password"
      }
        const isMatch = await bcrypt.compare( formData.password ,user.password)
        if (user && isMatch) {
          delete user.password;
          return user;
        }else{
          throw "Incorrect email or password"
        }
      } catch (error) {
        return error
      }

      }
  

  async googleLogin(req):Promise<User | string> {
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

    async updateUserPassword(formData):Promise<string> {
      const hash = await bcrypt.hash(formData.password, Number(process.env.SALT_OR_ROUNDS))
      if (hash) {
        try {
          await getConnection()
              .createQueryBuilder()
              .update(User)
              .set({password: hash})
              .where({email: formData.email})
              .execute(); 
        } catch (error) {
            return error
        }
        return "Password has been updated."
      }else{
        return "An error occurred."
      }
  }
}