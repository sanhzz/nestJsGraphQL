import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToOne, OneToMany } from 'typeorm';
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Profile } from './profile.entity';
import { Content } from '../../contents/entities/content.entity';

@ObjectType()
@Entity('users')
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field()
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Field()
  @Column({ default: true })
  isActive: boolean;

  @Field()
  @Column({ default: false })
  isEmailVerified: boolean;

  @Field(() => Profile, { nullable: true })
  @OneToOne(() => Profile, profile => profile.user)
  profile?: Profile;

  // @Field(() => [Content], { nullable: true })
  // @OneToMany(() => Content, (content) => content.userId)
  // contents: Content[];
  @Field(() => [Content])
  @OneToMany(() => Content, content => content.user)
  contents: Content[];

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}