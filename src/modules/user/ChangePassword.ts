import bcrypt from "bcryptjs";
import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { redis } from "../../redis";
import { ChangePasswordInput } from "./changePassword/changePasswordInput";
import { FORGOT_PASSWORD as type } from "./constants/UserAction";

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
  @Mutation(() => Boolean)
  async validateToken(@Arg("token") token: string): Promise<Boolean> {
    const userId = await redis.get(type + token);

    if (!userId) {
      return false;
    }

    return true;
  }
}
