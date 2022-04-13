import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninFormDto } from '../../dto/signin.user.dto';
import { User } from '../../users/users.entity';
import { getConnection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { signinEntity } from './signin.entity';
import {getSystemErrorName} from "util";

require('dotenv').config();

@Injectable()
export class SigninService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signInByEmail(dto: SigninFormDto): Promise<signinEntity | string> {
    try {
      const user = await this.validateUser(dto);
      const result = { message: '' , status: null};
      // that find error in user
      for (const [key, value] of Object.entries(user)) {
        if (key === 'message') result.message = value;
        if (key === 'status' && value === 401) result.status = value;
      }

      if (result.status === 401) return result.message;

      return {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        token: await this.generateToken(user),
      };
    } catch (e) {
      return e;
    }
  }

  async validateUser(dto: SigninFormDto): Promise<User> {
    try {
      const user = await User.findOne({
        where: {
          email: dto.email,
        },
      });
      if (!user) {
        throw new UnauthorizedException({
          message: 'Incorrect email ',
        });
      }
      const isMatch = await bcrypt.compare(dto.password, user.password);
      if (!isMatch)
        throw new UnauthorizedException({
          message: 'Incorrect password ',
        });
      if (user && isMatch) {
        return user;
      }
    } catch (error) {
      return error;
    }
  }

  private async generateToken(user: User): Promise<string> {
    try {
      const payload = {
        email: user.email,
        phoneNumber: user.phoneNumber,
        id: user.id,
        userRole: user.userRole,
        firstName: user.firstName,
        lastName: user.lastName,
      };
      return this.jwtService.sign(payload);
    } catch (e) {
      return e;
    }
  }

  async googleLogin(req): Promise<signinEntity | string> {
    try {
      if (!req.user) {
        return 'No user from google';
      }
      let user = await User.findOne({
        where: {
          email: req.user.email,
        },
      });
      if (user) {
        delete user.password;
        return {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          token: await this.generateToken(user),
        };
      }
      const option: object = {
        firstName: req.user.firstName,
        lastName: req.user.lastName || '',
        email: req.user.email,
        password: '',
        phoneNumber: null,
        userRole: null,
      };
      // @ts-ignore
      user = await User.save(option);
      delete user.password;
      console.log(user);
      return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        token: await this.generateToken(user),
      };
    } catch (e) {
      return e;
    }
  }

  async updateUserPassword(formData): Promise<string> {
    try {
      const hash = await bcrypt.hash(
        formData.password,
        Number(process.env.SALT_OR_ROUNDS),
      );
      if (hash) {
        try {
          await getConnection()
            .createQueryBuilder()
            .update(User)
            .set({ password: hash })
            .where({ email: formData.email })
            .execute();
        } catch (error) {
          return error;
        }
        return 'Password has been updated.';
      }
      return 'An error occurred.';
    } catch (e) {
      return e;
    }
  }
}
