import { PrismaClient } from "@prisma/client";
import { editUser } from "./user";
const prisma = new PrismaClient();

export async function findAuthors() {
  return await prisma.author.findMany();
}
export async function postAuthor(userID: number, authorName: string) {
  return await prisma.author.create({
    data: {
      name: authorName,
      createdUser: userID,
    },
  });
}

export async function checkAuthorExist(id: number) {
  return await prisma.author.findUnique({ where: { id } });
}

export async function checkAuthorByName(name: string) {
  return await prisma.author.findUnique({ where: { name } });
}

export async function renameAuthor(id: number, name: string) {
  return await prisma.author.update({ where: { id }, data: { name } });
}

export async function deleteAuthor(authorID: number) {
  const users = await prisma.user.findMany();
  for (let i in users) {
    if (users[i].SavedAuthor.includes(authorID)) {
      let another = users[i].SavedAuthor;
      let arr: number[] = another.filter((id) => id !== authorID);
      const updatedUser = await editUser(users[i].id, arr);
    }
  }
  return await prisma.author.delete({ where: { id: authorID } });
}

export async function getAuthorByID(id: number) {
  return await prisma.author.findUnique({ where: { id } });
}
