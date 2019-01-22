import { Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class PasswordInput {
  @Field()
  @Length(6, 20)
  password: string;
}
