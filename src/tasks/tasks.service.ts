import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateTaskInput } from './dto/create-task.dto';
import { Task } from './entities/tasks.entity';

@Injectable()
export class TasksService {

    constructor(
        @InjectRepository(Task) private tasksRepository: Repository<Task>,
        @InjectRepository(User) private userRepository: Repository<User>
    ) { }

    async create(createTaskInput: CreateTaskInput): Promise<Task> {
        createTaskInput.date = new Date().toISOString();

        const user = await this.userRepository.findOneByOrFail({ id: createTaskInput.user })

        createTaskInput.user = user;
        const task = this.tasksRepository.create(createTaskInput);
        return this.tasksRepository.save(task);
    }

    async findAll(): Promise<Task[]> {
        return this.tasksRepository.find({ relations: { user: true } });
    }

    async findById(id: number): Promise<Task> {
        return this.tasksRepository.findOneByOrFail({ id });
    }

    async removeByUserId(userId: number) {
        return await this.tasksRepository
            .createQueryBuilder('tasks')
            .delete()
            .from(Task)
            .where("userId = :userId", { userId })
            .execute()
    }
}
