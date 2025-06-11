import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Content } from '../entities/content.entity';

@ObjectType()
export class PaginatedContent {
  @Field(() => [Content])
  row: Content[];

  @Field(() => Int)
  count: number;
}
