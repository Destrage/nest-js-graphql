import { Field, Int, ObjectType, registerEnumType } from "@nestjs/graphql";
import { User } from "../../users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export enum TaskStatus {
    PENDING = "pending",
    INPROGRESS = "in-progress",
    COMPLETED = "completed",
    DELETED = "deleted",
}
@Entity()
@ObjectType()
export class Task {
    constructor() {
        registerEnumType(TaskStatus, { name: 'TaskStatus' })
    }
    @PrimaryGeneratedColumn()
    @Field(type => Int)
    id: number;

    @Column()
    @Field()
    name: string;

    @Column()
    @Field()
    project: string;

    @Column()
    @Field()
    date: string;

    @Column({ type: "int", default: 0 })
    @Field(type => Int)
    minutes: number;

    @Column({ type: "int", default: 0 })
    @Field(type => Int)
    hours: number;

    @ManyToOne(() => User, user => user.tasks)
    @Field(type => User, { nullable: true })
    user: User;

    @Column({
        type: "enum",
        enum: TaskStatus,
        default: TaskStatus.PENDING,
    })
    @Field(type => TaskStatus)
    status: string;

}