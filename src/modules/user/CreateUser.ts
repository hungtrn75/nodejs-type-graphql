import createResolver from "../../utils/createResolver";
import { User } from "../../entity/User";
import { RegisterInput } from "./register/RegisterInput";

export const CreateUserResolver = createResolver(
  "User",
  User,
  RegisterInput,
  User
);
