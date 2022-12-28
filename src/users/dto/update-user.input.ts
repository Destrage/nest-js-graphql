import { CreateUserInput } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { IsAlpha, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @IsNumber()
  @Field(() => Int, { description: 'ID of the user to be updated' })
  id: number;

  @IsAlpha()
  @Field({ description: 'Name to be changed', nullable: true })
  first_name: string;

  @IsAlpha()
  @Field({ description: 'Name to be changed', nullable: true })
  middle_name: string;

  @IsAlpha()
  @Field({ description: 'Name to be changed', nullable: true })
  last_name: string;
}
