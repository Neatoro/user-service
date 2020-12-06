import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.model';
import { JwtService } from '@nestjs/jwt';
import { hashPassword } from '../utils';

@Injectable()
export class AuthService {

  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  async validateUser(login: string, password: string) {
    const user = await this.userService.findByLogin(login);

    if (!user) {
      return null;
    }

    const saltedPassword = hashPassword(password, user.salt);

    if (user.password === saltedPassword) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }

  async login(user: User) {
    const payload = { login: user.login, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload)
    };
  }

};
