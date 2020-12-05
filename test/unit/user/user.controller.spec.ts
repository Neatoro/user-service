import { BadRequestException } from '@nestjs/common';
import { UserController } from 'src/user/user.controller';
import { CreateUserDTO } from 'src/user/user.interface';
import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';

describe('UserController', () => {

  let controller: UserController;
  let service: UserService;

  beforeEach(async () => {
    service = new UserService(
      new Repository<User>()
    );
    controller = new UserController(service);
  });

  describe('register', () => {

    it('should create user', async () => {
      const stubCreateUser: CreateUserDTO = {
        login: 'test@test.com',
        password: 'test'
      };

      const serviceSpy = jest.spyOn(service, 'create');
      await controller.register(stubCreateUser);
      expect(serviceSpy).toHaveBeenCalledWith(stubCreateUser);
    });

    it('should fail when user already exists', async () => {
      const stubCreateUser: CreateUserDTO = {
        login: 'test@test.com',
        password: 'test'
      };

      jest.spyOn(service, 'create').mockImplementation(() => {
        throw { code: 'ER_DUP_ENTRY' };
      });

      try {
        await controller.register(stubCreateUser);
      } catch (e) {
        expect(e.getStatus()).toBe(400);
      }
    });

  });

});
