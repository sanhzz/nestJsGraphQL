import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Profile } from './entities/profile.entity';
import { UpdateProfileDto } from './dto/update-profile.dto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  users() {
    return this.usersService.findAll();
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  user(@Args('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  me(@Context() context) {
    return this.usersService.findOne(context.req.user.userId);
  }

  @Mutation(() => Profile)
  @UseGuards(JwtAuthGuard)
  updateProfile(
    @Args('updateProfileDto') updateProfileDto: UpdateProfileDto,
    @Context() context,
  ) {
    return this.usersService.updateProfile(context.req.user.userId, updateProfileDto);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async removeUser(@Args('id') id: string) {
    await this.usersService.remove(id);
    return true;
  }
}