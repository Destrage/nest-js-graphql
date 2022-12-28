import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from 'src/tasks/entities/tasks.entity';
import { TasksService } from 'src/tasks/tasks.service';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly taskService: TasksService
  ) { }
  async create(createUserInput: CreateUserInput): Promise<User> {
    const user = await this.userRepository.create(createUserInput);
    return this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: { tasks: true } });
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOneByOrFail({ id });
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({ id });
    user.first_name = updateUserInput.first_name;
    user.middle_name = updateUserInput.middle_name;
    user.last_name = updateUserInput.last_name;
    return this.userRepository.save(user);
  }

  async remove(id: number) {
    await this.taskService.removeByUserId(id);
    return this.userRepository.delete({ id });
  }
}
