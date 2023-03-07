import { PrismaClient } from "@prisma/client";
import { findAuthors } from "./author";
const prisma = new PrismaClient();

export async function getUser() {
  return prisma.user.findMany();
}

export async function checkUserExist(id: number) {
  try {
    return await prisma.user.findUnique({ where: { id } });
  } catch (error: any) {
    return false;
  }
}

export async function checkUserByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}

export async function addUser(
  name: string,
  surname: string,
  email: string,
  password: string
) {
  return await prisma.user.create({
    data: {
      email,
      name,
      password,
      surname,
    },
  });
}
export async function editUser(id: number, authors: number[]) {
  return await prisma.user.update({
    where: { id },
    data: { SavedAuthor: authors },
  });
}

export async function updatedUserByID(data: {
  name: string;
  surname: string;
  email: string;
  password: string;
  userID: number;
}) {
  return await prisma.user.update({
    where: {
      id: data.userID,
    },
    data: {
      email: data.email,
      name: data.name,
      password: data.password,
      surname: data.surname,
    },
  });
}

export async function deleteUser(id: number) {
  const authors = await findAuthors();
  for (let i in authors) {
    if (authors[i].createdUser == id) {
      await deleteUser(authors[i].id);
    }
  }
  return await prisma.user.delete({ where: { id } });
}

