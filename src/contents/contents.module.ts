import { Module } from '@nestjs/common';
import { ContentsService } from './contents.service';;
import { ContentsResolver } from './contents.resolver';
import { Content } from './entities/content.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Content, User])],
  providers: [ContentsService, ContentsResolver],
})
export class ContentsModule {}
