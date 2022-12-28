import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsNumber, IsOptional } from 'class-validator';
import { Task } from '../../tasks/entities/tasks.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {

  @PrimaryGeneratedColumn()
  @Field(() => Int, { description: 'Example field (placeholder)' })
  id: number;

  @Column()
  @Field()
  first_name: string;

  @Column({ default: null, nullable: true })
  @Field({ nullable: true })
  middle_name: string;

  @Column()
  @Field()
  last_name: string;

  @Column()
  @Field()
  email: string

  @OneToMany(() => Task, task => task.user, { cascade: ["insert", "update", "remove"] })
  @Field(type => [Task], { nullable: true })
  tasks?: Task[];
}
