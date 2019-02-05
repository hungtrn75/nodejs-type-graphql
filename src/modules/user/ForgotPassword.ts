import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../entity/User";
import { FORGOT_PASSWORD } from "./constants/UserAction";
import { createUserUrl } from "./utils/createUserUrl";
import { sendEmail } from "./utils/sendEmail";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) return false;
    await sendEmail(
      email,
      await createUserUrl(user.id, FORGOT_PASSWORD),
      FORGOT_PASSWORD
    );
    return true;
  }
}
