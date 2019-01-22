import { Resolver, Mutation, Arg } from "type-graphql";
import { User } from "../../entity/User";
import { sendEmail } from "./utils/sendEmail";
import { createUserUrl } from "./utils/createUserUrl";
import { FORGOT_PASSWORD } from "./constants/UserAction";

@Resolver()
export class ForgotPasswordResolver {
  @Mutation(() => Boolean)
  async forgotPassword(@Arg("email") email: string): Promise<boolean> {
    const user = await User.findOne({ where: { email } });
    if (!user) return true;
    await sendEmail(
      email,
      await createUserUrl(user.id, FORGOT_PASSWORD),
      FORGOT_PASSWORD
    );
    return true;
  }
}
