import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDTO {

  @IsNotEmpty({
    message: 'login.empty'
  })
  login: string;

  @IsNotEmpty({
    message: 'password.empty'
  })
  password: string;
};
