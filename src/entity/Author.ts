import { Field, ID, ObjectType, Ctx } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";
import { AuthorBook } from "./AuthorBook";
import { MyContext } from "../types/MyContext";
import { Book } from "./Book";

@ObjectType()
@Entity()
export class Author extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @OneToMany(() => AuthorBook, ab => ab.author)
  bookConnection: Promise<AuthorBook[]>;

  @Field(() => [Book])
  async books(@Ctx() { booksLoader }: MyContext): Promise<Book[]> {
    return booksLoader.load(this.id);
  }
}
