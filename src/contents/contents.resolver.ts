import {
  Args,
  Mutation,
  Query,
  Resolver,
  Int
} from '@nestjs/graphql';
import { Content } from './entities/content.entity';
import { ContentsService } from './contents.service';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';



@Resolver(() => Content)

export class ContentsResolver {

  constructor(private readonly contentsService: ContentsService) { }

  // CREATE
  @Mutation(() => Content)
  create(@Args('createContentDto') createContentDto: CreateContentDto) {
    return this.contentsService.createContent(createContentDto);
  }



  // FIND ALL
  @Query(() => [Content])
  findAllContent() {
    return this.contentsService.findAllContent();
  }



  // FIND ONE
  @Query(() => Content)
  findOneContent(@Args('id') id: string) {
    return this.contentsService.findOneContent(id);
  }



  @Mutation(() => Content)
  updateContent(
    @Args('id') id: string,
    @Args('update') update: UpdateContentDto,
  ) {
    return this.contentsService.updateContent(id, update);
  }



  // DELETE
  @Mutation(() => String)
  removeContent(@Args('id') id: string) {
    return this.contentsService.removeContent(id);
  }
}
