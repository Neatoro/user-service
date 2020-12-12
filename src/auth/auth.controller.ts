import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('/auth')
export class AuthController {

  constructor(
    private readonly authService: AuthService
  ) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Req() request) {
    const serviceObject = await this.authService.login(request.user);
    return serviceObject;
  }

  @Get('/public')
  getPublicKey() {
    return process.env.JWT_PUBLIC_KEY;
  }

};
