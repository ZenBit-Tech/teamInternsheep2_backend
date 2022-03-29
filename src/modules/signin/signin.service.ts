import {Injectable, UnauthorizedException} from '@nestjs/common';
import { SigninFormDto } from '../dto/signin.user.dto';
import { User } from '../users/users.entity';
import {getConnection, Repository} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import {InjectRepository} from "@nestjs/typeorm";


require('dotenv').config();

@Injectable()
export class SigninService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async signInByEmail(dto: SigninFormDto) {
    const user = await this.validateUser(dto);
    if (user.status === 401) return user;

    return this.generateToken(user);
  }

  async validateUser(dto: SigninFormDto) {
    try {
      const user = await User.findOne({
        where: {
          email: dto.email,
        },
      });
      if (!user)
        throw new UnauthorizedException({
          message: 'Incorrect email ',
        });
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

  private async generateToken(user: User) {
    const payload = {
      email: user.email,
      phoneNumber: user.phoneNumber,
      id: user.id,
      userRole: user.userRole,
      firstName: user.firstName,
      lastName: user.lastName,
    };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async googleLogin(req): Promise<User | string> {
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
      return user;
    }
    const option: object = {
      firstName: req.user.firstName,
      lastName: req.user.lastName ? req.user.lastName : '',
      email: req.user.email,
      password: '',
      phoneNumber: null,
      userRole: null,
    };
    // @ts-ignore
    user = await User.save(option);
    delete user.password;
    return user;
  }

  async updateUserPassword(formData): Promise<string> {
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
  }

}
