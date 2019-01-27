import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  PrimaryColumn
} from "typeorm";
import { Post } from "./Post";

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  postId: number;

  @Field()
  @Column()
  content: string;

  @Field(() => Post)
  @ManyToOne(() => Post, post => post.commentsC, { primary: true })
  @JoinColumn({ name: "postId" })
  post: Promise<Post>;

  //   @Field(() => Post)
  //   async post(): Promise<Post | undefined> {
  //     return Post.findOne({ id: this.postId });
  //   }
}
