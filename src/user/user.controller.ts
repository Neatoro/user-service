import { BadRequestException, Body, Controller, Post } from "@nestjs/common";
import { CreateUserDTO } from "./user.interface";
import { UserService } from "./user.service";

@Controller('/api/user')
export class UserController {

  constructor(private readonly userService: UserService) {}

  @Post()
  async register(@Body() dto: CreateUserDTO) {
    try {
      await this.userService.create(dto);
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') {
        throw new BadRequestException(dto.login, 'register.already_used');
      }
    }
  }

};
