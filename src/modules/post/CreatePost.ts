import createResolver from "../../utils/createResolver";
import { Post } from "../../entity/Post";
import { InputType, Field } from "type-graphql";

@InputType()
class ProductInput {
  @Field()
  name: string;
}

export const CreatePostResolver = createResolver(
  "Post",
  Post,
  ProductInput,
  Post
);
