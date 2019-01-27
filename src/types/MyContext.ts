import { Request, Response } from "express";
import { createAuthorsLoader } from "../utils/authorsLoader";
import { createBooksLoader } from "../utils/booksLoader";
import { createCommentsLoader } from "../utils/commentsLoader";

export interface MyContext {
  req: Request;
  res: Response;
  authorsLoader: ReturnType<typeof createAuthorsLoader>;
  booksLoader: ReturnType<typeof createBooksLoader>;
  commentsLoader: ReturnType<typeof createCommentsLoader>;
}
