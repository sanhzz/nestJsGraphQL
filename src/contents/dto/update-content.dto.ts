// update-content.dto.ts
// import { InputType, Field, ID, PartialType } from '@nestjs/graphql';
// import { CreateContentDto } from './create-content.dto';

// @InputType()
// export class UpdateContentDto extends PartialType(CreateContentDto) {
//   // @Field(() => ID)
//   // id: string;
// }


// select field for update or  br lueak field for update  kue kup comment to therng 
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString, IsBoolean } from 'class-validator';

@InputType()
export class UpdateContentDto {
  // @Field()
  // @IsString()
  // id: string; // UUID

  @Field()
  @IsString()
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  body?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  summary?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;

  // @Field()
  // userId: string; // UUID
}
