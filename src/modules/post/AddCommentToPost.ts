import { Arg, Mutation, Resolver, Query } from "type-graphql";
import { Comment } from "../../entity/Comment";
import { Post } from "../../entity/Post";

@Resolver()
export class AddCommentToPostResolver {
  @Mutation(() => Comment)
  async createComment(
    @Arg("content") content: string,
    @Arg("postId") postId: number
  ): Promise<Comment | null> {
    return Comment.create({ content, postId }).save();
  }

  @Query(() => [Comment])
  async comments() {
    return Comment.find();
  }

  @Query(() => [Post])
  async posts() {
    return Post.find();
  }
}
