import { Resolver, Mutation, Arg } from "type-graphql";
import { redis } from "../../redis";
import bcrypt from "bcryptjs";
import { User } from "../../entity/User";
import { FORGOT_PASSWORD as type } from "./constants/UserAction";
import { ChangePasswordInput } from "./changePassword/changePasswordInput";

@Resolver()
export class ChangePasswordResolver {
  @Mutation(() => User, { nullable: true })
  async changePassword(@Arg("data")
  {
    token,
    password
  }: ChangePasswordInput): Promise<User | null> {
    const userId = await redis.get(type + token);

    if (!userId) {
      return null;
    }

    const user = await User.findOne(userId);

    if (!user) return null;

    user.password = await bcrypt.hash(password, 12);

    await user.save();
    return user;
  }
}
