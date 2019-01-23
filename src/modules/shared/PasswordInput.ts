import { Length } from "class-validator";
import { Field, InputType, ClassType } from "type-graphql";

export const PasswordMixin = <T extends ClassType>(BaseClass: T) => {
  @InputType()
  class PasswordInput extends BaseClass {
    @Field()
    @Length(6, 20)
    password: string;
  }
  return PasswordInput;
};
