import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateSalt, hashPassword } from '../utils';
import { CreateUserDTO } from './user.interface';
import { User } from './user.model';

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ) {}

  async findByLogin(login: string): Promise<User> {
    const users = await this.userRepository.find({
      select: ['login', 'id', 'password', 'salt'],
      where: {
        login
      }
    });
    return users.length === 0 ? undefined : users[0];
  }

  async findById(id: string) {
    const users = await this.userRepository.find({
      select: ['login', 'id', 'password', 'salt'],
      where: {
        id
      }
    });
    return users.length === 0 ? undefined : users[0];
  }

  async create(dto: CreateUserDTO) {
    const user: User = this.userRepository.create(dto);
    return await this.userRepository.save(user);
  }

  delete(login: string) {
    return this.userRepository.delete({ login });
  }

};
