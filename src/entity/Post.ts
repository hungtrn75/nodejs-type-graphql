import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  OneToMany
} from "typeorm";
import { ObjectType, Field, ID, Ctx } from "type-graphql";
import { Comment } from "./Comment";
import { MyContext } from "../types/MyContext";

@ObjectType()
@Entity()
export class Post extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  title: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  body: string;

  @OneToMany(() => Comment, comment => comment.post)
  commentsC: Promise<Comment[]>;

  @Field(() => [Comment])
  async comments(@Ctx() { commentsLoader }: MyContext): Promise<Comment[]> {
    return commentsLoader.load(this.id);
  }
}
