import DataLoader from "dataloader";
import { In } from "typeorm";
import { Book } from "../entity/Book";
import { AuthorBook } from "../entity/AuthorBook";

const batchBooks = async (authorIds: number[]) => {
  const bookAuthors = await AuthorBook.find({
    join: {
      alias: "authorBook",
      innerJoinAndSelect: {
        author: "authorBook.book"
      }
    },
    where: {
      authorId: In(authorIds)
    }
  });

  const authorIdToBooks: { [key: number]: Book[] } = {};

  /*
  {
    authorId: 1,
    bookId: 1,
    __author__: { id: 1, name: 'author1' }
  }
  */
  console.log(bookAuthors);
  bookAuthors.forEach(ab => {
    console.log(ab.authorId);
    if (ab.authorId in authorIdToBooks) {
      authorIdToBooks[ab.authorId].push((ab as any).__book__);
    } else {
      authorIdToBooks[ab.authorId] = [(ab as any).__book__];
    }
  });

  console.log(authorIdToBooks);

  const result = authorIds.map(authorId =>
    authorIdToBooks[authorId] ? authorIdToBooks[authorId] : []
  );

  return result;
};

export const createBooksLoader = () => new DataLoader(batchBooks);
