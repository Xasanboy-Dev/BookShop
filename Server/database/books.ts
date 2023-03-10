import { PrismaClient } from "@prisma/client";
import { getAuthors } from "../controller/author";
import { getAuthorByID } from "./author";
const prisma = new PrismaClient();

export async function getBooks() {
  return await prisma.books.findMany();
}

export async function CreateBook(
  page: number,
  description: string,
  title: string,
  authorID: number,
  userID: number,
  image: string
) {
  let author = await getAuthorByID(authorID);
  return await prisma.books.create({
    data: {
      authorID,
      page,
      title,
      userID,
      desc: description,
      authorName: author ? author.name : "",
      imageURL: `http://localhost:8080/image/${new Date + "-" + authorID}`
    },
  });
}

export async function checkBookExist(id: number) {
  return await prisma.books.findUnique({ where: { id } });
}

export async function updateBook(
  bookID: number,
  page: number,
  description: string,
  title: string,
  authorID: number
) {
  return await prisma.books.update({
    where: {
      id: bookID,
    },
    data: {
      authorID,
      desc: description,
      page,
      title,
    },
  });
}

export async function removeBook(id: number) {
  return await prisma.books.delete({ where: { id } });
}
