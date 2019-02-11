import { Arg, Int, Mutation, Query, Resolver } from "type-graphql";
import { Author } from "../../entity/Author";
import { AuthorBook } from "../../entity/AuthorBook";
import { Book } from "../../entity/Book";

@Resolver()
export class AuthorBookResolver {
  @Mutation(() => Book)
  async createBook(@Arg("name") name: string) {
    return Book.create({ name }).save();
  }

  @Mutation(() => Author)
  async createAuthor(@Arg("name") name: string) {
    return Author.create({ name }).save();
  }

  @Mutation(() => Boolean)
  async addAuthorBook(
    @Arg("authorId", () => Int) authorId: number,
    @Arg("bookId", () => Int) bookId: number
  ) {
    await AuthorBook.create({ authorId, bookId }).save();
    return true;
  }

  @Mutation(() => Boolean)
  async deleteBook(@Arg("bookId", () => Int) bookId: number) {
    // await AuthorBook.delete({ bookId });
    await Book.delete({ id: bookId });
    return true;
  }

  @Query(() => [Book])
  async books() {
    const books = await Book.find();
    console.log(books);
    return books;
  }

  @Query(() => [Author])
  async authors() {
    return Author.find();
  }
}
