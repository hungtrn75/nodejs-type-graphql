import { buildSchema } from "type-graphql";
import { ChangePasswordResolver } from "../modules/user/ChangePassword";
import { ConfirmUserResolver } from "../modules/user/ConfirmUser";
import { ForgotPasswordResolver } from "../modules/user/ForgotPassword";
import { LoginResolver } from "../modules/user/Login";
import { LogoutResolver } from "../modules/user/Logout";
import { MeResolver } from "../modules/user/Me";
import { RegisterResolver } from "../modules/user/Register";
import { CreateUserResolver } from "../modules/user/CreateUser";
import { CreatePostResolver } from "../modules/post/CreatePost";
import { ProfilePictureResolver } from "../modules/user/ProfileUpload";
import { AuthorBookResolver } from "../modules/author-book/AuthorBookResolver";
import { AddCommentToPostResolver } from "../modules/post/AddCommentToPost";

export const createSchema = () =>
  buildSchema({
    resolvers: [
      ChangePasswordResolver,
      ConfirmUserResolver,
      ForgotPasswordResolver,
      LoginResolver,
      LogoutResolver,
      MeResolver,
      RegisterResolver,
      CreateUserResolver,
      CreatePostResolver,
      ProfilePictureResolver,
      AuthorBookResolver,
      AddCommentToPostResolver
    ],
    authChecker: ({ context: { req } }) => {
      return !!req.session.userId;
    }
  });
