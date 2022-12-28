import { InputType, Int, Field, } from '@nestjs/graphql';
import { IsAlpha, IsEmail, IsNumber, IsOptional } from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsAlpha()
  @Field({ description: 'First Name of the user' })
  first_name: string;

  @IsOptional()
  @IsAlpha()
  @Field({ description: 'Middle Name of the user' })
  middle_name: string;

  @IsAlpha()
  @Field({ description: 'Last Name of the user' })
  last_name: string;

  @IsEmail()
  @Field({ description: 'Unique Email of the user' })
  email: string
}
