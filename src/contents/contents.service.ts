import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { Content } from './entities/content.entity';
import { User } from '../users/entities/user.entity';

import { NotFoundException, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class ContentsService {

  constructor(
    @InjectRepository(Content)
    private readonly contentRepo: Repository<Content>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) { }



  // CREATE
  async createContent(createContentDto: CreateContentDto): Promise<Content> {
    try {
      const resp = this.contentRepo.create(createContentDto);
      return await this.contentRepo.save(resp);

    } catch (error) {
      throw new InternalServerErrorException(`Failed to create content: ${error.message}`);
    }
  }


  // FIND ALL
  async findAllContent(): Promise<Content[]> {
    try {
      const resp = await this.contentRepo.find({
        relations: ['user'],
        order: { id: 'DESC' },
      });
      return resp;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to fetch contents: ${error.message}`);
    }
  }


  // FIND ONE
  async findOneContent(id: string): Promise<Content> {
    try {
      const resp = await this.contentRepo.findOne({
        relations: ['user'],
        where: { id }
      });
      return resp;
    } catch (error) {
      throw new NotFoundException(`Content with ID "${id}" not found`);
    };
  }


  // UPDATE
  async updateContent(id: string, updateContentDto: UpdateContentDto): Promise<Content> {
    try {
      const resp = await this.contentRepo.preload({ id, ...updateContentDto });

      if (!resp) {
        throw new NotFoundException(`Content with ID ${id} not found`);
      }
      return await this.contentRepo.save(resp);
    } catch (error) {
      throw new InternalServerErrorException(`Failed to update content: ${error.message}`);
    }
  }


  // DELETE
  async removeContent(id: string): Promise<String> {
    try {
      await this.contentRepo.delete(id);
      return `Content with ID ${id} has been deleted successfully`;
    } catch (error) {
      throw new InternalServerErrorException(`Failed to delete content: ${error.message}`);
    }
  }
}
