import { User } from 'src/user/user.model';
import { UserService } from 'src/user/user.service';
import { DeleteResult, Repository } from 'typeorm';
import * as utils from 'src/utils';

describe('UserService', () => {

  let userService: UserService;
  let userRepository: Repository<User>;

  beforeEach(() => {
    userRepository = new Repository<User>();
    userService = new UserService(userRepository);
  });

  describe('findByLogin', () => {

    it('should return user with login', async () => {
      const userStub = new User();
      const findSpy = jest.spyOn(userRepository, 'find').mockReturnValue(Promise.resolve([userStub]));

      const result: User = await userService.findByLogin('test@test.com');
      expect(findSpy).toHaveBeenCalledWith(expect.objectContaining({
        select: ['login', 'id', 'password', 'salt'],
        where: {
          login: 'test@test.com'
        }
      }));
      expect(result).toBe(userStub);
    });

    it('should return undefined if user does not exists', async () => {
      const findSpy = jest.spyOn(userRepository, 'find').mockReturnValue(Promise.resolve([]));
      const result: User = await userService.findByLogin('test@test.com');

      expect(findSpy).toHaveBeenCalledWith(expect.objectContaining({
        select: ['login', 'id', 'password', 'salt'],
        where: {
          login: 'test@test.com'
        }
      }));
      expect(result).toBeUndefined();
    });

  });

  describe('findById', () => {

    it('should return user with login', async () => {
      const userStub = new User();
      const findSpy = jest.spyOn(userRepository, 'find').mockReturnValue(Promise.resolve([userStub]));

      const result: User = await userService.findById('some-id');
      expect(findSpy).toHaveBeenCalledWith(expect.objectContaining({
        select: ['login', 'id', 'password', 'salt'],
        where: {
          id: 'some-id'
        }
      }));
      expect(result).toBe(userStub);
    });

    it('should return undefined if user does not exists', async () => {
      const findSpy = jest.spyOn(userRepository, 'find').mockReturnValue(Promise.resolve([]));
      const result: User = await userService.findById('some-id');

      expect(findSpy).toHaveBeenCalledWith(expect.objectContaining({
        select: ['login', 'id', 'password', 'salt'],
        where: {
          id: 'some-id'
        }
      }));
      expect(result).toBeUndefined();
    });

  });

  describe('create', () => {

    it('should create a user with salt', async () => {
      jest.spyOn(utils, 'sha512').mockImplementation((text) => `sha512(${text})`);
      jest.spyOn(utils, 'generateSalt').mockReturnValue('some-salt');

      const spy = jest.spyOn(userRepository, 'save').mockReturnValue(Promise.resolve(undefined));

      await userService.create({
        login: 'test@test.com',
        password: 'test'
      });

      expect(spy).toHaveBeenCalledWith({
        login: 'test@test.com',
        password: 'sha512(sha512(test)some-salt)',
        salt: 'some-salt'
      });
    });

  });

  describe('delete', () => {

    it('should delete user by login', async () => {
      const spy = jest.spyOn(userRepository, 'delete').mockReturnValue(Promise.resolve(new DeleteResult()));
      await userService.delete('test@test.com');
      expect(spy).toHaveBeenCalledWith({ login: 'test@test.com' });
    });

  });

});
