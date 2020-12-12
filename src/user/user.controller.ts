import { BadRequestException, Body, Controller, Get, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CreateUserDTO } from "./user.interface";
import { UserService } from "./user.service";

@Controller('/api/user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() dto: CreateUserDTO) {
    try {
      return await this.userService.create(dto);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(dto.login, 'register.already_used');
      }
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('/profile')
  async getProfile(@Req() request) {
    return request.user;
  }

};
