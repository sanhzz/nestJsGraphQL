import { InputType, Field, Int } from '@nestjs/graphql';
import { Min, IsOptional, IsString } from 'class-validator';

@InputType()
export class PaginationInput {
  @Field(() => Int)
  @Min(0)
  page: number;

  @Field(() => Int)
  @Min(0)
  size: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  @IsString()
  search?: string;
}

