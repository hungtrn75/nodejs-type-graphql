import { Resolver, Ctx, Query } from "type-graphql";
import { User } from "../../entity/User";
import { MyContext } from "src/types/MyContext";

@Resolver()
export class MeResolvers {
  @Query(() => User, { nullable: true })
  async me(@Ctx() ctx: MyContext): Promise<User | null | undefined> {
    const user = await User.findOne(ctx.req.session!.userId);

    if (!ctx.req.session!.userId) {
      return null;
    }

    return user;
  }
}
