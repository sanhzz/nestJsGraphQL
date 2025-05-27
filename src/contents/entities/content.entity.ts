
// content.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ObjectType, Field, ID } from "@nestjs/graphql";

import { User } from '../../users/entities/user.entity';


@ObjectType()           // For GraphQL
@Entity('Contents')     // For TypeORM
export class Content {
    @Field(() => ID)
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    title: string;

    @Field()
    @Column({ type: 'text', nullable: true })
    body: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    summary?: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    isPublished?: boolean;


    @Field(() => User, { nullable: true })
    @ManyToOne(() => User, (user) => user.contents)
    @JoinColumn({ name: 'userId' })
    user: User;


    @Field()
    @Column()
    userId: string; // UUID

    @Field()
    @CreateDateColumn()
    createdAt: Date;

    @Field()
    @UpdateDateColumn()
    updatedAt: Date;
}
