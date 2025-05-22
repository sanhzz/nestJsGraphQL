import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponse } from './entities/auth-response.entity';
import { UsersService } from '../users/users.service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Mutation(() => AuthResponse)
  async login(@Args('loginDto') loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Mutation(() => AuthResponse)
  async register(@Args('registerDto') registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Query(() => AuthResponse)
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Context() context) {
    const user = await this.usersService.findOne(context.req.user.userId);
    return this.authService.refreshToken(user);
  }

  @Query(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async validateToken() {
    return true;
  }
}