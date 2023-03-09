import { Request, Response } from "express";
import { checkUserExist } from "./../database/user";
import { checkAuthorExist } from "./../database/author";
import {
  getBooks,
  checkBookExist,
  CreateBook,
  updateBook,
  removeBook,
} from "../database/books";
export async function findBooks(req: Request, res: Response) {
  try {
    const books = await getBooks();
    res.status(200).json({ message: "All books", books });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function createBook(req: Request, res: Response) {
  try {
    const { userID } = req.params;
    const user = await checkUserExist(+userID);
    if (!user) {
      return res.status(500).json({ message: "You must to login!" });
    }
    const { page, description, title, authorID } = req.body;
    const author = await checkAuthorExist(+authorID);
    if (!author) {
      return res
        .status(404)
        .json({ message: "Please check your author. And try again later!" });
    }
    const createdBook = await CreateBook(
      page,
      description,
      title,
      author.id,
      user.id
    );
    res.status(201).json({ message: "Created succesfully", book: createdBook });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function editBook(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await checkUserExist(+id);
    if (!user) {
      return res.status(404).json({ message: "You must to login please!" });
    }
    const { bookID, page, description, title, authorID } = req.body;
    const book = await checkBookExist(bookID);
    if (!book) {
      return res.status(404).json({ message: "Your book is not exist!" });
    }
    if (user.id !== book.userID) {
      return res
        .status(409)
        .json({ message: "You can't to edit someone's book!" });
    }
    const author = await checkAuthorExist(+authorID);
    if (!author) {
      return res.status(404).json({
        message: "Your author is not exist please check and try again!",
      });
    }
    const updatedBook = await updateBook(
      book.id,
      page,
      description,
      title,
      author.id
    );
    res.status(200).json({
      message: "Updated succesfully!",
      book: updatedBook,
    });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}

export async function deleteBook(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const user = await checkUserExist(+id);
    if (!user) {
      return res.status(404).json({ message: "You must to login!" });
    }
    const bookID = req.headers.authorization;
    const book = await checkBookExist(+bookID!);
    if (!book) {
      return res.status(404).json({ message: "Book is not exist!" });
    }
    if (book.userID !== user.id) {
      return res
        .status(409)
        .json({ message: "You can not deleted someone's book!" });
    }
    const deletedBook = await removeBook(book.id);
    res.status(200).json({ message: "Deleted succesfully", book: deletedBook });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).json({ message: "Internal error" });
  }
}
