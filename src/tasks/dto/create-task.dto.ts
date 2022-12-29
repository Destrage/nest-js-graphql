import { Field, InputType, Int } from "@nestjs/graphql";
import { IsAlphanumeric, IsString } from 'class-validator';

@InputType()
export class CreateTaskInput {
    @IsString()
    @Field()
    name: string;

    @IsString()
    @Field()
    project: string;

    @Field({ nullable: true })
    date: string;

    @Field(type => Int)
    user: any;

    @Field({ nullable: true })
    status: string;
}