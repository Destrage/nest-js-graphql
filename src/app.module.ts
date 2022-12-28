import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { ConfigModule } from '@nestjs/config';
import { initilizeGraphQL } from './core/graphql';
import { initilizeDB } from './core/db';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    initilizeGraphQL(),
    initilizeDB(),
    TasksModule,
    UsersModule,
  ],
})

export class AppModule { }
