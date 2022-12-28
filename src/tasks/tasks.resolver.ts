import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTaskInput } from './dto/create-task.dto';
import { Task } from './entities/tasks.entity';
import { TasksService } from './tasks.service';

@Resolver(of => Task)
export class TasksResolver {
    constructor(private taskService: TasksService) { };

    @Mutation(returns => Task)
    createTask(@Args('createTaskInput') createTaskInput: CreateTaskInput): Promise<Task> {
        return this.taskService.create(createTaskInput);
    }

    @Query(returns => [Task])
    tasks(): Promise<Task[]> {
        return this.taskService.findAll();
    }

    @Query(returns => Task)
    taskById(@Args('id', { type: () => Int }) id: number): Promise<Task> {
        return this.taskService.findById(id);
    }
}
